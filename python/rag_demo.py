from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.llms import Ollama

# 1. 加载文本数据
loader = TextLoader("src/main/resources/data/HolmesAmzish.md")
documents = loader.load()

# 2. 文本分割
text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
docs = text_splitter.split_documents(documents)

# 3. 嵌入并存储到 Chroma
embedding = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vectorstore = Chroma.from_documents(docs, embedding, persist_directory="./chroma_db")

# 可持久化存储
vectorstore.persist()

# 4. 创建检索器 + 问答链
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})
llm = Ollama(model="llama3.2")
qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever)

# 5. 问问题
query = "用中文回答，这个人的教育背景是什么？"
result = qa_chain.run(query)
print(result)
