"""
long_term_memory.py
--------------------
功能說明：
  模擬 AI 的長期記憶，將事件保存到檔案中，持久存在。

修仙比喻：
  - 長期記憶 = 真氣累積
  - 修士多年苦修，靈力不斷積蓄，日後可用於施展高階法術
"""

import os
import json

# 💾 長期記憶檔案
LONG_TERM_FILE = "long_term_memory.json"

def load_long_term_memory():
    """讀取長期記憶（如果檔案不存在則返回空列表）"""
    if os.path.exists(LONG_TERM_FILE):
        with open(LONG_TERM_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_long_term_memory(memories):
    """儲存長期記憶到檔案"""
    with open(LONG_TERM_FILE, "w", encoding="utf-8") as f:
        json.dump(memories, f, ensure_ascii=False, indent=2)

# 初始化：載入既有長期記憶
long_term_memory = load_long_term_memory()

def add_long_term_memory(event: str):
    """加入一條長期記憶"""
    long_term_memory.append(event)
    save_long_term_memory(long_term_memory)
    print(f"💾 [真氣累積] 已存入長期記憶：{event}")

def show_long_term_memory():
    """展示所有長期記憶"""
    print("\n📖 當前長期記憶（真氣庫）：")
    if not long_term_memory:
        print("  （尚無記憶，真氣空空）")
    else:
        for i, m in enumerate(long_term_memory, start=1):
            print(f"  {i}. {m}")
    print("-" * 40)

if __name__ == "__main__":
    print("🧘 開始修煉：長期記憶（真氣累積）\n")

    while True:
        cmd = input("輸入內容（add xxx / show / exit）：")

        if cmd == "exit":
            print("🔚 收功，真氣凝於丹田。")
            break
        elif cmd.startswith("add "):
            event = cmd[4:]
            add_long_term_memory(event)
        elif cmd == "show":
            show_long_term_memory()

"""
🧘 開始修煉：長期記憶（真氣累積）

輸入內容（add xxx / show / exit）：add 小凡閉關七日，領悟劍意
💾 [真氣累積] 已存入長期記憶：小凡閉關七日，領悟劍意

輸入內容（add xxx / show / exit）：add 小凡煉化靈丹，真氣倍增
💾 [真氣累積] 已存入長期記憶：小凡煉化靈丹，真氣倍增

輸入內容（add xxx / show / exit）：show

📖 當前長期記憶（真氣庫）：
  1. 小凡閉關七日，領悟劍意
  2. 小凡煉化靈丹，真氣倍增
----------------------------------------

📌 特點：

所有事件都存到 long_term_memory.json，程式重啟後依然存在。

模擬「真氣」一點一滴累積，越來越強大。

和 short_term_memory.py 可以搭配，做出「臨時丹氣 + 真氣累積」的完整修煉系統。
"""