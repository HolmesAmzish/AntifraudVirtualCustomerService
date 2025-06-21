import mysql.connector
from mysql.connector import Error
from typing import List, Dict, Any, Optional


class MySQLQueryTool:
    def __init__(self, host: str, user: str, password: str, database: str):
        self.host = host
        self.user = user
        self.password = password
        self.database = database
        self.connection = None
        self.cursor = None

    def _connect(self):
        try:
            self.connection = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database
            )
            if self.connection.is_connected():
                self.cursor = self.connection.cursor(dictionary=True)
                print("成功连接到数据库")
        except Error as e:
            print(f"连接失败: {e}")
            raise e

    def _close(self):
        if self.cursor:
            self.cursor.close()
        if self.connection:
            self.connection.close()
            print("数据库连接已关闭")

    def query(self, query: str, params: Optional[List[Any]] = None) -> List[Dict[str, Any]]:
        """
        执行查询并返回结果
        :param query: SQL 查询语句
        :param params: 可选的参数，用于参数化查询
        :return: 查询结果，字典格式列表
        """
        try:
            self._connect()
            if params:
                self.cursor.execute(query, params)
            else:
                self.cursor.execute(query)
            result = self.cursor.fetchall()
            return result
        except Error as e:
            print(f"查询失败: {e}")
            return []
        finally:
            self._close()

    def query_one(self, query: str, params: Optional[List[Any]] = None) -> Optional[Dict[str, Any]]:
        """
        执行查询并返回单条记录
        :param query: SQL 查询语句
        :param params: 可选的参数，用于参数化查询
        :return: 单条查询结果，字典格式
        """
        try:
            self._connect()
            if params:
                self.cursor.execute(query, params)
            else:
                self.cursor.execute(query)
            result = self.cursor.fetchone()
            return result
        except Error as e:
            print(f"查询失败: {e}")
            return None
        finally:
            self._close()


# 示例使用
if __name__ == "__main__":
    host = 'localhost'
    user = 'cacc'
    password = '20230612'
    database = 'fraud_base'

    mysql_tool = MySQLQueryTool(host, user, password, database)

    query_all_cases = "SELECT * FROM fraud_case LIMIT 10"
    cases = mysql_tool.query(query_all_cases)
    print("查询到的案件:", cases)

    query_case_by_id = "SELECT * FROM fraud_case WHERE id = %s"
    case = mysql_tool.query_one(query_case_by_id, [1])
    print("查询到的单个案件:", case)
