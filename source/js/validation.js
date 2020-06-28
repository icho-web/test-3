const nameTest = /([А-ЯЁA-Z][а-яёa-z]+[\-\s]?){3,}/
let validationForm = document.querySelector('.message__form');

validationForm.addEventListener('input', function () {
  let input = document.querySelector('.message__input--name')
  let inputValue = input.value

  if (nameTest.test(inputValue)) {
    input.setCustomValidity('')
  } else {
    input.setCustomValidity('Введите корректные ФИО.')
  }
})