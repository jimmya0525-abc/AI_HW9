/**
 * 微積分課程講義 - 深淺色主題管理 (theme.js)
 * 支援手動切換、系統偏好自動偵測與 localStorage 記憶
 */

(function () {
  const THEME_KEY = "calculus_lecture_theme";

  // 1. 取得儲存的主題或系統偏好
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    // 預設偵測系統外觀模式
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  // 2. 套用主題至 <html> 標籤
  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    updateToggleButton(theme);
  }

  // 3. 更新按鈕圖示與 aria 提示
  function updateToggleButton(theme) {
    const toggleBtn = document.getElementById("theme-toggle");
    if (!toggleBtn) return;
    if (theme === "dark") {
      toggleBtn.innerHTML = "☀️";
      toggleBtn.setAttribute("aria-label", "切換為淺色模式");
      toggleBtn.setAttribute("title", "切換為淺色模式");
    } else {
      toggleBtn.innerHTML = "🌙";
      toggleBtn.setAttribute("aria-label", "切換為深色模式");
      toggleBtn.setAttribute("title", "切換為深色模式");
    }
  }

  // 4. 切換主題
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, nextTheme);
    applyTheme(nextTheme);
  }

  // 立即套用（避免畫面閃爍）
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  // DOM 載入後綁定按鈕事件
  document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("theme-toggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", toggleTheme);
      updateToggleButton(getPreferredTheme());
    }

    // 監聽作業系統深淺色變更（若使用者未手動設定過）
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem(THEME_KEY)) {
          applyTheme(e.matches ? "dark" : "light");
        }
      });
    }
  });
})();
