"""
call_api.py
-----------
功能說明：
  示範 AI Agent 調用外部 API（煉器）。
  這裡使用 Open-Meteo 免費天氣 API，查詢即時天氣。

修仙比喻：
  - API = 法寶
  - 調用 API = 修士以靈力催動法寶
  - 回傳結果 = 法寶釋放靈光，顯現天機
"""

import requests
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

# 🧙 初始化 LLM
llm = ChatOpenAI(
    model=LLM_MODEL,
    temperature=0,
    api_key=GROQ_API_KEY,
    base_url=OPENAI_API_BASE,
)


# 🔮 工具：天氣 API
def get_weather(latitude: float, longitude: float):
    """
    呼叫 Open-Meteo API，取得當前天氣。
    """
    url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current_weather=true"
    response = requests.get(url)
    data = response.json()
    return data["current_weather"]


# 🧙 AI Agent，根據需求決定如何回應
def weather_agent(location: str):
    """
    Agent 先解釋，然後調用 API，最後生成文字回應。
    """
    # 為了簡單，我們手動設定一些地點座標（可延伸成地理查詢 API）
    coords = {
        "台北": (25.0330, 121.5654),
        "東京": (35.6895, 139.6917),
        "紐約": (40.7128, -74.0060),
    }

    if location not in coords:
        return f"抱歉，目前法寶僅支援：{list(coords.keys())}"

    lat, lon = coords[location]
    weather = get_weather(lat, lon)

    # 讓 LLM 把天氣數據轉成仙俠風格回答
    prompt = f"""
    你是一位修仙者，請根據以下天氣資訊，描述 {location} 的天象：
    {weather}
    """
    response = llm.invoke(prompt)
    return response.content


if __name__ == "__main__":
    print("🧙 啟動煉器 · 天氣占卜法寶...\n")

    while True:
        loc = input("👤 想查哪裡的天氣？（台北/東京/紐約，輸入 exit 離開）：")
        if loc.lower() == "exit":
            print("🔚 法寶收起，煉器暫止。")
            break

        result = weather_agent(loc)
        print("✨ 法寶回應：", result)
        print("-" * 40)
