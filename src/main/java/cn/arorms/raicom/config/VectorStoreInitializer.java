package cn.arorms.raicom.config;

import org.springframework.ai.document.Document;
import java.nio.file.*;
import java.util.*;
import java.io.IOException;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;
import org.springframework.ai.vectorstore.VectorStore;

/**
 * VectorStoreInitialize.java
 * @version 1.0 2025-06-03
 * @author cacc
 */
//@Component
public class VectorStoreInitializer {

    private final VectorStore vectorStore;

    public List<Document> loadMarkdownDocuments(String folderPath) throws IOException {
        List<Document> documents = new ArrayList<>();
        int chunkSize = 1000;

        Files.walk(Path.of(folderPath))
                .filter(Files::isRegularFile)
                .filter(p -> p.toString().endsWith(".md"))
                .forEach(path -> {
                    try {
                        String content = Files.readString(path);

                        for (int i = 0; i < content.length(); i += chunkSize) {
                            int end = Math.min(i + chunkSize, content.length());
                            String chunk = content.substring(i, end);
                            String docId = path.getFileName().toString() + "-chunk" + (i / chunkSize);

                            Document doc = Document.builder()
                                    .id(docId)
                                    .text(chunk)
                                    .metadata(Map.of("source", path.getFileName().toString()))
                                    .build();

                            documents.add(doc);
                        }
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                });
        return documents;
    }

    public VectorStoreInitializer(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

//    @PostConstruct
    public void init() throws IOException {
        List<Document> docs = loadMarkdownDocuments("data");
        vectorStore.add(docs);
        System.out.println("Loaded " + docs.size() + " documents into VectorStore.");
    }
}

