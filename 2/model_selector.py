"""
model_selector.py
-------------------
功能說明：
  比較不同語言模型輸出效果，幫助選擇最適合的模型。
  是「選功法」的練功實戰範例。

修仙比喻：
  選功法 —— 不同功法對應不同靈力屬性與施展效果。
  這裡比較模型，就像修士選擇最適合自身的功法來修煉。
"""

import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

# 🌱 施展法陣，載入環境變數
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
OPENAI_API_BASE = os.getenv("OPENAI_API_BASE", "https://api.groq.com/openai/v1")

if not GROQ_API_KEY:
    raise ValueError("❌ 沒有讀到 GROQ_API_KEY，請檢查 .env 或環境變數")

# 可以比較的模型清單
models = [
    "llama-3.1-8b-instant",
    "qwen/qwen3-32b",
    "openai/gpt-oss-20b"
]

def compare_models(prompt):
    results = {}
    for model_name in models:
        llm = ChatOpenAI(
            model=model_name,
            temperature=0.7,
            api_key=GROQ_API_KEY,
            base_url=OPENAI_API_BASE
        )
        response = llm.invoke(prompt)
        results[model_name] = response.content
    return results

if __name__ == "__main__":
    print("🧙 選功法：比較不同模型效果\n")
    
    prompt = input("👤 請輸入想測試的問題或描述：")
    results = compare_models(prompt)
    
    for model_name, output in results.items():
        print(f"\n⚔ 功法：{model_name}")
        print("🧙 靈智回應：", output)
        print("-" * 40)

# 👤 請輸入想測試的問題或描述：介紹 AI Agent


# ⚔ 功法：llama-3.1-8b-instant
# 🧙 靈智回應：AI Agent 是可以自主執行任務的智慧體...

# ⚔ 功法：qwen/qwen3-32b
# 🧙 靈智回應：AI Agent 如修士助手，能理解指令並靈活完成任務...

# ⚔ 功法：openai/gpt-oss-20b
# 🧙 靈智回應：AI Agent 是智慧體，能接收指令、分析任務並提供回應...