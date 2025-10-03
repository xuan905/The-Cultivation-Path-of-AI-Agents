"""
multi_agent_loop.py
-------------------
功能說明：
  整合多分神協作、多天循環與進度追蹤，模擬門派分神修煉大計。

修仙比喻：
  門派分神同時運作，互通靈力，逐日修煉並追蹤長期目標。
"""

from agent_base import AutonomousAgent
from goal_setting import agent_goals
from long_term_tracking import track_progress

# 建立多個自主 Agent
agents = [AutonomousAgent(f"分神{i+1}", goal) for i, goal in enumerate(agent_goals)]

# 模擬多天循環修煉
days = 5  # 可調整天數
for day in range(1, days + 1):
    print(f"\n🌀 第 {day} 天門派分神修煉")
    for agent in agents:
        print(agent.plan())             # 計畫階段
        print(agent.act())              # 行動階段
        print(agent.learn())            # 學習階段
        print(track_progress(agent))    # 長期目標追蹤
    print("="*50)

# 模擬簡單多分神協作（可擴展）
print("\n🤝 門派分神協作示例：")
for agent in agents:
    print(f"{agent.name} 與其他分神互通靈力，共同提升功法效果。")
