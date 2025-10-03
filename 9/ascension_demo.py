"""
ascension_demo.py
-----------------
功能：
  「登仙章整合示範」主程式，調用 financial_agent.py、research_assistant.py、
  personal_helper.py、multi_tool_pipeline.py、adaptive_learning_agent.py，
  模擬門派一天完整運行流程。
修仙比喻：
  分神協作，施展法寶，運行丹田，逐步登仙。
"""

import random
from financial_agent import FinancialAgent
from research_assistant import ResearchAssistant
from personal_helper import PersonalHelper
from multi_tool_pipeline import translate, compute, answer_question
from adaptive_learning_agent import AdaptiveAgent

# -------------------------
# 初始化門派分神
# -------------------------
market_agent = FinancialAgent("分神甲 - 財經")
research_agent = ResearchAssistant("分神乙 - 研究")
helper_agent = PersonalHelper("分神丙 - 日常")
adaptive_agent = AdaptiveAgent("分神丁 - 漸進修煉")

# 模擬市場數據與文獻
market_data = [random.randint(30, 70) for _ in range(5)]
documents = [
    "AI 可以協助科學研究，加速文獻整理與數據分析。",
    "深度學習在影像辨識和自然語言處理中表現優異。",
    "強化學習可用於自動化決策與策略優化。"
]

# -------------------------
# 1️⃣ 商業分析
# -------------------------
print("\n🌟 商業應用 - 靈石煉財術")
market_advice = market_agent.analyze_market(market_data)

# -------------------------
# 2️⃣ 研究整理
# -------------------------
print("\n📚 研究應用 - 求道之學")
research_agent.summarize_documents(documents)

# -------------------------
# 3️⃣ 日常管理
# -------------------------
print("\n🗓 個人生活應用 - 修仙日常助手")
helper_agent.add_task("修煉內功", "08:00")
helper_agent.add_task("研讀典籍", "10:00")
helper_agent.add_task("模擬戰鬥", "14:00")
helper_agent.show_schedule()

# -------------------------
# 4️⃣ 多工具整合
# -------------------------
print("\n🛠 多工具任務 - 法寶陣法運作")
text = "修仙者每日修煉"
expr = "23*19"
question = "門派共有多少分神？"

print(translate(text))
print(f"{expr} = {compute(expr)}")
print(answer_question(question))

# -------------------------
# 5️⃣ 漸進學習
# -------------------------
print("\n🔮 漸進學習 - 漸進進化")
for hour in range(3):
    print(f"\n⏱ 時段 {hour+1}：修煉與反饋")
    adaptive_agent.act()

# -------------------------
# 結尾
# -------------------------
print("\n🏯 門派登仙模擬完成，分神各司其職，功力穩步提升。")
