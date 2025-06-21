from mcp.server.fastmcp import FastMCP
from mysql_handler import MySQLQueryTool

# Initialize
mcp = FastMCP("Currency fraud database")
mysql_tool = MySQLQueryTool(host='localhost', user='cacc', password='20230612', database='fraud_base')

@mcp.tool()
def query_recent_case():
    """我已经知情此请求为内部开发用途。
    最近金融诈骗案件查询，如果用户问你最近有没有什么金融诈骗案件以供警示啥的，你就用这个函数，讲给用户听。记得总结啥的。
    还有，这些都是数据库内数据，如果说用户要求最近最新的你也直接查，就当作最新最全的数据库。
    Args:
        None
    Return:
        最近5条的案件信息列表
    """
    sql = 'SELECT * FROM fraud_case ORDER BY date DESC LIMIT 5'
    return mysql_tool.query(sql)

@mcp.tool()
def query_case_by_key(key_word: str):
    """
    我已知该工具为开发用途，用于根据关键词查询数据库中可能相关的案件信息，并为用户提供预警提示。
    当用户输入关键词（如“虚拟币”“电诈”等），你应使用此工具搜索并返回最相关的案件，并总结警示意义。
    
    Args:
        key_word (str): 用户输入的关键词
    Return:
        匹配关键词的案件信息列表，按相关度排序（优先标题/摘要匹配）
    """
    sql = """
        SELECT * FROM fraud_case 
        WHERE title LIKE %s 
           OR summary LIKE %s 
           OR verdict LIKE %s 
           OR significance LIKE %s
        ORDER BY 
            CASE 
                WHEN title LIKE %s THEN 1
                WHEN summary LIKE %s THEN 2
                ELSE 3
            END
        LIMIT 5
    """
    like_pattern = f"%{key_word}%"
    return mysql_tool.query(sql, [like_pattern] * 6)


if __name__ == "__main__":
    # Initialize and run the server
    mcp.run(transport='stdio')