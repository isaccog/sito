async function loadLanguage(lang) {
  try {
    const res = await fetch(`/traduzioni/${lang}.json`);
    const translations = await res.json();
    document.querySelectorAll('[codtrad]').forEach(el => {
      const key = el.getAttribute('codtrad');
      if (translations[key]) el.innerHTML = translations[key];
    });
  } catch (err) {
    console.error("Errore caricamento lingua:", err);
  }
}

async function setupPage() {
  // 1. Carica header e footer
  await Promise.all([
    fetch("/header.html").then(r => r.text()).then(html => {
      document.getElementById("header").innerHTML = html;
    }),
    fetch("/footer.html").then(r => r.text()).then(html => {
      document.getElementById("footer").innerHTML = html;
    })
  ]);

  // 2. Dopo che header/footer sono nel DOM:
  const lang = localStorage.getItem("lang") || "it";
  if (lang !== "it") {
    await loadLanguage(lang);
  }

  // 3. Listener lingua (ora che header è caricato)
  const selector = document.getElementById("language-selector");
  if (selector) {
    selector.value = lang;
    selector.addEventListener("change", () => {
      const selected = selector.value;
      localStorage.setItem("lang", selected);
      if (selected === "it") {
        location.reload();
      } else {
        loadLanguage(selected);
        if (typeof loadBlogPosts === "function") loadBlogPosts();
        if (typeof loadArticle === "function") loadArticle();
        if (typeof loadImages === "function") loadImages();
        if (typeof loadQuotes === "function") loadQuotes();
      }
    });
  }
}

// ✅ Avvia quando DOM è pronto
document.addEventListener("DOMContentLoaded", setupPage);
async function getBlogPostById(id) {
  const isLocalhost = ["localhost", "127.0.0.1"].includes(location.hostname);
  const BACKEND = isLocalhost
    ? "http://localhost:8000"
    : "https://backend-sito.onrender.com"; 
  console.log("BACKEND =", BACKEND);
  try {
    const lang = localStorage.getItem("lang") || "it";
    const response = await fetch(`${BACKEND}/blog/${id}?lang=${lang}`);
    if (!response.ok) throw new Error("Articolo non trovato");
    const data = await response.json();
    return { documents: [data] }; // struttura compatibile
  } catch (error) {
    console.error("Errore durante il recupero:", error);
    return { documents: [] };
  }}

// Rendi la funzione disponibile globalmente
window.getBlogPostById = getBlogPostById;
