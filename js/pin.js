'use strict';

(() => {
  let mapPinTemplate = data.template.content.querySelector('.map__pin');
  let mapPins = data.map.querySelector('.map__pins');

  // Функция создания пина
  let createPinMarkup = (pinData) => {
    let pinItem = mapPinTemplate.cloneNode(true);
    pinItem.querySelector('img').src = pinData.author.avatar;
    pinItem.style.left = pinData.location.x + 'px';
    pinItem.style.top = pinData.location.y + 'px';
    pinItem.querySelector('img').alt = pinData.offer.title;

    // Функция возвращет созданный пин
    return pinItem;
  };

  // Сделать data.TOTAL_ADS.lenght количество пинов
  let renderPinsMarkup = (arrHowMuchPins) => {
    let mapPinsFragment = document.createDocumentFragment();
    for (let i = 0; i < arrHowMuchPins.length; i++) {
      mapPinsFragment.appendChild(createPinMarkup(arrHowMuchPins[i]));
    }
    return mapPins.appendChild(mapPinsFragment);
  };

  // Рисуем все пины
  // renderPinsMarkup(data.adsArr);
})();
