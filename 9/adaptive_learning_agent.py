"""
adaptive_learning_agent.py
--------------------------
功能：
  AI 透過反饋機制自動改進策略。
修仙比喻：
  每日修煉，感悟法力運行，逐步提升道行。
  
🔹 特點總結

涵蓋三大場景：商業、研究、個人生活

多工具與自我學習：模擬多法寶運作與漸進提升

保持修仙風格：每個範例都有比喻，像門派分神修煉

可運行、可組合：五個檔案可獨立運行，也可整合成完整應用
"""

import random

class AdaptiveAgent:
    def __init__(self, name):
        self.name = name
        self.skill_level = 1.0

    def act(self):
        """執行任務並獲得回饋"""
        reward = random.uniform(0, 10) * self.skill_level
        print(f"{self.name} 執行任務，獲得回饋: {reward:.2f}")
        self.learn(reward)

    def learn(self, reward):
        """根據回饋提升技能"""
        improvement = reward / 20
        self.skill_level += improvement
        print(f"{self.name} 技能提升至 {self.skill_level:.2f}")

# -------------------------
# 範例測試
# -------------------------
if __name__ == "__main__":
    agent = AdaptiveAgent("分神甲")
    for day in range(5):
        print(f"\n🌀 第 {day+1} 天修煉")
        agent.act()
