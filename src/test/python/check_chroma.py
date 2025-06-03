import chromadb

client = chromadb.HttpClient(host='localhost', port=8000)
collection_name = "fraudbase"

collection = client.get_collection(name=collection_name)
results = collection.query(n_results=2, query_texts=["Hello"])
print("Query Results:", results)