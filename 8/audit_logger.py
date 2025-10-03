"""
audit_logger.py
----------------
功能：
  記錄 Agent 的行動決策與回饋，方便後續分析與安全監控。
修仙比喻：
  修士每日反省，檢視法力運行與心魔狀態，防止走火入魔。
"""

import datetime
import json
from typing import List, Dict

class AuditLogger:
    def __init__(self):
        self.logs: List[Dict] = []

    def log_action(self, agent_name: str, action: str, reward: float, note: str = ""):
        """
        記錄單次行動
        """
        entry = {
            "timestamp": datetime.datetime.now().isoformat(),
            "agent": agent_name,
            "action": action,
            "reward": reward,
            "note": note
        }
        self.logs.append(entry)
        print(f"📜 記錄行動：{agent_name} | {action} | Reward={reward} | Note={note}")

    def save_logs(self, filename: str = "audit_log.json"):
        """
        將所有行動日誌保存為 JSON
        """
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(self.logs, f, ensure_ascii=False, indent=2)
        print(f"✅ 日誌已保存至 {filename}")

    def get_logs(self):
        """
        返回日誌列表
        """
        return self.logs

# -------------------------
# 範例測試
# -------------------------
if __name__ == "__main__":
    logger = AuditLogger()
    
    # 模擬 Agent 行動記錄
    logger.log_action("分神甲", "修煉內功", reward=10.0, note="穩定增益")
    logger.log_action("分神乙", "召喚妖獸", reward=0.0, note="被法陣封印")
    logger.log_action("分神丙", "模擬戰鬥", reward=7.5, note="中等增益")
    
    # 保存日誌
    logger.save_logs()
