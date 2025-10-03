"""
custom_knowledge_base.py
------------------------
功能：
  建立專屬知識庫，聚合資料供分神查閱。
修仙比喻：
  藏經閣收藏經書與丹典，方便分神吸收靈氣。
"""

class KnowledgeBase:
    def __init__(self):
        self.records = {}

    def add_record(self, topic, content):
        self.records[topic] = content
        print(f"📜 新經典加入知識庫：{topic}")

    def query(self, topic):
        return self.records.get(topic, "❌ 經典未收錄")

# -------------------------
# 範例測試
# -------------------------
if __name__ == "__main__":
    kb = KnowledgeBase()
    kb.add_record("丹道修煉", "每日服食靈丹，內力自增")
    kb.add_record("法寶運用", "法寶需與靈力相符才能發揮最大威力")
    print(kb.query("丹道修煉"))
    print(kb.query("符咒術"))
