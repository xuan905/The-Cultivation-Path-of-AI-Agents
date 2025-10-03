"""
task_dispatcher.py
------------------
功能說明：
  將大任務拆解成子任務，分派給不同 Agent。
修仙比喻：
  - 任務拆解 = 布置大陣陣眼
"""

def dispatch(task: str, agents: list):
    """
    將任務拆解並分配給 Agents
    """
    # 簡單拆分子任務：以逗號分隔
    steps = [s.strip() for s in task.split(",")]
    results = []
    for i, agent in enumerate(agents):
        if i < len(steps):
            results.append(agent.act(steps[i]))
        else:
            # 沒有對應子任務，Agent 保持待命
            results.append(f"{agent.name} ({agent.role}) 無任務執行")
    return results
