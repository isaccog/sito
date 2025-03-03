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

async function getRecordsAppWrite(id = null, project = '6790f26d002cb405c0af', db = '67b9b2060006cbdb292d', collection = '67b9b23a00059abb3c7d') {
  const client = new Appwrite.Client();
  client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(project);

  const databases = new Appwrite.Databases(client);
  let query = [];
  if (id) {
    query.push(Appwrite.Query.equal('$id', id));
  }
  return await databases.listDocuments(db, collection, query);
}

// Rendi la funzione disponibile globalmente
window.getRecordsAppWrite = getRecordsAppWrite;
