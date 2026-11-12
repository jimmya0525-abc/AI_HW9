# 📐 微積分課程講義 (Calculus Lecture Notes)

專為學習者打造的單元化線上微積分講義系統。依循課程進度編排，結合嚴謹的數學推導、標準 LaTeX 公式排版與逐步範例解析。

🔗 **線上瀏覽網址：** [https://jimmya0525-abc.github.io/AI_HW9/index.html](https://jimmya0525-abc.github.io/AI_HW9/index.html)

---

## 📚 章節目錄導覽

* [Chapter 01：極限及其性質](https://jimmya0525-abc.github.io/AI_HW9/chapters/ch01-limits.html)
* [Chapter 02：微分及其法則](https://jimmya0525-abc.github.io/AI_HW9/chapters/ch02-derivatives.html)
* [Chapter 03：微分之應用](https://jimmya0525-abc.github.io/AI_HW9/chapters/ch03-applications-of-differentiation.html)
* [Chapter 04：積分及其法則](https://jimmya0525-abc.github.io/AI_HW9/chapters/ch04-integrals.html)
* [Chapter 05：積分之應用](https://jimmya0525-abc.github.io/AI_HW9/chapters/ch05-applications-of-integration.html)
* [Chapter 06：進階積分技巧與瑕積分](https://jimmya0525-abc.github.io/AI_HW9/chapters/ch06-integration-techniques.html)
* [Chapter 07：無窮級數](https://jimmya0525-abc.github.io/AI_HW9/chapters/ch07-infinite-series.html)

---

## 💡 講義特色與排版設計

* **色系分級知識卡片：** 內文採用四種不同色系的邊框卡片區分知識層級，協助快速辨識重點：
  * **📘 定義 (Definition)｜青藍色邊框：** 收錄核心數學定義（如極限的 $\epsilon$-$\delta$ 定義、連續性三要素）。
  * **📗 定理 (Theorem)｜翡翠綠色邊框：** 記載重要性質與理論（如極限定理、夾擠定理、中間值定理）。
  * **📙 範例演算 (Example)｜暖琥珀色邊框：** 提供完整的推導過程與題型解析步驟。
  * **🟣 重點提示 (Note / Remark)｜柔紫色邊框：** 提醒常見易錯觀念（如無窮大並非實數、函數未定義處極限仍可能存在等）。
* **純靜態網頁架構：** 無依賴前端框架，直接透過原生 HTML、CSS 與 JavaScript 建構，搭配側邊欄章節目錄導覽與佈景主題切換功能，可直接部署於 GitHub Pages。

---

## 📁 專案檔案結構

```text
AI_HW9/
├── index.html                                     # 課程總覽與首頁入口
├── AGENTS.md                                      # 專案規範與協作指引
├── assets/
│   ├── css/
│   │   └── style.css                              # 全站樣式與知識卡片配色定義
│   └── js/
│       ├── nav.js                                 # 側邊欄章節目錄導覽邏輯
│       └── theme.js                               # 佈景主題切換功能
└── chapters/
    ├── ch01-limits.html                           # 第一章：極限及其性質
    ├── ch02-derivatives.html                      # 第二章：微分及其法則
    ├── ch03-applications-of-differentiation.html  # 第三章：微分之應用
    ├── ch04-integrals.html                        # 第四章：積分及其法則
    ├── ch05-applications-of-integration.html      # 第五章：積分之應用
    ├── ch06-integration-techniques.html           # 第六章：進階積分技巧與瑕積分
    └── ch07-infinite-series.html                  # 第七章：無窮級數
