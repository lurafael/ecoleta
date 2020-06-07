function populateUFs() {
  const ufSelect = document.querySelector('[name="uf"]');
  const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

  fetch(url)
    .then(res => res.json())
    .then(states => {
      for(const state of states)
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
    });
}

function getCities(e) {
  const citySelect = document.querySelector('[name="city"]');
  const stateInput = document.querySelector('[name="state"]');
  const ufValue = e.target.value;
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
  const indexOfSelectedState = e.target.selectedIndex;

  stateInput.value = e.target[indexOfSelectedState].textContent;

  fetch(url)
    .then(res => res.json())
    .then(cities => {
      for(const city of cities)
        citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
    });
  citySelect.disabled = false
}

populateUFs();

document
  .querySelector('[name="uf"]')
  .addEventListener('change', getCities)
