"""
environment_sim.py
-----------------
功能：
  提供 Agent 行動後的 Reward。
修仙比喻：
  秘境試煉或戰場，觀察靈力波動與成敗。
"""

import random

def simulate_environment(action: str) -> float:
    """
    模擬環境反饋
    """
    if action == "修煉內功":
        reward = random.uniform(5, 10)
    elif action == "研讀典籍":
        reward = random.uniform(3, 8)
    elif action == "模擬戰鬥":
        reward = random.uniform(0, 12)
    else:
        reward = 0
    return reward

# 簡單測試
if __name__ == "__main__":
    actions = ["修煉內功", "研讀典籍", "模擬戰鬥"]
    for a in actions:
        print(f"行動: {a}, Reward: {simulate_environment(a):.2f}")
