"""
agent_base.py
-------------
功能說明：
  建立單體自主 Agent 類別，包含 plan()、act()、learn() 方法，
  模擬自主行動與自我學習。

修仙比喻：
  分神自行修煉、施法與觀察效果。
"""

class AutonomousAgent:
    def __init__(self, name: str, goal: str):
        """
        初始化自主 Agent
        :param name: Agent 名稱
        :param goal: Agent 長期目標
        """
        self.name = name
        self.goal = goal
        self.history = []  # 記錄行動歷史

    def plan(self) -> str:
        """
        根據目標制定計畫
        :return: 計畫描述
        """
        plan_desc = f"{self.name} 訂立計畫達成目標：{self.goal}"
        return plan_desc

    def act(self) -> str:
        """
        執行計畫，並將行動記錄到歷史
        :return: 執行結果描述
        """
        action = f"{self.name} 執行計畫中..."
        self.history.append(action)
        return action

    def learn(self) -> str:
        """
        從歷史行動中學習
        :return: 學習結果描述
        """
        return f"{self.name} 從歷史中學習，共有 {len(self.history)} 次行動紀錄"


# -------------------------
# 簡單測試範例
# -------------------------
if __name__ == "__main__":
    agent = AutonomousAgent("分神甲", "每日修煉內功一小時")
    
    print(agent.plan())
    print(agent.act())
    print(agent.learn())
