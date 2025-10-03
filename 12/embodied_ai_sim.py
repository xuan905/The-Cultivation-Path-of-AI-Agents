"""
embodied_ai_sim.py
------------------
功能：
  模擬 AI 在環境中感知與行動。
修仙比喻：
  分神親臨幻境試煉，感應天地靈氣。
"""

import random

class EmbodiedAgent:
    def __init__(self, name):
        self.name = name

    def perceive(self):
        perception = random.choice(["順利吸收靈氣", "遭遇幻境阻礙"])
        print(f"{self.name} 感知：{perception}")
        return perception

    def act(self):
        action = random.choice(["施法成功", "法力外溢"])
        print(f"{self.name} 行動：{action}")
        return action

if __name__ == "__main__":
    agent = EmbodiedAgent("分神甲")
    for _ in range(3):
        agent.perceive()
        agent.act()
