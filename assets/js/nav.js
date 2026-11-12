/**
 * 微積分課程講義 - 章節目錄集中管理與動態導航 (nav.js)
 * 負責渲染側邊欄、小節目錄、前後章節跳轉，以及手機選單抽屜邏輯與 KaTeX 自動解析
 */

const COURSE_CHAPTERS = [
  {
    id: "ch01",
    num: "01",
    title: "極限及其性質",
    subTitle: "Limits and Their Properties",
    file: "ch01-limits.html",
    sections: [
      { id: "sec1-2", num: "1.2", title: "函數與其圖形 (Functions & Graphs)" },
      { id: "sec1-3", num: "1.3", title: "反函數與反三角函數 (Inverse Functions)" },
      { id: "sec1-4", num: "1.4", title: "指數與對數函數 (Exp & Log Functions)" },
      { id: "sec1-5", num: "1.5", title: "極限之探討與定義 (Finding Limits & ε-δ)" },
      { id: "sec1-6", num: "1.6", title: "極限的分析計算與性質 (Evaluate Limits)" },
      { id: "sec1-7", num: "1.7", title: "連續性與中間值定理 (Continuity & IVT)" },
      { id: "sec1-8", num: "1.8", title: "無窮極限與漸近線 (Infinite Limits & Asymptotes)" }
    ]
  },
  {
    id: "ch02",
    num: "02",
    title: "微分及其法則",
    subTitle: "Differentiation",
    file: "ch02-derivatives.html",
    sections: [
      { id: "sec2-1", num: "2.1", title: "切線與導數定義 (Derivative & Tangent Line)" },
      { id: "sec2-2", num: "2.2-2.3", title: "微分基本法則 (Differentiation Rules)" },
      { id: "sec2-4", num: "2.4", title: "複合函數連鎖律 (Chain Rule)" },
      { id: "sec2-5", num: "2.5", title: "隱函數微分法 (Implicit Differentiation)" },
      { id: "sec2-6", num: "2.6", title: "反函數與超越函數微分 (Inverse & Transcendental)" },
      { id: "sec2-7", num: "2.7", title: "相關變率 (Related Rates)" }
    ]
  },
  {
    id: "ch03",
    num: "03",
    title: "微分之應用",
    subTitle: "Applications of Differentiation",
    file: "ch03-applications-of-differentiation.html",
    sections: [
      { id: "sec3-1", num: "3.1", title: "極值與臨界點 (Extrema & Critical Numbers)" },
      { id: "sec3-2", num: "3.2", title: "羅爾定理與均值定理 (Rolle's & Mean-Value)" },
      { id: "sec3-3", num: "3.3", title: "函數遞增減與一階導數檢驗 (First Derivative Test)" },
      { id: "sec3-4", num: "3.4", title: "凹凸性、反曲點與二階導數檢驗 (Concavity & 2nd Test)" },
      { id: "sec3-5", num: "3.5", title: "漸近線與繪圖四大步驟 (Asymptotes & Graphing)" },
      { id: "sec3-6", num: "3.6", title: "極值最佳化應用 (Optimization)" },
      { id: "sec3-7", num: "3.7", title: "微分量與線性逼近 (Differentials & Approximation)" }
    ]
  },
  {
    id: "ch04",
    num: "04",
    title: "積分及其法則",
    subTitle: "Integration",
    file: "ch04-integrals.html",
    sections: [
      { id: "sec4-1", num: "4.1", title: "反導函數與不定積分 (Anti-derivatives)" },
      { id: "sec4-2", num: "4.2", title: "面積與黎曼和逼近 (Area & Summation)" },
      { id: "sec4-3", num: "4.3", title: "黎曼和與定積分 (Riemann Sum & Definite Integral)" },
      { id: "sec4-4", num: "4.4", title: "微積分基本定理 (Fundamental Theorem of Calculus)" },
      { id: "sec4-5", num: "4.5", title: "代換積分法 (Integration by Substitution)" },
      { id: "sec4-7", num: "4.7", title: "自然對數積分法與三角積分 (Log Rule & Trig Integrals)" },
      { id: "sec4-8", num: "4.8", title: "反三角函數積分與配方法 (Inverse Trig & Completing Square)" },
      { id: "sec4-9", num: "4.9", title: "雙曲函數與反雙曲函數 (Hyperbolic Functions)" }
    ]
  },
  {
    id: "ch05",
    num: "05",
    title: "積分之應用",
    subTitle: "Applications of Integration",
    file: "ch05-applications-of-integration.html",
    sections: [
      { id: "sec5-1", num: "5.1", title: "兩曲線間的區域面積 (Area Between Two Curves)" },
      { id: "sec5-2", num: "5.2", title: "旋轉體體積：圓盤法與圓環法 (Disk & Washer Method)" },
      { id: "sec5-3", num: "5.3", title: "旋轉體體積：圓柱殼層法 (Shell Method)" },
      { id: "sec5-4", num: "5.4", title: "弧長與旋轉曲面表面積 (Arc Length & Surface Area)" },
      { id: "sec5-5", num: "5.5", title: "物理與工程應用：功、質心、水壓力 (Physics & Engineering)" },
      { id: "sec5-6", num: "5.6", title: "指數成長衰減與牛頓冷卻定律 (Growth, Decay & Cooling)" }
    ]
  },
  {
    id: "ch06",
    num: "06",
    title: "進階積分技巧與瑕積分",
    subTitle: "Integration Techniques and Improper Integrals",
    file: "ch06-integration-techniques.html",
    sections: [
      { id: "sec6-0", num: "6.0", title: "基本積分法則回顧 (Review of Basic Rules)" },
      { id: "sec6-1", num: "6.1", title: "分部積分法 (Integration by Parts)" },
      { id: "sec6-2", num: "6.2", title: "三角積分 (Trigonometric Integrals)" },
      { id: "sec6-3", num: "6.3", title: "三角代換法 (Trigonometric Substitution)" },
      { id: "sec6-4", num: "6.4", title: "部分分式法 (Partial Fractions)" },
      { id: "sec6-5", num: "6.5", title: "積分表與特殊代換 (Integration by Tables & Weierstrass)" },
      { id: "sec6-6", num: "6.6", title: "不定型與羅必達法則 (L'Hôpital's Rule)" },
      { id: "sec6-7", num: "6.7", title: "瑕積分 (Improper Integrals)" }
    ]
  },
  {
    id: "ch07",
    num: "07",
    title: "無窮級數",
    subTitle: "Infinite Series",
    file: "ch07-infinite-series.html",
    sections: [
      { id: "sec7-1", num: "7.1", title: "數列 (Sequences)" },
      { id: "sec7-2", num: "7.2", title: "級數與等比級數 (Series & Geometric Series)" },
      { id: "sec7-3", num: "7.3", title: "積分審斂法、p-級數與比較審斂 (Integral & Comparison Tests)" },
      { id: "sec7-4", num: "7.4", title: "交錯級數、比值與根值審斂法 (Alternating, Ratio & Root Tests)" },
      { id: "sec7-5", num: "7.5", title: "泰勒多項式與餘項估計 (Taylor Polynomials & Remainder)" },
      { id: "sec7-6", num: "7.6", title: "冪級數與收斂區間 (Power Series & Convergence)" },
      { id: "sec7-7", num: "7.7", title: "函數的冪級數展開 (Power Series Representation)" },
      { id: "sec7-8", num: "7.8", title: "泰勒級數與馬克勞林級數 (Taylor & Maclaurin Series)" }
    ]
  }
];

