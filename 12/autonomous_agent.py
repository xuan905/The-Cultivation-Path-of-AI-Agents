"""
autonomous_agent.py
-------------------
功能：
  自主規劃目標、執行任務並自我學習。
修仙比喻：
  分神自動修煉，無需師父指示。
"""

class AutonomousAgent:
    def __init__(self, name):
        self.name = name
        self.knowledge = []
        self.tasks_done = []

    def plan_task(self, goal):
        return [f"{goal} - 步驟{i+1}" for i in range(3)]

    def act(self, task):
        print(f"{self.name} 執行任務：{task}")
        self.tasks_done.append(task)

    def learn(self, knowledge):
        self.knowledge.append(knowledge)
        print(f"{self.name} 吸收知識：{knowledge}")

if __name__ == "__main__":
    agent = AutonomousAgent("分神甲")
    tasks = agent.plan_task("修煉內功")
    for t in tasks:
        agent.act(t)
    agent.learn("內功心法")
