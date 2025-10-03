"""
multi_tool_pipeline.py
----------------------
功能：
  結合多個工具完成複雜任務，如翻譯、計算、問答。
修仙比喻：
  多法寶同時運作，法陣高效完成任務。
"""

def translate(text):
    return f"[翻譯]{text}"

def compute(expression):
    try:
        return eval(expression)
    except:
        return "計算失敗"

def answer_question(question):
    return f"問題答案: {len(question)} 個字"

# 範例 pipeline
if __name__ == "__main__":
    text = "修仙者每日修煉"
    expr = "23*19"
    question = "門派共有多少分神？"

    print(translate(text))
    print(f"{expr} = {compute(expr)}")
    print(answer_question(question))
