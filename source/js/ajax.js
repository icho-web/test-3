let form = document.querySelector('.message__form')
let success = document.querySelector('.success')
let request = new XMLHttpRequest();
let url = 'json/server.json';

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  var formData = new FormData(form);
  request.open("GET", url, true);
  request.send(formData);

  request.onload = () => {
    popup.classList.remove('form-popup__open')
    success.style.display = 'flex'

    setTimeout("success.style.display = 'none'", '2000')
  }
})