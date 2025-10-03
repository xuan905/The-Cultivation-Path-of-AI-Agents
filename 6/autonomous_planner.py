"""
autonomous_planner.py
----------------------
功能說明：
  將 Goal → Plan → Act → Learn 循環完整演示，
  支援多個自主 Agent 同時運作。

修仙比喻：
  分神按修煉大計安排每日修煉、行動、觀察自身增長。
"""

from agent_base import AutonomousAgent
from goal_setting import agent_goals

# 建立多個自主 Agent
agents = [AutonomousAgent(f"分神{i+1}", goal) for i, goal in enumerate(agent_goals)]

# 執行 Goal → Plan → Act → Learn 循環
for agent in agents:
    print(f"🧘 {agent.name} 開始今日修煉：")
    print("  計畫階段:", agent.plan())
    print("  行動階段:", agent.act())
    print("  學習階段:", agent.learn())
    print("-"*50)
