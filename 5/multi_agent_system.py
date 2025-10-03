"""
multi_agent_system.py
---------------------
功能說明：
  初始化多個 Agent，模擬門派弟子集合。
修仙比喻：
  - 多 Agent = 門派弟子集合

輸出範例：

煉丹師張三 (資料整合) 處理任務：準備攻破敵陣
劍修李四 (策略分析) 處理任務：準備攻破敵陣
軍師王五 (指令統籌) 處理任務：準備攻破敵陣
"""

from agent_base import Agent

# 建立多個 Agent
agents = [
    Agent("煉丹師張三", "資料整合"),
    Agent("劍修李四", "策略分析"),
    Agent("軍師王五", "指令統籌"),
]

# 測試單體行動
task = "準備攻破敵陣"
for agent in agents:
    print(agent.act(task))
