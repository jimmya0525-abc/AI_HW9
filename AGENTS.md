# 微積分課程講義網站 — 專案協作規範與指引 (AGENTS.md)

本專案旨在建立一個結構嚴謹、排版優雅、專注於教學閱讀體驗的**微積分課程講義網站**。  
所有參與本專案開發的 AI Agent 與協作者，均須嚴格遵守本文件所規範的架構、限制與準則。

---

## 1. 專案目的

- **專注教學與閱讀**：為微積分課程打造單元化、結構清晰的線上講義平台。
- **一個章節獨立一篇**：每一課或每一主題均對應獨立的網頁檔案，便於學習者聚焦閱讀、隨時收藏與查閱特定章節。
- **純粹長效保存**：擺脫複雜框架與構建依賴，確保講義檔案在數年後無需維護環境即可原生在任何瀏覽器中正常開啟。

---

## 2. 運作方式

1. **靜態無建置模型 (Zero-Build Static Model)**：
   - 專案沒有打包工具（如 Webpack, Vite）或編譯步驟，所有檔案皆為純粹的原生前端資產（HTML5 / CSS3 / Vanilla JS）。
   - 瀏覽器直接讀取即可呈現，完全相容 GitHub Pages 託管環境。
2. **章節目錄集中維護機制**：
   - 全站的章節目錄清單定義於 `assets/js/nav.js` 中的設定物件（JSON 陣列）。
   - 各章節網頁透過引入 `nav.js`，於頁面載入時動態渲染左側章節導覽側邊欄（Sidebar），並自動為「當前所在章節」標記高亮狀態。
   - **好處**：新增章節時，僅需建立新章節 HTML 檔並於 `nav.js` 加入一筆資料，完全不需要手動修改所有舊有章節的側邊欄 HTML。
3. **數學公式渲染機制**：
   - 採用 **KaTeX (CDN)** 方案。
   - 透過 CDN 引入 KaTeX 的 CSS、主 JS 以及 `auto-render` 擴充套件。
   - 在網頁載入完成後自動解析文檔中的 LaTeX 語法：
     - 行內公式（Inline Math）：使用 `$ ... $` 標記。
     - 獨立展示公式（Display Math）：使用 `$$ ... $$` 標記。
4. **主題切換機制**：
   - 透過 `assets/js/theme.js` 實現淺色（Light）與深色（Dark）模式切換。
   - 偏好儲存於瀏覽器的 `localStorage` 中，並能自動偵測使用者的系統偏好（`prefers-color-scheme`）。

---

## 3. 技術限制

- **嚴禁使用任何前端框架或打包工具**：
  - 不可引入或安裝 React, Vue, Svelte, Angular, Next.js, Nuxt 等框架。
  - 不可使用 Node.js / npm 依賴作為執行期前置需求，沒有 `package.json` 編譯流程。
- **相容 GitHub Pages**：
  - 專案必須能直接推送到 GitHub 倉庫的 `gh-pages` 分支或 `main` 分支的根目錄即開即用。
  - **嚴格要求相對路徑**：為了避免在 GitHub Pages 子路徑（如 `https://<user>.github.io/<repo>/`）下發生 404 資源找不到問題，**禁止使用根絕對路徑（如 `/assets/...`）**，一律使用相對路徑（如 `../assets/...` 或 `./assets/...`）。
- **外部資源限制**：
  - 外部依賴僅允許使用穩定、輕量的公共 CDN（如 cdnjs / jsdelivr）引入 KaTeX。

---

## 4. 檔案結構與命名規範

專案目錄結構規範如下：

```text
c:\Users\abc\AI_HW9\
├── AGENTS.md                  # 本專案協作準則與開發規範
├── index.html                 # 講義首頁（課程導言、章節目錄索引、學習指引）
├── chapters/                  # 所有講義章節 HTML 檔案存放目錄
│   ├── ch01-limits.html       # 第 1 章：極限與連續
│   ├── ch02-derivatives.html  # 第 2 章：微分及其應用
│   └── ...                    # 依序新增之章節
└── assets/                    # 共用靜態資源目錄
    ├── css/
    │   └── style.css          # 全站通用樣式（排版、主題變數、卡片樣式、響應式）
    ├── js/
    │   ├── nav.js             # 章節目錄陣列與側邊欄動態渲染核心
    │   └── theme.js           # 淺色/深色主題切換與記憶邏輯
    └── images/                # 講義插圖、示意圖與靜態圖檔
```

