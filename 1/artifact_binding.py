"""
artifact_binding.py
-------------------
功能說明：
  結合外部工具（例如天氣 API），提供實際功能。
  AI Agent 不只是會聊天，還能操控法寶（工具），完成任務。

修仙比喻：
  煉器 —— 修士煉製法寶，注入靈力後能施展更強大的神通。
  這裡的「法寶」就是外部工具 API。
"""

import requests

def get_weather(city="Taipei"):
    """
    喚出天氣法寶，查詢指定城市天氣
    """
    url = f"https://wttr.in/{city}?format=3"
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    else:
        return "⚠️ 法寶失靈，無法查詢天氣。"

if __name__ == "__main__":
    print("🧙 施展煉器法術：呼喚天氣法寶...\n")
    city = input("請輸入城市名稱（預設 Taipei）：") or "Taipei"
    weather = get_weather(city)
    print(f"🌤 {city} 今日天氣：{weather}")

# 修仙思路：

# 這個範例示範「AI Agent + 工具」，就像修士煉製法寶後能隨心施展神通。

# 之後你可以把這個工具整合到 ChatOpenAI 或其他 Agent，讓它自動查天氣、發通知，真正成為 可用的修仙小助手。