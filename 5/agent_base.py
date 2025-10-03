"""
agent_base.py
-------------
功能說明：
  定義單體 Agent 類別，每個 Agent 有名字、角色與任務行為。
修仙比喻：
  - Agent = 單體修士
  - 角色 = 修行專精（煉丹、劍法、軍師）
  - act() = 修士施展法術完成任務
"""

class Agent:
    def __init__(self, name: str, role: str):
        self.name = name
        self.role = role

    def act(self, task: str) -> str:
        """
        Agent 根據任務執行行動，返回執行結果。
        """
        return f"{self.name} ({self.role}) 處理任務：{task}"
