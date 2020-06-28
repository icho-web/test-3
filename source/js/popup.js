let formButton = document.querySelector('.work__button')
let popup = document.querySelector('.form-popup')
let closeButton = document.querySelector('.message__close')

formButton.addEventListener('click', (evt) => { 
  evt.preventDefault();
  popup.classList.add('form-popup__open')
})

closeButton.addEventListener('click', () => {
  popup.classList.remove('form-popup__open')
})