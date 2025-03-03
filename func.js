// Importa i moduli necessari (assicurati di averli installati o usa lo script CDN)

// func.js
async function getRecordsAppWrite(Id = null, project = '6790f26d002cb405c0af', db = '67b9b2060006cbdb292d', collection = '67b9b23a00059abb3c7d') {
  // Inizializza il client Appwrite usando l'oggetto globale Appwrite (incluso via CDN)
  const client = new Appwrite.Client();
  client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(project);

  const databases = new Appwrite.Databases(client);
  let query = [];
  if (Id) {
    query.push(Appwrite.Query.equal('$id', Id));
  }

  return await databases.listDocuments(db, collection, query);
}

// Rendi la funzione disponibile globalmente
window.getRecordsAppWrite = getRecordsAppWrite;


  await getDocument()  fetch('/header.html')
    .then(resp => resp.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;
    });

  fetch('/footer.html')
    .then(resp => resp.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    });
