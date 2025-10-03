"""
task_decompose.py
-----------------
功能說明：
  示範 AI Agent 如何將一個大問題拆解成多個小任務並逐步完成。

修仙比喻：
  - 大任務 = 一座大陣
  - 拆解步驟 = 陣眼與陣基
  - 逐步完成 = 修士依次布置靈石，最終大陣成形

  輸入：

👤 輸入大任務：寫一篇有三段的 AI 修仙故事


AI 回覆拆解：

✨ 陣法解析：
1. 構思故事背景與主角設定
2. 描述主角修行 AI 的歷程
3. 安排高潮與結尾，呼應修仙主題


模擬執行：

🔮 任務執行：
✅ 步驟 1 完成：構思故事背景與主角設定
✅ 步驟 2 完成：描述主角修行 AI 的歷程
✅ 步驟 3 完成：安排高潮與結尾，呼應修仙主題
"""

from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os

# 🌱 載入環境變數
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
LLM_MODEL = os.getenv("LLM_MODEL", "llama-3.1-8b-instant")
OPENAI_API_BASE = os.getenv("OPENAI_API_BASE", "https://api.groq.com/openai/v1")

if not GROQ_API_KEY:
    raise ValueError("❌ 沒有讀到 GROQ_API_KEY，請檢查 .env 或環境變數")

# 初始化 LLM
llm = ChatOpenAI(
    model=LLM_MODEL,
    temperature=0.7,
    api_key=GROQ_API_KEY,
    base_url=OPENAI_API_BASE,
)


def decompose_task(task: str):
    """
    讓 LLM 將大問題拆解成步驟
    """
    prompt = f"""
    你是一位修仙陣法大師。
    使用「布陣」思維，將以下任務拆解成清楚的步驟：
    {task}
    """
    response = llm.invoke(prompt)
    return response.content


def execute_steps(steps: str):
    """
    逐步執行任務（模擬，這裡簡單回應每步執行結果）
    """
    lines = steps.split("\n")
    results = []
    for i, line in enumerate(lines, start=1):
        if not line.strip():
            continue
        results.append(f"✅ 步驟 {i} 完成：{line.strip()}")
    return "\n".join(results)


if __name__ == "__main__":
    print("🧙 啟動布陣 · 任務拆解練功...\n")

    while True:
        task = input("👤 輸入大任務（輸入 exit 離開）：")
        if task.lower() == "exit":
            print("🔚 陣法收起，布陣結束。")
            break

        steps = decompose_task(task)
        print("\n✨ 陣法解析：\n", steps)

        results = execute_steps(steps)
        print("\n🔮 任務執行：\n", results)
        print("-" * 40)
