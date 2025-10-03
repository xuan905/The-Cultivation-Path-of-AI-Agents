"""
custom_tools.py
----------------
功能：
  開發門派專屬工具，供分神施法。
修仙比喻：
  打造法寶，提升分神威力。
"""

class SectTool:
    def __init__(self, name, power):
        self.name = name
        self.power = power

    def use(self):
        print(f"🛠 {self.name} 施展法力，威力 {self.power}!")

# -------------------------
# 範例測試
# -------------------------
if __name__ == "__main__":
    sword = SectTool("靈劍", 80)
    potion = SectTool("療傷丹", 50)
    sword.use()
    potion.use()
