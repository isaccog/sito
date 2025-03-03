// Importa i moduli necessari (assicurati di averli installati o usa lo script CDN)

import { Client, Databases, Query } from 'appwrite';

async function getDocument(Id=Null,project='6790f26d002cb405c0af', db='67b9b2060006cbdb292d', collection='67b9b23a00059abb3c7d')
  {
  // Inizializza il client Appwrite
  const client = new Client();
  client
    .setEndpoint('https://cloud.appwrite.io/v1')  // Sostituisci con il tuo endpoint, se diverso
    .setProject(project);              // Sostituisci con il tuo Project ID

  // Inizializza il servizio Database
  const databases = new Databases(client);
  let query=[]
  if Id
    {
      query.push(Query.equal('$Id',Id))
    }

    return await databases.listDocuments(db, collection, query)  
      
    
  }

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
