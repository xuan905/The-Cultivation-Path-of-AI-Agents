"""
financial_agent.py
------------------
功能：
  模擬靈石煉財術，AI 分析商業數據並給出投資建議。
修仙比喻：
  以靈石煉丹，將靈力轉化為財富。
"""

import random

class FinancialAgent:
    def __init__(self, name):
        self.name = name

    def analyze_market(self, data):
        """模擬市場分析"""
        score = sum(data) / len(data)
        advice = "買入" if score > 50 else "觀望"
        print(f"{self.name} 分析結果：市場指數 {score:.2f}, 建議: {advice}")
        return advice

# -------------------------
# 範例測試
# -------------------------
if __name__ == "__main__":
    agent = FinancialAgent("分神甲")
    market_data = [random.randint(30, 70) for _ in range(5)]
    agent.analyze_market(market_data)
