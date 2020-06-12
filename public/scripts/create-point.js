const states = document.querySelector('[name="uf"]');
const itemsToCollect = document.querySelectorAll('.items-grid li');
const inputItems = document.querySelector('.items-grid input');
const selectedItems = [];

function populateUFs() {
  const ufSelect = document.querySelector('[name="uf"]');
  const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

  fetch(url)
    .then(res => res.json())
    .then(states => {
      for (const state of states)
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
  citySelect.innerHTML = `<option>Selecione a cidade</option>`;
  citySelect.disabled = true;

  fetch(url)
    .then(res => res.json())
    .then(cities => {
      for (const city of cities)
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
    });
  citySelect.disabled = false;
}

function handleSelectedItems(e) {
  const itemId = e.target.dataset.id;
  const itemLi = e.target;
  const alreadySelected = selectedItems.indexOf(itemId);
  const itemFound = alreadySelected !== -1;

  itemLi.classList.toggle('selected');

  if (itemFound) {
    selectedItems.splice(alreadySelected, 1);
    return inputItems.value = selectedItems;
  }
  selectedItems.push(itemId);
  inputItems.value = selectedItems;
}

populateUFs();
states.addEventListener('change', getCities);

for (const item of itemsToCollect)
  item.addEventListener('click', handleSelectedItems);
