# Kairos Realtime LGD Demo

這是從 [Kairos-LGD-Demo/realtime-demo](https://github.com/SLXSH57/Kairos-LGD-Demo/tree/main/realtime-demo) 複製的獨立 Realtime LGD 語音測試專案。

## 功能
- 單一 WebRTC Realtime Session 與麥克風語音輸入
- `select_speaker` 決定 NPC 發言角色
- `submit_turn` 產生角色回答及 `next_speaker_id`
- NPC A 明確提問 B 時，自動安排 B 接話（最多 A → B）
- 右側面談目標達成狀態、綠燈與四秒倒數自動送出前端事件

## 執行方法
需要 Node.js 20+，並準備具有 Realtime API 使用權限的 API Key。

```bash
npm install
cp .env.example .env
# 將 API Key 填入 .env 的 OPENAI_API_KEY
npm start
```

以瀏覽器開啟 http://localhost:3000，允許麥克風權限。

## 檔案
- [realtime-demo/index.html](./realtime-demo/index.html) - UI 與前端 Function 控制
- [server.mjs](./server.mjs) - Realtime WebRTC SDP 連線代理
- [package.json](./package.json) - Node.js 依賴
- [.env.example](./.env.example) - 設定範例

## 注意
這是實驗性程式碼，尚未在本對話中使用真實 API Key 進行端到端驗證。自動提交目前是**瀏覽器事件**，不是正式後端資料庫提交。目標條件需依正式評鑑情境重新定義與驗證。不要將 API Key 或敏感對話資料提交到版本庫。
