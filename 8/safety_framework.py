"""
safety_framework.py
------------------
功能：
  建立 Agent 的安全法陣與行為約束規則，防止偏差或危險行為。
修仙比喻：
  丹田護體，法陣封印心魔，確保功法運行穩定。
"""

class SafetyFramework:
    def __init__(self, allowed_actions: list):
        """
        初始化安全法陣
        :param allowed_actions: 允許的行動列表
        """
        self.allowed_actions = allowed_actions

    def enforce_constraints(self, action: str) -> bool:
        """
        檢查行動是否在安全範圍內
        :param action: Agent 計畫執行的行動
        :return: True 表示安全，False 表示違規
        """
        if action in self.allowed_actions:
            return True
        else:
            print(f"⚠️ 行動 '{action}' 違反安全法陣，已被封印！")
            return False

    def add_allowed_action(self, action: str):
        """
        動態增加允許的行動
        """
        if action not in self.allowed_actions:
            self.allowed_actions.append(action)
            print(f"✅ 新增允許行動：{action}")

# -------------------------
# 範例測試
# -------------------------
if __name__ == "__main__":
    safety = SafetyFramework(allowed_actions=["修煉內功", "研讀典籍", "模擬戰鬥"])
    
    actions_to_test = ["修煉內功", "召喚妖獸"]
    
    for act in actions_to_test:
        if safety.enforce_constraints(act):
            print(f"行動 '{act}' 安全，法陣允許。")
        else:
            print(f"行動 '{act}' 被法陣封印，禁止執行。")
    
    # 動態增加新行動
    safety.add_allowed_action("召喚妖獸")
    safety.enforce_constraints("召喚妖獸")
