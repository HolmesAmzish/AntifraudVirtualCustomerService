import chromadb

client = chromadb.HttpClient(host='localhost', port=8000)

# 2. 创建/获取一个集合 (Collection)
collection_name = "fraudbase"
try:
    collection = client.get_collection(name=collection_name)
except Exception:
    collection = client.create_collection(name=collection_name)

# 3. 准备数据（文本 + 向量）
# 这里假设你已经有对应文本的向量embedding列表
texts = ["Hello world", "Spring AI with ChromaDB", "Vector search example"]
# 举例用随机向量替代（实际中用embedding模型计算）
import numpy as np
embeddings = [np.random.rand(1536).tolist() for _ in texts]  # 假设1536维

# 4. 插入数据
# id是每条记录唯一标识，metadata是可选的字典
ids = [f"id_{i}" for i in range(len(texts))]
collection.add(documents=texts, embeddings=embeddings, ids=ids)

# 5. 查询示例（用文本向量查询最近邻）
query_embedding = np.random.rand(1536).tolist()
results = collection.query(query_embeddings=[query_embedding], n_results=2)

print("Query Results:", results)
