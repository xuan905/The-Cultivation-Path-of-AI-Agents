"""
foundation_memory.py
-------------------
功能說明：
  讓 AI 記住對話內容，建立簡單的記憶系統。
  可以累積對話歷史，未來回應時參考之前的訊息。

修仙比喻：
  築基 —— 穩固丹田，累積靈力，避免散失。
  這裡的「丹田」就是 AI 的記憶庫，累積知識與對話經驗。
"""

# 建立簡單記憶系統
memory = []

def agent_reply(user_input):
    """
    AI 回應使用者，同時將輸入存入記憶庫
    """
    memory.append(user_input)
    # 生成簡單回應，示範記憶功能
    return f"我記住了你的話：'{user_input}'"

if __name__ == "__main__":
    print("🧙 開始築基：建立 AI 記憶系統\n")

    while True:
        user_input = input("👤 請說話（輸入 exit 離開）：")
        if user_input.lower() == "exit":
            print("🔚 修煉結束，記憶存檔完成。")
            break

        response = agent_reply(user_input)
        print("🧙 AI 回應：", response)
        print("📜 目前記憶庫：", memory)
        print("-" * 40)