### 命名規範
1. **章節檔案命名**：
   - 格式：`ch{兩位數章節編號}-{小寫英文主題}.html`
   - 範例：`ch01-limits.html`, `ch02-derivatives.html`, `ch03-integrals.html`
2. **圖片與靜態資源命名**：
   - 全小寫，單字間以連字號（`-`）分隔，如 `ch01-limit-epsilon-delta.png`。

---

## 5. 新增課程章節的固定格式

每次新增章節時，請複製並使用以下標準 HTML5 範本骨架。  
注意維持相對路徑 `../assets/...` 的正確性。

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>微積分講義 - 第 XX 章：章節主題名稱</title>

  <!-- 全站共用樣式 -->
  <link rel="stylesheet" href="../assets/css/style.css">

  <!-- KaTeX 數學公式支援 (CDN) -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
</head>
<body data-chapter-id="chXX">
  <!-- 頂部功能列（手機選單按鈕、網站標題、深淺色切換） -->
  <header class="site-header">
    <button id="menu-toggle" class="icon-btn" aria-label="切換選單">☰</button>
    <a href="../index.html" class="header-logo">微積分課程講義</a>
    <div class="header-actions">
      <button id="theme-toggle" class="icon-btn" aria-label="切換主題">🌓</button>
    </div>
  </header>

  <div class="layout-container">
    <!-- 側邊欄（由 nav.js 動態渲染章節目錄） -->
    <aside id="sidebar" class="sidebar">
      <div class="sidebar-header">
        <h3>章節目錄</h3>
      </div>
      <nav id="course-nav" class="course-nav">
        <!-- nav.js 會自動注入目錄列表 -->
      </nav>
    </aside>

    <!-- 遮罩層（供手機版點擊收合側邊欄） -->
    <div id="sidebar-overlay" class="sidebar-overlay"></div>

    <!-- 講義主內容區域 -->
    <main class="main-content">
      <article class="lecture-content">
        <header class="chapter-header">
          <div class="chapter-meta">Chapter XX</div>
          <h1 class="chapter-title">章節主題名稱</h1>
          <p class="chapter-lead">此處填寫章節前言或核心學習目標概述。</p>
        </header>

        <!-- 講義小節範例 -->
        <section id="section-1" class="lecture-section">
          <h2>1. 小節標題</h2>
          <p>正文說明文字，可穿插行內公式例如 $f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$。</p>

          <!-- 定義區塊 Definition -->
          <div class="callout callout-def">
            <div class="callout-title">定義 X.X：名稱</div>
            <div class="callout-body">
              定義內容說明...
            </div>
          </div>

          <!-- 定理區塊 Theorem -->
          <div class="callout callout-thm">
            <div class="callout-title">定理 X.X：名稱</div>
            <div class="callout-body">
              定理敘述內容...
            </div>
          </div>

          <!-- 證明區塊 Proof (可摺疊或常駐) -->
          <div class="proof-block">
            <div class="proof-title">證明：</div>
            <div class="proof-body">
              證明步驟推導...
              $$\int_a^b f(x) \, dx = F(b) - F(a)$$
              <div class="proof-end">$\blacksquare$</div>
            </div>
          </div>

          <!-- 範例區塊 Example -->
          <div class="callout callout-example">
            <div class="callout-title">範例 X.X：題目說明</div>
            <div class="callout-body">
              題目與解答步驟...
            </div>
          </div>
        </section>

        <!-- 前後章節導航按鈕 -->
        <nav class="chapter-pagination">
          <a href="#" id="prev-chapter-link" class="page-link prev">← 上一章</a>
          <a href="#" id="next-chapter-link" class="page-link next">下一章 →</a>
        </nav>
      </article>
    </main>
  </div>

  <!-- 邏輯腳本（共用相對路徑） -->
  <script src="../assets/js/theme.js"></script>
  <script src="../assets/js/nav.js"></script>
