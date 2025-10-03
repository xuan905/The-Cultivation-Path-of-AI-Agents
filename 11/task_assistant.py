"""
task_assistant.py
-----------------
功能：
  任務拆解與規劃，分派給 Agent 執行。
修仙比喻：
  布置法陣，分神依陣法施法。
"""

class TaskAssistant:
    def __init__(self):
        self.tasks = []

    def add_task(self, task_name):
        self.tasks.append(task_name)
        print(f"🗡 任務新增：{task_name}")

    def assign_tasks(self, agents):
        print("🔹 任務分派開始")
        for i, task in enumerate(self.tasks):
            agent = agents[i % len(agents)]
            agent.perform_task(task)

# -------------------------
# 範例 Agent
# -------------------------
class DummyAgent:
    def __init__(self, name):
        self.name = name

    def perform_task(self, task):
        print(f"{self.name} 正在執行任務：{task}")

# -------------------------
# 範例測試
# -------------------------
if __name__ == "__main__":
    assistant = TaskAssistant()
    assistant.add_task("煉製回春丹")
    assistant.add_task("劍法修煉")
    assistant.add_task("符咒陣法演練")
    
    agents = [DummyAgent("分神甲"), DummyAgent("分神乙")]
    assistant.assign_tasks(agents)
