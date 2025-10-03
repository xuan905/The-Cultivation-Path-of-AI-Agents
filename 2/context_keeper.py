"""
context_keeper.py
-------------------
功能說明：
  建立上下文對話記憶，使 AI 回應更連貫。
  是「法脈流轉」的練功實戰範例。

修仙比喻：
  法脈流轉 —— 丹田靈氣沿經脈流轉，力量穩定而持久。
  這裡的上下文記憶就像法脈，保持對話靈力連續，避免斷裂。
"""

import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

# 🌱 施展法陣，載入環境變數
load_dotenv()

# 靈根（API Key）、功法（模型）、宗門之源（Base URL）
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
LLM_MODEL = os.getenv("LLM_MODEL", "llama-3.1-8b-instant")
OPENAI_API_BASE = os.getenv("OPENAI_API_BASE", "https://api.groq.com/openai/v1")

if not GROQ_API_KEY:
    raise ValueError("❌ 沒有讀到 GROQ_API_KEY，請檢查 .env 或環境變數")

# 召喚「靈根」—— 初始化 LLM 客戶端
llm = ChatOpenAI(
    model=LLM_MODEL,
    temperature=0.7,
    api_key=GROQ_API_KEY,
    base_url=OPENAI_API_BASE
)

# 法脈記憶庫（上下文列表）
memory = []

def converse_with_memory(user_input):
    """
    AI 回應使用者，同時保存上下文
    """
    # 將上下文與新輸入組合成 prompt
    context_text = "\n".join(memory + [f"使用者：{user_input}"])
    response = llm.invoke(context_text)
    # 保存新的上下文
    memory.append(f"使用者：{user_input}")
    memory.append(f"AI：{response.content}")
    return response.content

if __name__ == "__main__":
    print("🧙 開始法脈流轉：上下文對話記憶啟動\n")
    
    while True:
        user_input = input("👤 請說話（輸入 exit 離開）：")
        if user_input.lower() == "exit":
            print("🔚 法脈暫歇，對話記憶保存完畢。")
            break

        output = converse_with_memory(user_input)
        print("🧙 靈智回應：", output)
        print("📜 目前法脈記憶：", memory)
        print("-" * 40)
