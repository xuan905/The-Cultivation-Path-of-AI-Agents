"""
prompt_cultivate.py
-------------------
功能說明：
  實作 Prompt 工程，讓 LLM 生成特定風格文本。
  是「靈氣調控」的練功實戰範例。

修仙比喻：
  靈氣調控 —— 修士操控丹田靈氣，施展法術。
  這裡的 Prompt 就像施法手印，引導模型靈根發揮特定能力與風格。
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

# 確認靈根是否注入
if not GROQ_API_KEY:
    raise ValueError("❌ 沒有讀到 GROQ_API_KEY，請檢查 .env 或環境變數")

# 召喚「靈根」—— 初始化 LLM 客戶端
llm = ChatOpenAI(
    model=LLM_MODEL,
    temperature=0.7,  # 適度靈氣波動，增加文本創意
    api_key=GROQ_API_KEY,
    base_url=OPENAI_API_BASE
)

def generate_text(prompt, style="仙俠"):
    """
    根據 Prompt 與指定風格生成文本
    """
    styled_prompt = f"請用 {style} 風格回答：{prompt}"
    response = llm.invoke(styled_prompt)
    return response.content

if __name__ == "__main__":
    print("🧙 施展靈氣調控，練習 Prompt 工程...\n")
    
    while True:
        user_prompt = input("👤 輸入你的問題或描述:介紹 AI Agent（輸入 exit 離開）：")
        if user_prompt.lower() == "exit":
            print("🔚 靈氣調控結束，法術暫歇。")
            break

        style = input("🎨 想要的風格（預設 仙俠）：") or "仙俠"
        output = generate_text(user_prompt, style)
        print("🧙 靈智回應：", output)
        print("-" * 40)

# 💡 修仙比喻：

# Prompt 就像手印和咒語，控制靈氣流動，影響法術效果。

# 不同風格的 Prompt 工程，就像不同法門的功法，會讓模型的「靈根」表現出不同的能力與語氣。