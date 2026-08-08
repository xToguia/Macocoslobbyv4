(function () {
  "use strict";
 
  const SEQUENCE = [
    "onepiecedle",
    "ios",        
    "diep",
    "cuphead",
    "undertale",  
    "asgore",
    "imgupscaler",
  ];
 
  const SECRET_PAGE_URL = "html/dex.html"; 
  const MAX_GAP_MS = 20000;
 
  let progress = 0;
  let lastClickTime = 0;
 
  function normalize(str) {
    return (str || "")
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
      .replace(/[^a-z0-9]/g, "");                        
  }
 
  function getEggKey(btn) {
    const nameEl = btn.querySelector(".btn-name");
    const text = nameEl ? nameEl.textContent : btn.textContent;
    return normalize(text);
  }
 
  document.addEventListener("click", function (event) {
    const btn = event.target.closest(".neon-btn");
    if (!btn) return;
 
    const key = getEggKey(btn);
    if (!SEQUENCE.includes(key)) return; 
 
    const now = Date.now();
    if (now - lastClickTime > MAX_GAP_MS) progress = 0;
    lastClickTime = now;
 
    const expected = SEQUENCE[progress];
 
    if (key === expected) {
      progress++;
      if (progress === SEQUENCE.length) {
        progress = 0;
        window.open(SECRET_PAGE_URL, "_blank", "noopener");
      }
    } else if (key === SEQUENCE[0]) {
      progress = 1; 
    } else {
      progress = 0;
    }
  }, true);
})();
 


