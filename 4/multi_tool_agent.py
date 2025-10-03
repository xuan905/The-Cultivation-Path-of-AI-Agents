"""
multi_tool_agent.py
安裝翻譯套件
pip install deep_translator
pip install sympy
-------------------
功能說明：
  示範 AI Agent 如何同時使用多個工具（計算器 + 翻譯器）。
  這是「器陣合一」的修煉。

修仙比喻：
  - 工具 = 法寶
  - 多工具協作 = 法寶陣法
  - Agent 調用工具 = 修士同時御使多件法寶

🧪 測試範例

執行：

python multi_tool_agent.py


輸入：

👤 輸入任務：請幫我計算 23 * 19，並告訴我結果


AI 回覆：

✨ 法寶陣法回應：
🧮 計算結果：23*19 = 437
🌐 翻譯後：23*19 = 437


再輸入：

👤 輸入任務：這句話沒有數字


AI 回覆：

這個任務沒有需要計算的部分。
"""

import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
import sympy as sp
from deep_translator import GoogleTranslator

import re

def extract_expression(text: str):
    """
    從文字中抽取第一個純數學表達式，例如 '23*19'。
    """
    match = re.search(r'(\d+(\s*[\+\-\*/]\s*\d+)+)', text)
    if match:
        expr = match.group(1)
        return expr.replace(" ", "")  # 去掉空白
    return None


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

# 🔮 工具 1：計算器法寶
def calculator(expression: str):
    try:
        result = sp.sympify(expression).evalf()
        return f"{expression} = {result}"
    except Exception as e:
        return f"❌ 計算失敗：{e}"

# 🔮 工具 2：翻譯法寶（英文 → 中文）
def translate_to_chinese(text: str):
    try:
        translated = GoogleTranslator(source="en", target="zh-TW").translate(text)
        return translated
    except Exception as e:
        return f"❌ 翻譯失敗：{e}"

# 🧙 AI Agent：調用兩個工具
def multi_tool_agent(task: str):
    """
    先用 LLM 判斷是否需要計算，再翻譯結果。
    """
    # 1️⃣ 請 LLM 判斷計算式
    prompt = f"""
    你是一位修仙者，請從以下任務中抽取需要計算的數學表達式：
    任務：{task}
    如果沒有計算需求，就回覆「無」。
    """
    response = llm.invoke(prompt)
    raw_expr = response.content.strip()
    # 抽取純數學表達式
    expr = extract_expression(raw_expr)
    if not expr:
        return "這個任務沒有需要計算的部分。"

    # 2️⃣ 使用計算器法寶
    calc_result = calculator(expr)

    # 3️⃣ 翻譯成中文（如果有英文）
    translated = translate_to_chinese(calc_result)

    return f"🧮 計算結果：{calc_result}\n🌐 翻譯後：{translated}"


if __name__ == "__main__":
    print("🧙 啟動器陣合一 · 多工具協作練功...\n")

    while True:
        task = input("👤 輸入任務（輸入 exit 離開）：")
        if task.lower() == "exit":
            print("🔚 陣法收起，器陣隱去。")
            break

        result = multi_tool_agent(task)
        print("✨ 法寶陣法回應：\n", result)
        print("-" * 40)
