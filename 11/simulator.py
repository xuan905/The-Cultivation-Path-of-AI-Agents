"""
simulator.py
-------------
功能：
  模擬環境與測試任務完成效果。
修仙比喻：
  幻境試煉場，分神修煉與歷練。
"""

import random

class Simulator:
    def __init__(self):
        self.results = []

    def run_task_simulation(self, task_name):
        success_rate = random.random()
        result = "成功" if success_rate > 0.3 else "失敗"
        self.results.append((task_name, result))
        print(f"🌀 任務 '{task_name}' 模擬結果：{result}")

    def show_results(self):
        print("\n🏅 模擬總結：")
        for task, result in self.results:
            print(f"  {task} → {result}")

# -------------------------
# 範例測試
# -------------------------
if __name__ == "__main__":
    sim = Simulator()
    tasks = ["煉丹", "劍法", "符咒"]
    for t in tasks:
        sim.run_task_simulation(t)
    sim.show_results()
