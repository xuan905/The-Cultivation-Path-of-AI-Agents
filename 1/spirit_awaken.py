"""
spirit_awaken.py
----------------
功能說明：
  呼叫 LLM（大語言模型），讓 AI 能回應使用者的問題。

修仙比喻：
  啟靈 —— 就像凡人靈根被點亮，第一次能感應天地靈氣。
  這裡的「靈根」就是語言模型 (LLM)，被喚醒後就能與人交流。
"""

import os
from dotenv import load_dotenv
# pip install openai python-dotenv langchain_openai
from langchain_openai import ChatOpenAI

# 🌱 先施展啟靈法陣，載入環境變數
load_dotenv()

# 靈根（API Key）、功法（Model）、宗門之源（Base URL）
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
LLM_MODEL = os.getenv("LLM_MODEL", "llama-3.1-8b-instant")
OPENAI_API_BASE = os.getenv("OPENAI_API_BASE", "https://api.groq.com/openai/v1")

# 確認靈根是否注入
if not GROQ_API_KEY:
    raise ValueError("❌ 沒有讀到 GROQ_API_KEY，請檢查 .env 檔或環境變數")

# 召喚「靈根」—— 初始化 LLM 客戶端
llm = ChatOpenAI(
    model=LLM_MODEL,
    temperature=0,
    api_key=GROQ_API_KEY,
    base_url=OPENAI_API_BASE
)

if __name__ == "__main__":
    # 🌟 測試靈智是否甦醒
    question = "請告訴我修仙是什麼？"
    print("👤 凡人提問：", question)

    answer = llm.invoke(question)
    print("🧙 靈智回應：", answer.content)
