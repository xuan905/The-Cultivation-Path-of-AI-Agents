"""
feedback_loop.py
-----------------
功能說明：
  示範 AI Agent 行動 + 反饋循環。
  Agent 嘗試回答，若錯誤則自我修正。

修仙比喻：
  - Agent 出手 = 修士施展法術
  - 反饋 = 覺察法術效果
  - 修正行為 = 修士調整靈力運行與招式
----------------------------------------
  🧪 測試範例

執行：

python feedback_loop.py


輸入：

請告訴我 12*12 的答案


這樣執行時就會看到：

第一次錯誤回答

反饋後修正回答

🧙 啟動實戰演練 · 行動 + 反饋循環...

👤 輸入任務（輸入 exit 離開）：請告訴我 12*12 的答案
⚡ 嘗試 1 次，初次回答：這是一個錯誤回答
🔄 修正後回答：12 * 12 的答案是 144。

⚡ 嘗試 2 次，初次回答：(我閉上眼睛，深呼吸，集中思緒)

 Ah，十二乘以十二…… (沉思一會兒)

答案是：一百四十四（144）
✅ 回答通過，任務完成！

----------------------------------------
👤 輸入任務（輸入 exit 離開）：exit
🔚 實戰暫歇，法術收起。
"""

from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os
import random


# 🌱 載入環境變數
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
LLM_MODEL = os.getenv("LLM_MODEL", "llama-3.1-8b-instant")
OPENAI_API_BASE = os.getenv("OPENAI_API_BASE", "https://api.groq.com/openai/v1")

if not GROQ_API_KEY:
    raise ValueError("❌ 沒有讀到 GROQ_API_KEY，請檢查 .env 或環境變數")

# 🧙 初始化 LLM
llm = ChatOpenAI(
    model=LLM_MODEL,
    temperature=0.7,
    api_key=GROQ_API_KEY,
    base_url=OPENAI_API_BASE,
)


# 🔮 基本任務判斷 + 反饋
def feedback_agent(task: str, max_attempts: int = 3):
    attempt = 0
    forced_error = True  # 第一次嘗試故意製造錯誤
    while attempt < max_attempts:
        attempt += 1

        prompt = f"你是一位修仙者，請根據任務回答：{task}"
        response = llm.invoke(prompt)
        answer = response.content.strip()

        # 第一次嘗試製造錯誤
        if forced_error:
            answer = "這是一個錯誤回答"
            forced_error = False

        print(f"⚡ 嘗試 {attempt} 次，初次回答：{answer}")

        # 檢查是否正確（模擬檢查）
        if "錯誤" not in answer.lower():
            print("✅ 回答通過，任務完成！\n")
            return answer
        else:
            # 修正提示
            feedback_prompt = f"你上一個回答有誤，請修正並再次回答：{task}\n上一次回答：{answer}"
            response = llm.invoke(feedback_prompt)
            answer = response.content.strip()
            print(f"🔄 修正後回答：{answer}\n")

    print("❌ 嘗試次數用盡，仍未正確完成任務。")
    return None


if __name__ == "__main__":
    print("🧙 啟動實戰演練 · 行動 + 反饋循環...\n")

    while True:
        task = input("👤 輸入任務（輸入 exit 離開）：")
        if task.lower() == "exit":
            print("🔚 實戰暫歇，法術收起。")
            break

        feedback_agent(task)
        print("-" * 40)
