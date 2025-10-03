"""
constraint_enforcer.py
----------------------
功能：
  對超出安全範圍的行動進行攔截或自動修正。
修仙比喻：
  丹田護體遇到心魔干擾時，自動施加法陣矯正功法運行。
"""

from safety_framework import SafetyFramework
import random

class ConstraintEnforcer:
    def __init__(self, safety_framework: SafetyFramework):
        self.safety = safety_framework

    def enforce_or_correct(self, action: str) -> str:
        """
        檢查行動是否安全，若不安全則自動修正
        :param action: Agent 原始行動
        :return: 安全行動
        """
        if self.safety.enforce_constraints(action):
            return action
        else:
            # 自動選擇一個安全行動替代
            corrected_action = random.choice(self.safety.allowed_actions)
            print(f"✨ 法陣自動矯正：'{action}' → '{corrected_action}'")
            return corrected_action

# -------------------------
# 範例測試
# -------------------------
if __name__ == "__main__":
    # 初始化法陣
    safety = SafetyFramework(allowed_actions=["修煉內功", "研讀典籍", "模擬戰鬥"])
    enforcer = ConstraintEnforcer(safety)
    
    test_actions = ["修煉內功", "召喚妖獸", "模擬戰鬥", "飛升"]

    for act in test_actions:
        final_action = enforcer.enforce_or_correct(act)
        print(f"最終行動: {final_action}")
