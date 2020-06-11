const pageHome = document.querySelector('#page-home');
const searchButton = document.querySelector('#page-home main a');
const modal = document.querySelector('#modal');
const closeModal = document.querySelector('#modal .header a');

searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.remove('hide');
});

closeModal.addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.add('hide');
});
