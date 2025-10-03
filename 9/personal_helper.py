"""
personal_helper.py
------------------
功能：
  AI 幫助安排日程、提醒修煉、追蹤健康狀態。
修仙比喻：
  貼身侍從，協助管理丹田與功課。
"""

import datetime

class PersonalHelper:
    def __init__(self, name):
        self.name = name
        self.tasks = []

    def add_task(self, task, time):
        self.tasks.append({"task": task, "time": time})

    def show_schedule(self):
        print(f"{self.name} 今日修仙日程：")
        for t in self.tasks:
            print(f"  {t['time']} → {t['task']}")

# -------------------------
# 範例測試
# -------------------------
if __name__ == "__main__":
    helper = PersonalHelper("分神丙")
    helper.add_task("修煉內功", "08:00")
    helper.add_task("研讀典籍", "10:00")
    helper.add_task("模擬戰鬥", "14:00")
    helper.show_schedule()
