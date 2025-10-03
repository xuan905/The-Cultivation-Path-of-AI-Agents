"""
llm_awaken.py
----------------
功能說明：
  呼叫語言模型，讓 AI 能基礎回應使用者問題。
  是「啟靈」的練功實戰範例。

修仙比喻：
  啟靈 —— 凡人體內的靈根被喚醒，首次感應天地靈氣。
  這裡的「靈根」就是語言模型 (LLM)，被喚醒後能回應你的提問。
"""

import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

# 🌱 施展啟靈法陣，載入環境變數
load_dotenv()

# 靈根（API Key）、功法（模型）、宗門之源（Base URL）
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
LLM_MODEL = os.getenv("LLM_MODEL", "llama-3.1-8b-instant")
OPENAI_API_BASE = os.getenv("OPENAI_API_BASE", "https://api.groq.com/openai/v1")

# 確認靈根是否注入
if not GROQ_API_KEY:
    raise ValueError("❌ 沒有讀到 GROQ_API_KEY，請檢查 .env 或環境變數")

# 召喚「靈根」—— 初始化 LLM 客戶端
llm = ChatOpenAI(
    model=LLM_MODEL,
    temperature=0,
    api_key=GROQ_API_KEY,
    base_url=OPENAI_API_BASE
)

if __name__ == "__main__":
    print("🧙 施展啟靈術，喚醒語言模型靈根...\n")
    
    while True:
        question = input("👤 請輸入問題:什麼是 AI Agent？（輸入 exit 離開）：")
        if question.lower() == "exit":
            print("🔚 啟靈結束，靈根暫歇。")
            break

        answer = llm.invoke(question)
        print("🧙 靈智回應：", answer.content)
        print("-" * 40)
# 修仙比喻：

# 啟靈是修仙的第一步，喚醒丹田中的靈根。

# 在這個程式中，模型就是「靈根」，Prompt 就是「靈氣引導」，每一次提問都是一次初階修煉。