document.addEventListener("DOMContentLoaded", function () {
  const currentChapterId = document.body.getAttribute("data-chapter-id");
  const isInsideChaptersDir = window.location.pathname.includes("/chapters/") || 
                              (!window.location.pathname.endsWith("index.html") && currentChapterId && currentChapterId !== "index");

  // 1. 動態渲染側邊欄目錄 (Sidebar Navigation)
  const navContainer = document.getElementById("course-nav");
  if (navContainer) {
    const ul = document.createElement("ul");

    COURSE_CHAPTERS.forEach((ch, index) => {
      const li = document.createElement("li");
      const isActive = ch.id === currentChapterId;

      // 決定目標連結的相對路徑
      const targetUrl = isInsideChaptersDir ? ch.file : `chapters/${ch.file}`;

      const link = document.createElement("a");
      link.href = targetUrl;
      link.className = `nav-item-link ${isActive ? "active" : ""}`;
      link.innerHTML = `<span>第 ${ch.num} 章</span> <span>${ch.title}</span>`;
      li.appendChild(link);

      // 若為當前章節且包含小節，展開小節導覽 (In-page TOC)
      if (isActive && ch.sections && ch.sections.length > 0) {
        const subUl = document.createElement("ul");
        subUl.className = "sub-nav";

        ch.sections.forEach((sec) => {
          const subLi = document.createElement("li");
          const subLink = document.createElement("a");
          subLink.href = `#${sec.id}`;
          subLink.textContent = `${sec.num} ${sec.title}`;
          // 點擊後若在手機版，自動收合側邊欄
          subLink.addEventListener("click", closeMobileSidebar);
          subLi.appendChild(subLink);
          subUl.appendChild(subLi);
        });

        li.appendChild(subUl);
      }

      ul.appendChild(li);
    });

    navContainer.innerHTML = "";
    navContainer.appendChild(ul);
  }

  // 2. 自動綁定前後章節分頁跳轉 (Chapter Pagination)
  if (currentChapterId && currentChapterId !== "index") {
    const currentIndex = COURSE_CHAPTERS.findIndex((c) => c.id === currentChapterId);
    const prevLink = document.getElementById("prev-chapter-link");
    const nextLink = document.getElementById("next-chapter-link");

    if (prevLink) {
      if (currentIndex > 0) {
        const prevCh = COURSE_CHAPTERS[currentIndex - 1];
        prevLink.href = isInsideChaptersDir ? prevCh.file : `chapters/${prevCh.file}`;
        prevLink.innerHTML = `<span class="link-label">← 上一章</span><span class="link-title">第 ${prevCh.num} 章：${prevCh.title}</span>`;
        prevLink.classList.remove("disabled");
      } else {
        prevLink.href = isInsideChaptersDir ? "../index.html" : "index.html";
        prevLink.innerHTML = `<span class="link-label">← 回首頁</span><span class="link-title">課程講義目錄</span>`;
      }
    }

    if (nextLink) {
      if (currentIndex !== -1 && currentIndex < COURSE_CHAPTERS.length - 1) {
        const nextCh = COURSE_CHAPTERS[currentIndex + 1];
        nextLink.href = isInsideChaptersDir ? nextCh.file : `chapters/${nextCh.file}`;
        nextLink.innerHTML = `<span class="link-label">下一章 →</span><span class="link-title">第 ${nextCh.num} 章：${nextCh.title}</span>`;
        nextLink.classList.remove("disabled");
      } else {
        nextLink.href = "#";
        nextLink.innerHTML = `<span class="link-label">下一章</span><span class="link-title">敬請期待後續章節</span>`;
        nextLink.classList.add("disabled");
      }
    }
  }

  // 3. 手機版抽屜式選單控制 (Off-canvas Drawer)
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");

  function openMobileSidebar() {
    if (sidebar) sidebar.classList.add("open");
    if (overlay) overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMobileSidebar() {
    if (sidebar) sidebar.classList.remove("open");
    if (overlay) overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      if (sidebar && sidebar.classList.contains("open")) {
        closeMobileSidebar();
      } else {
        openMobileSidebar();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener("click", closeMobileSidebar);
  }

  // 4. KaTeX 自動解析數學公式 (Auto-render KaTeX)
  initKaTeXRender();
});

// KaTeX 解析輔助函式
function initKaTeXRender() {
  function tryRender() {
    if (typeof renderMathInElement === "function") {
      renderMathInElement(document.body, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false },
          { left: "\\[", right: "\\]", display: true }
        ],
        throwOnError: false,
        ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"]
      });
    } else {
      // 若 CDN 腳本延遲載入，重試一次
      setTimeout(tryRender, 150);
    }
  }

  tryRender();
}
