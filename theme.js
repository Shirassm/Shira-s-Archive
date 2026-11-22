(function () {
  const THEMES = [
    { id: "light", name: "Cloud Light", bg: "#f5f8fd", accent: "#537fda" },
    { id: "dark", name: "Midnight Dark", bg: "#101827", accent: "#8bb3ff" },
    { id: "sepia", name: "Warm Sepia", bg: "#f7f2e7", accent: "#b4692c" },
    { id: "sage", name: "Matcha Sage", bg: "#f2f7f3", accent: "#3b875e" },
    { id: "sakura", name: "Sakura Rose", bg: "#fdf4f6", accent: "#d1567c" },
    { id: "lavender", name: "Lavender Dusk", bg: "#161324", accent: "#b39ddb" }
  ];

  function applyTheme(themeId) {
    document.body.classList.remove("dark");
    if (themeId === "light") {
      document.body.removeAttribute("data-theme");
    } else {
      document.body.setAttribute("data-theme", themeId);
    }
    localStorage.setItem("shira-theme", themeId);

    document.querySelectorAll(".theme-option").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.themeId === themeId);
    });
  }

  // Terapkan tema tersimpan segera saat halaman dimuat
  const savedTheme = localStorage.getItem("shira-theme") || "light";
  applyTheme(savedTheme);

  // Pasang menu pop-up saat tombol #theme-toggle diklik
  const themeBtn = document.getElementById("theme-toggle");
  if (!themeBtn) return;

  themeBtn.innerHTML = '<i data-lucide="palette"></i>';
  themeBtn.setAttribute("title", "Pilih Tema");
  themeBtn.setAttribute("aria-label", "Buka pilihan tema");
  if (window.lucide) lucide.createIcons();

  const popover = document.createElement("div");
  popover.className = "theme-popover";
  popover.innerHTML = `
    <p class="theme-pop-head">Pilih Tema Tampilan</p>
    <div class="theme-grid">
      ${THEMES.map(t => `
        <button type="button" class="theme-option ${t.id === savedTheme ? "active" : ""}" data-theme-id="${t.id}">
          <span class="theme-swatch-wrap">
            <span class="theme-swatch" style="background: linear-gradient(135deg, ${t.bg} 50%, ${t.accent} 50%);"></span>
            <span>${t.name}</span>
          </span>
          <span>${t.id === savedTheme ? "✓" : ""}</span>
        </button>
      `).join("")}
    </div>
  `;
  document.body.appendChild(popover);

  // Override klik tombol tema agar membuka menu pilihan 6 tema
  themeBtn.onclick = (e) => {
    e.stopPropagation();
    popover.classList.toggle("open");
  };

  popover.addEventListener("click", (e) => {
    const opt = e.target.closest(".theme-option");
    if (!opt) return;
    const chosen = opt.dataset.themeId;
    applyTheme(chosen);
    popover.querySelectorAll(".theme-option").forEach(b => {
      b.lastElementChild.textContent = b.dataset.themeId === chosen ? "✓" : "";
    });
    popover.classList.remove("open");
  });

  // Tutup pop-up jika klik di luar area menu
  document.addEventListener("click", (e) => {
    if (!popover.contains(e.target) && e.target !== themeBtn) {
      popover.classList.remove("open");
    }
  });
})();