"""
consensus_module.py
------------------
功能說明：
  模擬多 Agent 協作決策，形成共識。
修仙比喻：
  - 共識 = 門派議事決策
"""

def consensus(votes: list):
    """
    votes: Agent 的決策列表
    返回最多票數的決策
    """
    if not votes:
        return "無共識"
    decision = max(set(votes), key=votes.count)
    return f"多 Agent 共識結果：{decision}"
