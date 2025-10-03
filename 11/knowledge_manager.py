"""
knowledge_manager.py
--------------------
功能：
  管理專屬知識庫，支持添加與查詢資料。
修仙比喻：
  藏經閣管理經書與丹典，供分神吸收靈氣。
"""

class KnowledgeManager:
    def __init__(self):
        self.database = {}

    def add_knowledge(self, topic, content):
        self.database[topic] = content
        print(f"📜 新知識注入：{topic}")

    def query_knowledge(self, topic):
        return self.database.get(topic, "❌ 該經典尚未收錄")

# -------------------------
# 範例測試
# -------------------------
if __name__ == "__main__":
    km = KnowledgeManager()
    km.add_knowledge("丹道修煉", "每日服食靈丹，內力自增")
    km.add_knowledge("法寶運用", "法寶需與靈力相符才能發揮威力")
    print(km.query_knowledge("丹道修煉"))
    print(km.query_knowledge("符咒術"))
