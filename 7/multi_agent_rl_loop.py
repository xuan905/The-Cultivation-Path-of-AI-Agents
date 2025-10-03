"""
multi_agent_rl_loop.py
----------------------
功能：
  多個 Agent 在同一環境中互動、學習，逐步優化行為。
修仙比喻：
  門派分神協力修煉、試煉，互相影響，集體提升功力。

🔹 功能重點

單體 RL Agent：自主選擇行動，依 Reward 更新策略

模擬環境：提供行動後回饋

Reward 機制：將環境回饋轉化為強化學習信號

自我迴路：Agent 循環 Plan → Act → Learn → Adjust

多 Agent 協作：多分神同時修煉，互相影響策略，模擬門派化神修煉
"""

from rl_agent_base import RLAgent
from environment_sim import simulate_environment
from reward_mechanism import calculate_reward

# 建立多個 Agent
agents = [
    RLAgent("分神甲", ["修煉內功", "研讀典籍", "模擬戰鬥"]),
    RLAgent("分神乙", ["修煉內功", "研讀典籍", "模擬戰鬥"]),
    RLAgent("分神丙", ["修煉內功", "研讀典籍", "模擬戰鬥"])
]

days = 5
for day in range(1, days + 1):
    print(f"\n🌀 第 {day} 天門派分神修煉")
    for agent in agents:
        action = agent.choose_action()
        env_reward = simulate_environment(action)
        reward = calculate_reward(env_reward)
        update_msg = agent.learn(action, reward)
        print(f"{agent.name} 行動: {action}, 環境回饋: {env_reward:.2f}, Reward: {reward}")
        print(f"策略更新: {update_msg}")
    print("="*50)

# 模擬簡單分神互通靈力
print("\n🤝 門派分神互通靈力，共享經驗提升功力。")
for agent in agents:
    print(f"{agent.name} 的 Q-table: {agent.q_table}")
