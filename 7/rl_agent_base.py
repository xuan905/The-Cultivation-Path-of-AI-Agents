"""
rl_agent_base.py
----------------
功能：
  建立可接受環境回饋並更新策略的單體 Agent。
修仙比喻：
  分神感知試煉結果，自動調整功法。
"""

import random

class RLAgent:
    def __init__(self, name: str, actions: list):
        self.name = name
        self.actions = actions
        self.q_table = {a: 0.0 for a in actions}  # 簡單 Q 值表
        self.history = []

    def choose_action(self):
        # epsilon-greedy 選擇策略
        if random.random() < 0.8:
            # 選擇最優行動
            action = max(self.q_table, key=self.q_table.get)
        else:
            # 隨機探索
            action = random.choice(self.actions)
        self.history.append(action)
        return action

    def learn(self, action, reward, alpha=0.1):
        # 簡單 Q-learning 更新
        old_value = self.q_table[action]
        self.q_table[action] += alpha * (reward - old_value)
        return f"{self.name} 更新策略: {action} → Q值={self.q_table[action]:.2f}"

# 簡單測試
if __name__ == "__main__":
    agent = RLAgent("分神甲", ["修煉內功", "研讀典籍", "模擬戰鬥"])
    act = agent.choose_action()
    print(f"{agent.name} 選擇行動: {act}")
    print(agent.learn(act, reward=10))
