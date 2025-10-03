"""
reward_mechanism.py
------------------
功能：
  定義成功、部分成功與失敗的回饋數值。
修仙比喻：
  修煉獲得靈力增減，影響修為提升速度。
"""

def calculate_reward(env_reward: float) -> float:
    """
    將環境分數轉換為強化學習的 Reward
    """
    if env_reward >= 8:
        return 10.0   # 大幅增益
    elif env_reward >= 4:
        return 5.0    # 中等增益
    else:
        return 1.0    # 小增益
