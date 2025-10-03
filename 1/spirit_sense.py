# spirit_sense.py
"""
功能說明：
- 判斷使用者需求（關鍵字偵測）
- 理解輸入內容
修仙比喻：
- 吸取靈氣 → 修士學會感應天地靈氣，分辨用途
"""

import re

class SpiritSense:
    def __init__(self, keywords=None):
        # 設定要偵測的關鍵字清單
        self.keywords = keywords or ["查詢", "建議", "提醒", "問題", "購買"]

    def sense(self, user_input):
        """
        偵測使用者需求
        - user_input: str，使用者輸入文字
        - return: dict，包含偵測到的關鍵字及解讀結果
        """
        detected = []
        for kw in self.keywords:
            if re.search(kw, user_input):
                detected.append(kw)
        
        # 修仙比喻：吸收靈氣，理解用途
        interpretation = self.interpret(detected, user_input)
        
        return {
            "input": user_input,
            "detected_keywords": detected,
            "interpretation": interpretation
        }

    def interpret(self, detected_keywords, user_input):
        """
        根據偵測到的關鍵字，給出使用者需求解讀
        """
        if not detected_keywords:
            return "無法感應到特定需求，靈氣微弱，需進一步吸收資訊。"
        
        messages = []
        for kw in detected_keywords:
            if kw == "查詢":
                messages.append("使用者想獲取資訊，如修士探查靈氣動向。")
            elif kw == "建議":
                messages.append("使用者需要指引，如師父傳授修行心法。")
            elif kw == "提醒":
                messages.append("使用者希望獲得提示，如靈符提示危險。")
            elif kw == "問題":
                messages.append("使用者遇到困惑，如修士迷失於靈脈。")
            elif kw == "購買":
                messages.append("使用者想取得資源，如修士蒐集丹藥。")
        
        return "；".join(messages)

# 測試範例
if __name__ == "__main__":
    ss = SpiritSense()
    user_input = "我想要一些建議，還有購買的資訊。"
    result = ss.sense(user_input)
    print(result)

# 🔮 模組特點

# 靈氣吸收：使用者輸入被分析，像修士感應天地靈氣。

# 關鍵字偵測：keywords 可擴充，方便偵測不同需求。

# 需求理解：根據偵測結果提供對應解讀，比喻成修仙行為。

# 可擴充：未來可接 LLM 或更複雜的 NLP 模型來做深度理解。