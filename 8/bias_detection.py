"""
bias_detection.py
-----------------
功能：
  檢測模型或 Agent 輸出是否異常或偏離預期。
修仙比喻：
  心魔感知，發現幻象，避免走火入魔。
"""

import re

def detect_bias(output: str, expected_keywords: list) -> bool:
    """
    檢測輸出是否偏離預期
    :param output: 模型或 Agent 輸出文本
    :param expected_keywords: 預期出現的關鍵字列表
    :return: True 表示偏差或幻覺，False 表示正常
    """
    for kw in expected_keywords:
        if re.search(kw, output) is None:
            # 發現心魔幻象
            return True
    return False

# -------------------------
# 範例測試
# -------------------------
if __name__ == "__main__":
    agent_output = "分神甲修煉內功，但心魔干擾，出現幻象"
    expected = ["修煉", "內功"]  # 預期關鍵字
    
    if detect_bias(agent_output, expected):
        print("⚠️ 偏差警告：輸出可能受到心魔干擾！")
    else:
        print("✅ 輸出正常，無異常偏差。")
