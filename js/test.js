// Первое действие, которое нужно выполнить, перед тем, как приступить к этому заданию, вернуть страницу в исходное состояние. В прошлом разделе мы активировали карту, убрав у неё класс .map--faded и вызвали методы отрисовки похожих объявлений и метод отрисовки карточки. Проблема в том, что это не соответствует ТЗ — эти методы должны вызываться только в рамках соответствующих сценариев, поэтому мы уберём их вызовы, а самими методами воспользуемся позже. Пока что оставим в коде методы, созданные в прошлом задании, но саму страницу вернём в исходное состояние.

// У блока .map уберите класс .map--faded.
let showMap = document.querySelector('.map');
//

// 5. Рисуем все пины
// renderPinsMarkup(adsArr);

// Вставляем adTemplate перед блоком .map__filters-container:
// let mapFiltersContainer = map.querySelector('.map__filters-container');
// mapFiltersContainer.insertAdjacentElement('beforebegin', createAd(adsArr[0]));

// Еще нужно не забыть проверить пункт ТЗ, указывающий на то, что поля формы должны быть неактивны в исходном состоянии. В разметке проекта поля активны, поэтому их нужно отключить, т.е. добавить через DOM-операции или самим полям или fieldset которые их содержат, атрибут disabled.

// Создаем фукнцию которая может выключать и включать элементы формы к заполнению
let toggleForms = (boolean /* disabled (true или false) */) => {
  let adForm = document.querySelector('.ad-form');
  let adFormFieldset = adForm.querySelectorAll('fieldset');
  let mapFilters = map.querySelector('.map__filters');
  let mapFiltersFieldset = mapFilters.querySelectorAll('fieldset');
  let mapFiltersSelect = mapFilters.querySelectorAll('select');

  // Делаем цикл который проходит по всем элменетам adFormFieldset внутри adForm
  for (let i = 0; i < adFormFieldset.length; i++) {
    // Выключаем все формы, добавляя disabled
    adFormFieldset[i].disabled = boolean;
  }

  // Делаем цикл который проходит по всем элменетам mapFiltersSelect внутри mapFilters
  for (let i = 0; i < mapFiltersSelect.length; i++) {
    // Выключаем все формы, добавляя disabled
    mapFiltersSelect[i].disabled = boolean;
  }

  // Делаем цикл который проходит по всем элменетам mapFiltersFieldset внутри mapFilters
  for (let i = 0; i < mapFiltersFieldset.length; i++) {
    // Выключаем все формы, добавляя disabled
    mapFiltersFieldset[i].disabled = boolean;

    // Добавляем класс с opacity 0.3 с условием boolean
    if (boolean === true) {
      mapFiltersFieldset[i].classList.add('ad-form--disabled');
    } else {
      // do nothing
    }
  }
};

toggleForms(true);

// -------------- 4.1 --------------

// Определяем главный пин
let mapPinMain = document.querySelector('.map__pin--main');

// Обработчик активации полей и элементов и карты
let siteStatusHandler = () => {
  // Активаруем поля форм
  toggleForms(false);

  // Рисуем пины
  renderPinsMarkup(adsArr);

  // Показываем карту
  showMap.classList.remove('map--faded');
};

// Вешаем обработчки на глаынй пин
mapPinMain.addEventListener('mouseup', siteStatusHandler);
