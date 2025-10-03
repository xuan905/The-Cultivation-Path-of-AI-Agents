
## 安裝 Python 虛擬環境說明

1. 安裝 Python（建議 3.8 以上版本）。
2. 開啟命令提示字元（cmd），切換到本專案資料夾。
3. 建立虛擬環境：
	```cmd
	python -m venv venv
	```
4. 啟動虛擬環境：
	```cmd
	venv\Scripts\activate
	```

	 # 啟用 (Linux/macOS)
source venv/bin/activate  

5. 安裝所需套件：
	```cmd
	pip install -r requirements.txt
	```


## Python Virtual Environment Setup Instructions

1. Install Python (recommended version 3.8 or above).
2. Open Command Prompt (cmd) and navigate to the project folder.
3. Create a virtual environment:
	```cmd
	python -m venv venv
	```
4. Activate the virtual environment:
	```cmd
	venv\Scripts\activate
	```
5. Install required packages:
	```cmd
	pip install -r requirements.txt
	```
## 專案結構說明

本專案目錄結構如下：

```
The-Cultivation-Path-of-AI-Agents/
├── 1/   # 基礎記憶、靈感覺醒等模組
├── 2/   # 上下文管理、模型選擇等模組
├── 3/   # 記憶體管理、知識注入等模組
├── 4/   # API 呼叫、工具鏈、任務分解等模組
├── 5/   # 多智能體系統、共識模組等
├── 6/   # 自主規劃、目標設定、長期追蹤等
├── 7/   # 強化學習、獎勵機制、自我提升等
├── 8/   # 安全審計、偏誤偵測、約束強化等
├── 9/   # 適應型學習、個人助理、研究助理等
├── 10/  # 門派架構、知識庫、工具自訂等
├── 11/  # 專案初始化、知識管理、模擬器等
├── 12/  # 自主智能體、未來演化、多智能體協作等
├── audit_log.json           # 審計日誌
├── long_term_memory.json    # 長期記憶資料
├── README.MD                # 中文說明文件
├── README_EN.MD             # 英文說明文件
└── requirements.txt         # Python 套件需求
```

requirements.txt
