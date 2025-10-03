"""
long_term_tracking.py
---------------------
功能說明：
  追蹤每個自主 Agent 的長期目標完成進度，累積歷史行動，
  支援多天循環模擬。

修仙比喻：
  分神檢視自身功法進度，日積月累，推進境界突破。
"""

from agent_base import AutonomousAgent
from goal_setting import agent_goals

# 建立多個自主 Agent
agents = [AutonomousAgent(f"分神{i+1}", goal) for i, goal in enumerate(agent_goals)]

def track_progress(agent: AutonomousAgent, target_actions: int = 10) -> str:
    """
    計算 Agent 目標完成進度
    :param agent: 自主 Agent
    :param target_actions: 假設完成目標需多少次行動
    :return: 進度描述
    """
    progress = min(len(agent.history) / target_actions, 1.0)  # 進度上限 100%
    return f"{agent.name} 目標進度：{progress*100:.1f}%"

# -------------------------
# 模擬多天循環修煉
# -------------------------
days = 5
for day in range(1, days + 1):
    print(f"\n🌀 第 {day} 天分神修煉")
    for agent in agents:
        print(agent.plan())
        print(agent.act())
        print(agent.learn())
        print(track_progress(agent))
    print("="*50)
