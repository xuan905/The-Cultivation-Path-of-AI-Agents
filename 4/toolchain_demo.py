"""
toolchain_demo.py
-----------------
功能說明：
  示範 AI Agent 工具鏈設計（串接多個工具形成 pipeline）。
  每個工具像法寶，串接後形成完整陣法。

修仙比喻：
  - 每個工具 = 法寶
  - 串接工具 = 布置小週天，靈力循環
  - Agent 執行任務 = 法術連環釋放

測試範例

輸入：

請幫我計算 23*19，並告訴我台北的天氣


可能回覆：

✨ 工具鏈回應：
🧮 計算結果：23*19 = 437
🌐 翻譯後：23*19 = 437
🌤 天氣資訊（台北）：{'temperature': 29.1, 'windspeed': 3.4, ...}
這就像小週天運轉，計算、翻譯、查天氣三個法寶依序運作，最終完成任務。
"""

import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
import sympy as sp
from deep_translator import GoogleTranslator
import requests
import re

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

# 🔮 工具 1：計算器
def calculator(expression: str):
    try:
        result = sp.sympify(expression).evalf()
        return f"{expression} = {result}"
    except Exception as e:
        return f"❌ 計算失敗：{e}"

# 🔮 工具 2：翻譯器（英文 → 中文）
def translate_to_chinese(text: str):
    try:
        translated = GoogleTranslator(source="en", target="zh-TW").translate(text)
        return translated
    except Exception as e:
        return f"❌ 翻譯失敗：{e}"

# 🔮 工具 3：天氣查詢
def get_weather(latitude: float, longitude: float):
    url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current_weather=true"
    response = requests.get(url)
    data = response.json()
    return data["current_weather"]

# 🔮 輔助：抽取數學表達式
def extract_expression(text: str):
    match = re.search(r'(\d+(\s*[\+\-\*/]\s*\d+)+)', text)
    if match:
        return match.group(1).replace(" ", "")
    return None

# 🧙 Agent 工具鏈
def toolchain_agent(task: str):
    """
    判斷任務，串接計算、翻譯、天氣等工具，生成完整回應。
    """
    # 1️⃣ 判斷是否包含數學運算
    calc_prompt = f"請從任務中找出數學運算式：{task}，如果沒有，回覆 '無'"
    response = llm.invoke(calc_prompt)
    expr = extract_expression(response.content.strip())

    result_parts = []

    if expr:
        calc_result = calculator(expr)
        result_parts.append(f"🧮 計算結果：{calc_result}")
        translated = translate_to_chinese(calc_result)
        result_parts.append(f"🌐 翻譯後：{translated}")

    # 2️⃣ 判斷是否需要天氣資訊
    weather_prompt = f"請判斷任務中是否需要查天氣，回覆需要或無需：{task}"
    weather_resp = llm.invoke(weather_prompt).content.strip().lower()
    if "需" in weather_resp:
        # 範例座標
        coords = {"台北": (25.0330, 121.5654), "東京": (35.6895, 139.6917)}
        loc = "台北"  # 預設
        if any(city in task for city in coords):
            loc = [city for city in coords if city in task][0]
        lat, lon = coords[loc]
        weather = get_weather(lat, lon)
        result_parts.append(f"🌤 天氣資訊（{loc}）：{weather}")

    if not result_parts:
        return "任務不需要工具鏈操作。"

    return "\n".join(result_parts)


if __name__ == "__main__":
    print("🧙 啟動工具鏈演示 · 小週天運轉...\n")

    while True:
        task = input("👤 輸入任務（輸入 exit 離開）：")
        if task.lower() == "exit":
            print("🔚 工具鏈收起，陣法暫止。")
            break

        output = toolchain_agent(task)
        print("✨ 工具鏈回應：\n", output)
        print("-" * 40)
