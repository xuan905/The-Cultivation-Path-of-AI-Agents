"""
agent_builder.py
----------------
功能：
  自訂 Agent 行為、策略與目標。
修仙比喻：
  分神各司其職，每個法寶與功法都有專屬技能。
"""

class CustomAgent:
    def __init__(self, name, specialty):
        self.name = name
        self.specialty = specialty

    def perform_task(self, task):
        print(f"{self.name} 專精 {self.specialty}，正在執行任務: {task}")

# -------------------------
# 範例測試
# -------------------------
if __name__ == "__main__":
    agent1 = CustomAgent("分神甲", "煉丹")
    agent2 = CustomAgent("分神乙", "劍法")
    agent1.perform_task("煉製回春丹")
    agent2.perform_task("劍法試煉")
