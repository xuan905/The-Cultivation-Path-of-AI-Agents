"""
multi_agent_collaboration.py
----------------------------
功能：
  多 Agent 協作，共享任務與成果。
修仙比喻：
  門派分神組大陣，法力互補。
"""

class Agent:
    def __init__(self, name):
        self.name = name
        self.completed = []

    def perform(self, task):
        print(f"{self.name} 執行：{task}")
        self.completed.append(task)

def distribute_tasks(agents, tasks):
    for i, task in enumerate(tasks):
        agent = agents[i % len(agents)]
        agent.perform(task)

if __name__ == "__main__":
    agents = [Agent("分神甲"), Agent("分神乙"), Agent("分神丙")]
    tasks = ["煉丹", "劍法試煉", "符咒演練"]
    distribute_tasks(agents, tasks)
