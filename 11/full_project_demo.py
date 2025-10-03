"""
full_project_demo.py
--------------------
功能：
  整合知識管理、任務助手、模擬師與分神，模擬仙界試煉全流程。
修仙比喻：
  門派法力全開，分神協同運作，完成飛升。
"""

from knowledge_manager import KnowledgeManager
from task_assistant import TaskAssistant, DummyAgent
from simulator import Simulator

# 1️⃣ 建立知識管理師
km = KnowledgeManager()
km.add_knowledge("丹道修煉", "每日服食靈丹，內力自增")
km.add_knowledge("法寶運用", "法寶需與靈力相符才能發揮威力")

# 2️⃣ 建立任務助手與分神
assistant = TaskAssistant()
tasks = ["煉製回春丹", "劍法修煉", "符咒陣法演練", "靈力調息"]
for t in tasks:
    assistant.add_task(t)

agents = [DummyAgent("分神甲"), DummyAgent("分神乙"), DummyAgent("分神丙")]

# 3️⃣ 分神執行任務
assistant.assign_tasks(agents)

# 4️⃣ 模擬師驗證任務成果
sim = Simulator()
for t in tasks:
    sim.run_task_simulation(t)
sim.show_results()

# 5️⃣ 結尾
print("\n🌟 仙界試煉模擬完成，分神各司其職，專案全流程運作穩定，功力提升。")
