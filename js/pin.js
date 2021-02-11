(() => {
  // -------------------- 2  -------------------- Рисуем пины
  'use strict';
  // DOM-элемент объявления и вставьте полученный DOM-элемент в блок .map
  window.map = document.querySelector('.map');
  // Определяем тег "tempalte", где содержиться заготовка
  window.template = document.querySelector('template');
  // 2. определить куда вставлять pins -- map__pin
  let mapPinTemplate = template.content.querySelector('.map__pin');
  // Определяем куда render пины
  let mapPins = map.querySelector('.map__pins');

  // 3. Сделать функцию создания пина
  let createPinMarkup = (pinData) => {
    // Клонируем элемент
    let pinItem = mapPinTemplate.cloneNode(true);
    // Задаем src для img внутри
    pinItem.querySelector('img').src = pinData.author.avatar;
    // Задаем локации
    pinItem.style.left = pinData.location.x + 'px';
    pinItem.style.top = pinData.location.y + 'px';
    // Задаем заголовок
    pinItem.querySelector('img').alt = pinData.offer.title;

    // Функция возвращяет созданный пин
    return pinItem;
  };
  // 4. Сделать TOTAL_ADS.lenght количество пинов
  window.renderPinsMarkup = (arrHowMuchPins) => {
    // Создаем фрагмент
    let mapPinsFragment = document.createDocumentFragment();
    // Сколько нужно как говориться
    for (let i = 0; i < arrHowMuchPins.length; i++) {
      // Создаем фрагмент => вставляем в конец  => во фрагменте будет пин[i]
      mapPinsFragment.appendChild(createPinMarkup(arrHowMuchPins[i]));
    }
    // Возвращяем (arrHowMuchPins.length) фрагментов в конец секц .map__pins
    return mapPins.appendChild(mapPinsFragment);
  };

  // 5. Рисуем все пины
  // renderPinsMarkup(adsArr);
})();
