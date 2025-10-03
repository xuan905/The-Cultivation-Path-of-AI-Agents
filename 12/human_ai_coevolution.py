"""
human_ai_coevolution.py
------------------------
功能：
  人與 AI 協作完成任務。
修仙比喻：
  師徒合修，法力與智慧雙修。
"""

class Human:
    def __init__(self, name):
        self.name = name

    def guide(self, task):
        print(f"{self.name} 指導任務：{task}")

class AICompanion:
    def __init__(self, name):
        self.name = name

    def execute(self, task):
        print(f"{self.name} 執行任務：{task}")

if __name__ == "__main__":
    human = Human("師父")
    ai = AICompanion("分神甲")
    tasks = ["煉丹", "劍法試煉"]
    for t in tasks:
        human.guide(t)
        ai.execute(t)
