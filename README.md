# 家庭帳本
簡單的記帳軟體

## 功能
- 可新增不同使用者，不同使用者不會看到彼此記帳內容
- 新增記帳內容可輸入名稱﹑日期﹑分類還有金額
- 記帳內容新增後可以在進行修改或是刪除
- 主頁面可以顯示記帳內容的總金額
- 總金額可以挑選不同的分類進行合計

## 安裝
1. 終端機輸入 git clone https://github.com/WangRping/expense-tracker.git
2. 終端機輸入 npm install
3. mkdir .env (創建.env檔案)
4. 編輯.env > MONGODB_URI = mongodb+srv://<username>:<password>@cluster0.ngwexuq.mongodb.net/<database>?retryWrites=true&w=majority
5. 終端機輸入 npm run seed
6. 終端機輸入 Ctrl + C (停止seed程序)
7. 終端機輸入 npm run dev (啟動專案)
8. 瀏覽器輸入網址 : http://localhost:3000 即可使用

