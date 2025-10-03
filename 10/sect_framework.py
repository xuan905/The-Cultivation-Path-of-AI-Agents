"""
sect_framework.py
-----------------
功能：
  建立整體 AI 門派框架，管理多個 Agent。
修仙比喻：
  虛空中打下門派根基，建立道場與靈脈。
"""

class SectFramework:
    def __init__(self, name):
        self.name = name
        self.agents = []

    def register_agent(self, agent):
        self.agents.append(agent)
        print(f"🔹 {agent.name} 已加入門派 {self.name}")

    def list_agents(self):
        print(f"🏯 門派 {self.name} 現有分神：")
        for agent in self.agents:
            print(f"  - {agent.name}")

# -------------------------
# 範例測試
# -------------------------
if __name__ == "__main__":
    sect = SectFramework("雲霄門")
    class DummyAgent:
        def __init__(self, name):
            self.name = name

    a1 = DummyAgent("分神甲")
    a2 = DummyAgent("分神乙")
    sect.register_agent(a1)
    sect.register_agent(a2)
    sect.list_agents()
