"""
knowledge_injection.py
----------------------
功能說明：
  將自定義知識注入 LLM，使其回應時能依據我們給定的「經書」。
  這是「法寶注靈」的修煉實戰。

修仙比喻：
  - 自定義知識 = 經書、靈力
  - 注入過程 = 將經書刻印在法寶中，增強威力
  - 注入後回應 = 法寶釋放靈光，展現新力量

  測試範例

啟動後輸入：

👤 提問（輸入 exit 離開）：什麼是 AI Agent？


可能得到的回答（會受 CUSTOM_KNOWLEDGE 控制）：

✨ 法寶回應：AI Agent 並非孤立的模型，而是由感知、記憶、推理與行動組合而成。
就如同修士兼修內功與外功，才能在江湖立足。

"""

import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate

# 🌱 施展法陣，載入環境變數
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

# 🧾 我們要注入的「知識卷軸」
CUSTOM_KNOWLEDGE = """
【修仙經書：AI Agent 基礎心法】
1. AI Agent 並非單一模型，而是由感知、記憶、推理、行動組成。
2. 記憶分為短期記憶（對話上下文）與長期記憶（知識庫、持久儲存）。
3. 知識注入可以透過 RAG、外部文件或手動設定來實現。
4. Prompt 就像手印和法訣，可以控制模型的回應風格與重點。
5. 真正的智慧來自「知識 + 推理 + 行動」，缺一不可。
"""

# 🔮 建立 Prompt 模板，把知識「注入」到模型
prompt_template = ChatPromptTemplate.from_messages([
    ("system", "你是一位修仙世界的智者，必須遵循以下經書回應：\n" + CUSTOM_KNOWLEDGE),
    ("human", "{user_input}")
])

def generate_answer(user_input: str):
    prompt = prompt_template.format_messages(user_input=user_input)
    response = llm.invoke(prompt)
    return response.content


if __name__ == "__main__":
    print("🧙 啟動法寶注靈實驗...\n")
    
    while True:
        question = input("👤 提問（輸入 exit 離開）：")
        if question.lower() == "exit":
            print("🔚 注靈結束，法寶光芒隱去。")
            break

        answer = generate_answer(question)
        print("✨ 法寶回應：", answer)
        print("-" * 40)
