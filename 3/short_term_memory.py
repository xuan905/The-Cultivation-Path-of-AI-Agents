"""
short_term_memory.py
--------------------
功能說明：
  模擬 AI 的短期記憶，容量有限，僅保存最近的訊息。

修仙比喻：
  - 短期記憶 = 臨時丹氣
  - 戰鬥時刻凝聚的靈力，只能短時間內使用
  - 當新靈氣注入，舊靈氣就會消散
"""

from collections import deque

# ⚡ 短期記憶（容量 = 5）
short_term_memory = deque(maxlen=5)

def add_to_memory(event: str):
    """將事件或對話加入短期記憶"""
    short_term_memory.append(event)
    print(f"⚡ [臨時丹氣注入] {event}")

def show_memory():
    """展示當前短期記憶"""
    print("\n📖 當前短期記憶：")
    for i, m in enumerate(short_term_memory, start=1):
        print(f"  {i}. {m}")
    print("-" * 40)

if __name__ == "__main__":
    print("🧘 開始修煉：短期記憶（臨時丹氣）\n")
    
    while True:
        cmd = input("輸入內容（add xxx / show / exit）：")
        
        if cmd == "exit":
            print("🔚 收功，臨時丹氣散去。")
            break
        elif cmd.startswith("add "):
            event = cmd[4:]
            add_to_memory(event)
        elif cmd == "show":
            show_memory()


        """
 🧘 開始修煉：短期記憶（臨時丹氣）

輸入內容（add xxx / show / exit）：add 小凡閱讀《太初心法》
⚡ [臨時丹氣注入] 小凡閱讀《太初心法》

輸入內容（add xxx / show / exit）：add 小凡嘗試運轉靈力
⚡ [臨時丹氣注入] 小凡嘗試運轉靈力

輸入內容（add xxx / show / exit）：show

📖 當前短期記憶：
  1. 小凡閱讀《太初心法》
  2. 小凡嘗試運轉靈力
----------------------------------------

        """
