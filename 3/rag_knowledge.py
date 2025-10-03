"""
rag_knowledge.py
安裝套件
pip install langchain-openai scikit-learn

--------------------
功能說明：
  使用 RAG (Retrieval-Augmented Generation) 技術，
  從外部知識庫檢索資訊，再交給 LLM 回答。

修仙比喻：
  - RAG = 聚靈
  - 修士先吸納天地靈氣（檢索知識），
    再以自身靈根（LLM）運轉功法，化為術法（答案）。


使用範例
🌌 聚靈開始：RAG 修仙知識檢索

👤 問題（輸入 exit 結束）：築基怎麼突破？
🧙 回應：修士若欲築基，須將靈氣凝於丹田，如築高樓之基石。若根基不穩，則後續修行如浮沙建塔，必然坍塌。

👤 問題（輸入 exit 結束）：劍修的修煉之道？
🧙 回應：劍修以劍為道，修煉劍意可破萬法。當一劍出鞘，天地皆為其劍鋒所指。    

📌 特點：

模擬「AI 聚靈吸納天地靈氣」 → 從知識庫檢索相關內容

結合 LLM → 生成仙俠風格回答

支援替換成 真實知識庫（檔案 / PDF / 向量資料庫）


"""


import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# 🌱 載入環境變數
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
LLM_MODEL = os.getenv("LLM_MODEL", "llama-3.1-8b-instant")
OPENAI_API_BASE = os.getenv("OPENAI_API_BASE", "https://api.groq.com/openai/v1")

if not GROQ_API_KEY:
    raise ValueError("❌ 沒有讀到 GROQ_API_KEY，請檢查 .env 或環境變數")

# 🧙 初始化 LLM
llm = ChatOpenAI(
    model=LLM_MODEL,
    temperature=0.3,
    api_key=GROQ_API_KEY,
    base_url=OPENAI_API_BASE
)

# 📖 模擬外部知識庫
documents = [
    "修士若要突破築基，需凝聚靈氣於丹田，打下根基。",
    "丹藥能輔助修行，但需搭配正確心法，否則反噬。",
    "劍修以劍為道，修煉劍意可破萬法。",
    "符修以符為引，借天地之力施展符術。",
    "煉體修士鍛鍊肉身，以血肉為爐，力可撼山河。"
]

# 🔍 建立向量化工具
vectorizer = TfidfVectorizer()
doc_vectors = vectorizer.fit_transform(documents)

def rag_answer(query: str):
    """用 TF-IDF + cosine similarity 模擬 RAG"""
    query_vec = vectorizer.transform([query])
    sims = cosine_similarity(query_vec, doc_vectors).flatten()
    best_idx = sims.argsort()[-2:][::-1]  # 取最相關的前2句

    context = "\n".join([documents[i] for i in best_idx])
    prompt = f"""你是一位修仙智者。
以下是你可引用的修仙典籍：
{context}

問題：{query}

請根據典籍內容回答，並用仙俠風格敘述。
"""
    response = llm.invoke(prompt)
    return response.content

if __name__ == "__main__":
    print("🌌 聚靈開始：簡易 RAG 修仙知識檢索\n")
    while True:
        q = input("👤 問題（輸入 exit 結束）：")
        if q.lower() == "exit":
            print("🔚 聚靈結束，靈氣散去。")
            break
        ans = rag_answer(q)
        print("🧙 回應：", ans)
        print("-" * 40)
