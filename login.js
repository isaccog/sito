// func.js

// Carica dinamicamente la SDK di Appwrite se non è già presente
function loadAppwriteSDK(callback) {
    if (typeof Appwrite !== "undefined") {
      callback();
      return;
    }
    var script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/appwrite";
    script.onload = callback;
    document.head.appendChild(script);
  }
  
  // Avvia l'app una volta caricata la SDK
  loadAppwriteSDK(initApp);
  
  function initApp() {
    // Inizializza il client di Appwrite
    const client = new Appwrite.Client();
    client
      .setEndpoint('https://cloud.appwrite.io/v1')  // Sostituisci con il tuo endpoint (se self-hosted, usa il tuo dominio)
      .setProject('67c5bd75000f3f53e77c');              
    
    const account = new Appwrite.Account(client);
  
    // Assicuriamoci che il DOM sia pronto
    if (document.readyState !== "loading") {
      setupForms(account);
    } else {
      document.addEventListener("DOMContentLoaded", () => setupForms(account));
    }
  }
  
  function setupForms(account) {
    // Elementi per il cambio tra login e registrazione
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const showRegister = document.getElementById("showRegister");
    const showLogin = document.getElementById("showLogin");
  
    showRegister.addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.style.display = "none";
      registerForm.style.display = "block";
    });
  
    showLogin.addEventListener("click", (e) => {
      e.preventDefault();
      registerForm.style.display = "none";
      loginForm.style.display = "block";
    });
  
    // Gestione del form di registrazione
    const formRegister = document.getElementById("formRegister");
    formRegister.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("registerName").value;
      const email = document.getElementById("registerEmail").value;
      const password = document.getElementById("registerPassword").value;
      
      // Chiamata a account.create per registrare l'utente
      account.create('unique()', email, password, name)
        .then(response => {
          console.log("Registrazione avvenuta:", response);
          alert("Registrazione effettuata. Ora effettua il login.");
          // Mostra la schermata di login
          registerForm.style.display = "none";
          loginForm.style.display = "block";
        })
        .catch(error => {
          console.error("Errore registrazione:", error);
          alert("Errore durante la registrazione: " + error.message);
        });
    });
  
    // Gestione del form di login
    const formLogin = document.getElementById("formLogin");
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      
      // Chiamata a account.createEmailSession per effettuare il login
      account.createEmailSession(email, password)
        .then(response => {
          console.log("Login effettuato:", response);
          alert("Login effettuato (stub).");
          // Qui puoi gestire il reindirizzamento dopo il login
        })
        .catch(error => {
          console.error("Errore login:", error);
          alert("Errore durante il login: " + error.message);
        });
    });
  }