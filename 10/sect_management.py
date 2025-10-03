"""
sect_management.py
------------------
功能：
  任務分派、資源管理、分神協作。
修仙比喻：
  門派大陣運行，法力流暢，分神協同施法。

🔹 特點總結

完整門派設計：從框架 → 知識庫 → 工具 → 分神 → 管理

保持修仙風格：每個檔案都有比喻，像門派分神修煉

可運行、可整合：五個檔案可以獨立運行，也能組合成完整門派模擬系統

適合延伸：後續可接入 RL、自我學習或多門派協作
"""

class SectManager:
    def __init__(self, name):
        self.name = name
        self.agents = []

    def add_agent(self, agent):
        self.agents.append(agent)
        print(f"🔹 {agent.name} 加入門派 {self.name}")

    def assign_tasks(self, tasks):
        print(f"\n🏯 門派 {self.name} 任務分派開始")
        for i, task in enumerate(tasks):
            agent = self.agents[i % len(self.agents)]
            agent.perform_task(task)

# -------------------------
# 範例測試
# -------------------------
if __name__ == "__main__":
    from agent_builder import CustomAgent

    manager = SectManager("雲霄門")
    a1 = CustomAgent("分神甲", "煉丹")
    a2 = CustomAgent("分神乙", "劍法")
    a3 = CustomAgent("分神丙", "符咒")
    manager.add_agent(a1)
    manager.add_agent(a2)
    manager.add_agent(a3)

    tasks = ["煉製回春丹", "劍法試煉", "符咒陣法演練", "靈力調息"]
    manager.assign_tasks(tasks)
