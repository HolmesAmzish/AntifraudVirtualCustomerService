from pathlib import Path
import markdown
from bs4 import BeautifulSoup
from pypinyin import lazy_pinyin
import chromadb

def load_markdown(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        md_text = f.read()
    html = markdown.markdown(md_text)
    soup = BeautifulSoup(html, 'html.parser')
    return soup.get_text()

FILE_NAME = "中华人民共和国反电信网络诈骗法.md"
text = load_markdown(f"doc/{FILE_NAME}")
chunks = [text[i:i+500] for i in range(0, len(text), 500)]

class OllamaEmbeddingFunction:
    def __init__(self, model_name="nomic-embed-text"):
        self.model_name = model_name
        
    def __call__(self, input):
        import ollama
        embeddings = []
        for text in input:
            response = ollama.embeddings(model=self.model_name, prompt=text)
            embeddings.append(response["embedding"])
        return embeddings

client = chromadb.PersistentClient(path="./chroma_db")
ollama_ef = OllamaEmbeddingFunction()
collection_name = '_'.join(lazy_pinyin(FILE_NAME[:-3]))   # Remove the .md extension
collection = client.create_collection(
    name=collection_name,
    embedding_function=ollama_ef
)

ids = [f"chunk_{i}" for i in range(len(chunks))]
metadatas = [{"source": FILE_NAME, "chunk_id": i} for i in range(len(chunks))]

collection.add(
    documents=chunks,
    metadatas=metadatas,
    ids=ids
)

print(f"已插入 {len(chunks)} 个文本块到Chroma")

if __name__ == "__main__":
    results = collection.query(
        query_texts=["金融机构"],
        n_results=2
    )

    for i, doc in enumerate(results['documents'][0]):
        print(f"\n结果 {i+1}:")
        print(doc[:200] + "...")