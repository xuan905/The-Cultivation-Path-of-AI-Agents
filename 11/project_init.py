"""
project_init.py
----------------
功能：
  建立專案目錄與基本架構，檢查環境依賴。
修仙比喻：
  築基建道場，鋪設經脈與靈脈。
"""

import os

PROJECT_DIR = "仙界試煉專案"
MODULES = ["knowledge_manager", "task_assistant", "simulator", "agents"]

def init_project():
    if not os.path.exists(PROJECT_DIR):
        os.mkdir(PROJECT_DIR)
        print(f"🏯 專案目錄建立：{PROJECT_DIR}")
    for m in MODULES:
        module_path = os.path.join(PROJECT_DIR, m)
        os.makedirs(module_path, exist_ok=True)
        init_file = os.path.join(module_path, "__init__.py")
        with open(init_file, "w") as f:
            f.write("# 模組初始化")
        print(f"🔹 模組建立：{module_path}")

if __name__ == "__main__":
    init_project()
