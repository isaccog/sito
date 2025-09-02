// Definizione della funzione getRecordsAppWrite


document.addEventListener('DOMContentLoaded', () => {
  fetch('/header.html')
    .then(resp => resp.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;
    });

  fetch('/footer.html')
    .then(resp => resp.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    });
});

async function getBlogPostById(id) {
  const baseUrl = 'https://backend-sito.onrender.com'; // o il tuo dominio online
  try {
    const response = await fetch(`${baseUrl}/blog/${id}`);
    if (!response.ok) throw new Error("Articolo non trovato");
    const data = await response.json();
    return { documents: [data] }; // struttura compatibile
  } catch (error) {
    console.error("Errore durante il recupero:", error);
    return { documents: [] };
  }}

// Rendi la funzione disponibile globalmente
window.getBlogPostById = getBlogPostById;