</body>
</html>
```

---

## 6. 核心原則：只整理使用者提供的資料

> [!IMPORTANT]
> **本原則為本專案不可妥協之最高準則。**

1. **嚴禁臆測與私自撰寫**：
   - AI Agent **絕對不可**自行發揮、擴寫、編造任何使用者未提供的微積分定理、證明、範例題、算式或數值。
   - 所有講義正文內容，必須**100% 忠實根植於使用者所提供的課程筆記、文字、簡報或課堂檔案**。
2. **AI 的任務邊界**：
   - 負責資料清洗、章節架構分層、標題編排。
   - 負責將筆記中的數學運算式轉換為正確、標準的 LaTeX / KaTeX 語法。
   - 負責套用定義（Definition）、定理（Theorem）、範例（Example）、備註（Note）等語意化區塊標籤。
3. **遇到資料缺漏或模糊時的處理規範**：
   - 若使用者提供的筆記中斷、推導跳步或文字辨識不清，AI **不得私自補齊數學證明**。
   - 應在對應 HTML 內以 HTML 註解清楚標記（如 `<!-- 待確認：原稿此處未提供完整證明步驟 -->`），並在對話中直接向使用者詢問確認。

---

## 7. 視覺風格與 UI 規範

- **設計基調**：現代極簡學術風格（Clean & Modern Academic Style）。
- **字型設定**：
  - 正文字型：優先採用系統預設高易讀性無襯線字體族（`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans TC", sans-serif`）。
  - 數學公式：由 KaTeX 專用字型（Computer Modern）精準呈現。
  - 程式碼/等寬：`SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace`。
- **色彩系統（使用 CSS 自訂變數定義）**：
  - **淺色模式**：
    - 背景主色：`#fcfcfd`（柔和白，避免純白過度刺眼）
    - 內容文字：`#1e293b`（高對比深石板灰，確保清晰）
    - 側邊欄背景：`#f8fafc`
    - 主題強調色：`#2563eb`（沉穩學術藍）
  - **深色模式**：
    - 背景主色：`#0f172a`（深藍灰黑）
    - 內容文字：`#e2e8f0`（柔和淺灰）
    - 側邊欄背景：`#1e293b`
    - 主題強調色：`#3b82f6`
  - **專業學術 Callout 卡片設計**：
    - **定義 (Definition)**：左側飾以青藍色邊框 (`#0284c7`)，搭配柔和淺藍背景。
    - **定理 (Theorem)**：左側飾以翡翠綠色邊框 (`#059669`)，凸顯重要理論。
    - **範例 (Example)**：左側飾以暖琥珀色邊框 (`#d97706`)，標記實戰演算。
    - **備註/重點 (Note/Remark)**：左側飾以柔紫色邊框 (`#7c3aed`)。
- **版面配置**：
  - 桌面端：左側固定寬度側邊欄（約 260px~280px），中間主內容最大閱讀寬度（約 800px~880px），確保最佳行長（Line Length）。
  - 行動端：支援 Off-canvas 抽屜式側邊欄，點擊選單按鈕或遮罩流暢收合。

---

## 8. 修改規則與完成檢查清單

### 修改規則
1. **嚴禁更動非委託範圍**：編輯單一章節時，不可隨意修改其他章節，除非是要在 `assets/js/nav.js` 中登記新目錄。
2. **路徑一致性**：無論是在首頁（`index.html`）還是章節（`chapters/chXX.html`），必須檢查內部超連結與資源引用的相對深度（如 `.` vs `..`）。
3. **無損更新**：更新講義內容時，保留所有現存標籤與註解，不得刪減已驗證的內容。

### 章節新增與修改驗收檢查清單 (Done Checklist)
每次新增或修改章節後，必須逐一驗收下列項目：

- [ ] **純靜態驗證**：不透過任何 build 工具，直接以瀏覽器開啟網頁即可完美呈現。
- [ ] **相對路徑檢查**：CSS、JS、圖片與前後章節跳轉連結均使用相對路徑，無任何根絕對路徑（`/` 開頭）。
- [ ] **KaTeX 公式渲染**：
  - [ ] 行內公式 `$ ... $` 均閉合且渲染正確，無跳字或未解析的原始碼。
  - [ ] 獨立行公式 `$$ ... $$` 置中且無語法報錯。
- [ ] **nav.js 登記確認**：新章節已於 `assets/js/nav.js` 的課程陣列中完成登記，側邊欄能正確顯示且能導向該章。
- [ ] **響應式與主題相容性**：
  - [ ] 行動端窄螢幕（手機寬度）下側邊欄展開/收合正常，正文無水平破版滾動條。
  - [ ] 淺色與深色模式下，公式與文字皆具備清晰可讀的對比度。
- [ ] **內容忠實度核對**：內容完全比對使用者提供之資料，無任何自創臆測之公式與證明。
