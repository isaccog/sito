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
