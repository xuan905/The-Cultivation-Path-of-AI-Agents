"""
foundation_memory.py
--------------------
功能說明：
  建立簡單的 AI 記憶系統，模擬短期與長期記憶。

修仙比喻：
  - 短期記憶：臨時丹氣，戰鬥中即時調用
  - 長期記憶：真氣累積，持續存放於丹田
"""

import os
import json
from collections import deque

# 📜 短期記憶（臨時靈力，固定容量）
short_term_memory = deque(maxlen=5)

# 📦 長期記憶（真氣累積，存入檔案）
LONG_TERM_FILE = "long_term_memory.json"

def load_long_term_memory():
    if os.path.exists(LONG_TERM_FILE):
        with open(LONG_TERM_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_long_term_memory(memories):
    with open(LONG_TERM_FILE, "w", encoding="utf-8") as f:
        json.dump(memories, f, ensure_ascii=False, indent=2)

# 初始化長期記憶
long_term_memory = load_long_term_memory()

def add_memory(text, long_term=False):
    """加入記憶：短期 or 長期"""
    if long_term:
        long_term_memory.append(text)
        save_long_term_memory(long_term_memory)
        print(f"💾 [真氣累積] 已存入長期記憶：{text}")
    else:
        short_term_memory.append(text)
        print(f"⚡ [臨時靈氣] 短期記憶吸納：{text}")

def show_memories():
    print("\n📖 當前記憶：")
    print("⚡ 短期記憶：", list(short_term_memory))
    print("💾 長期記憶：", long_term_memory)

if __name__ == "__main__":
    print("🧘 開始修煉：AI 記憶系統\n")
    while True:
        cmd = input("輸入內容（add 短期 / addl 長期 / show / exit）：")
        if cmd == "exit":
            print("🔚 收功，修煉暫歇。")
            break
        elif cmd.startswith("addl "):
            add_memory(cmd[5:], long_term=True)
        elif cmd.startswith("add "):
            add_memory(cmd[4:], long_term=False)
        elif cmd == "show":
            show_memories()
