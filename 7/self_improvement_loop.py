"""
self_improvement_loop.py
-----------------------
功能：
  Agent 根據 Reward 調整策略，形成自我進化循環。
修仙比喻：
  分神反思修煉成果，調整功法、心法運行。
"""

from rl_agent_base import RLAgent
from environment_sim import simulate_environment
from reward_mechanism import calculate_reward

# 建立 Agent
agent = RLAgent("分神甲", ["修煉內功", "研讀典籍", "模擬戰鬥"])

# 模擬多次修煉循環
for day in range(1, 6):
    action = agent.choose_action()
    env_reward = simulate_environment(action)
    reward = calculate_reward(env_reward)
    update_msg = agent.learn(action, reward)
    print(f"第 {day} 天 | 行動: {action}, 環境回饋: {env_reward:.2f}, Reward: {reward}")
    print(f"策略更新: {update_msg}")
    print("-"*50)
