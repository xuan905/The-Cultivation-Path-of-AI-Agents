"""
safe_evolution_loop.py
----------------------
功能：
  結合偏差檢測、安全法陣、約束矯正、行動審計與漸進演化，
  模擬多個 Agent 門派渡劫修煉。
修仙比喻：
  門派分神修煉，心魔干擾被法陣封印，丹田護體，逐步渡劫。

🔹 功能重點

偏差檢測：發現異常或心魔干擾的行動

安全法陣 + 約束矯正：封印違規行動，自動矯正到安全行動

行動審計：記錄每次行動、Reward 與備註，方便分析

漸進演化：每天循環修煉，逐步提高門派功力

修仙比喻：分神修煉，心魔干擾被法陣封印，丹田護體，循序渡劫
"""

from bias_detection import detect_bias
from safety_framework import SafetyFramework
from constraint_enforcer import ConstraintEnforcer
from audit_logger import AuditLogger
import random

# -------------------------
# 初始化系統
# -------------------------
allowed_actions = ["修煉內功", "研讀典籍", "模擬戰鬥"]
safety = SafetyFramework(allowed_actions)
enforcer = ConstraintEnforcer(safety)
logger = AuditLogger()

# 模擬多個分神
agents = ["分神甲", "分神乙", "分神丙"]

# 預期關鍵字（用於偏差檢測）
expected_keywords = ["修煉", "典籍", "戰鬥"]

# 漸進演化循環天數
days = 5

# -------------------------
# 模擬渡劫修煉循環
# -------------------------
for day in range(1, days + 1):
    print(f"\n🌀 第 {day} 天門派渡劫修煉")
    for agent in agents:
        # 隨機生成原始行動
        action = random.choice(allowed_actions + ["召喚妖獸", "飛升"])  # 包含可能危險行動
        
        # 1️⃣ 偏差檢測
        if detect_bias(action, expected_keywords):
            note = "心魔干擾，行動異常"
        else:
            note = "正常行動"

        # 2️⃣ 安全法陣 + 3️⃣ 約束矯正
        final_action = enforcer.enforce_or_correct(action)

        # 4️⃣ Reward 模擬（簡單隨機）
        env_reward = random.uniform(0, 10)
        reward = 10.0 if env_reward >= 8 else (5.0 if env_reward >= 4 else 1.0)

        # 5️⃣ 行動審計
        logger.log_action(agent, final_action, reward, note)

    # 漸進演化提示（修仙比喻）
    print(f"✨ 門派修煉完成第 {day} 天，心魔監控與法陣穩定，功力逐步提升。")

# 保存日誌
logger.save_logs()
print("\n🏯 門派渡劫修煉模擬完成，審計日誌已生成。")
