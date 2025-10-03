"""
feedback_loop_multi_agent.py
----------------------------
功能說明：
  多 Agent 協作完成任務，依照反饋修正行動。
修仙比喻：
  - 反饋循環 = 修士實戰演練，出手 → 覺察 → 修正

✅ 執行效果

輸入：

準備資料,分析策略,統籌指令
這樣完整展示了 單體 Agent → 任務拆解 → 分派 → 多 Agent 協作 → 共識 → 反饋循環。
"""

from multi_agent_system import agents
from task_dispatcher import dispatch
from consensus_module import consensus

def feedback_loop_multi(task: str, agents: list, max_rounds: int = 3):
    """
    進行多 Agent 協作與反饋循環
    """
    for round in range(max_rounds):
        print(f"\n🌀 第 {round+1} 回合")
        results = dispatch(task, agents)
        print("\n".join(results))
        # 模擬 Agent 投票或決策
        votes = [r.split("：")[-1] for r in results]
        decision = consensus(votes)
        print(decision)
        # 模擬反饋修正：下一回合加上「調整」
        task += "（調整）"

if __name__ == "__main__":
    print("🧙 啟動多 Agent 協作實戰演練...\n")
    task = input("👤 輸入大任務（可用逗號分隔子任務）：")
    feedback_loop_multi(task, agents)
    print("\n🔚 多 Agent 演練結束，門派大陣收起。")
