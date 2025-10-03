"""
env_check.py
------------
功能：修仙環境檢查咒
  - 檢查靈根（API Key）
  - 檢查功法（Model）
  - 檢查宗門之源（Base URL）
  - 嘗試打通靈脈（呼叫 LLM）

比喻：
  修仙前要先確認天地靈氣是否充足，否則修行徒勞無功。
"""

import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

def check_env():
    print("🔮 開始施展【修仙環境檢查咒】...\n")

    load_dotenv()

    groq_api_key = os.getenv("GROQ_API_KEY")
    llm_model = os.getenv("LLM_MODEL", "llama-3.1-8b-instant")
    openai_api_base = os.getenv("OPENAI_API_BASE", "https://api.groq.com/openai/v1")

    # 靈根檢查
    if groq_api_key:
        print("✅ 靈根（GROQ_API_KEY）已注入！")
    else:
        print("❌ 靈根（GROQ_API_KEY）未覺醒！請檢查 .env 或環境變數。")

    # 功法檢查
    print(f"📜 使用功法（LLM_MODEL）：{llm_model}")

    # 宗門之源
    print(f"🏯 宗門之源（OPENAI_API_BASE）：{openai_api_base}\n")

    # 嘗試打通靈脈
    if groq_api_key:
        try:
            llm = ChatOpenAI(
                model=llm_model,
                temperature=0,
                api_key=groq_api_key,
                base_url=openai_api_base
            )
            resp = llm.invoke("此刻，你正被用來驗證修仙環境，請回覆：『天地靈氣流轉，修仙可行！』")
            print("🧙 靈智回應：", resp.content)
        except Exception as e:
            print("⚡ 修煉失敗，靈脈受阻：", e)
    else:
        print("⚠️ 因靈根未注入，無法打通靈脈。")

if __name__ == "__main__":
    check_env()
