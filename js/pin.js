'use strict';

(() => {
  let mapPinTemplate = dom.template.content.querySelector('.map__pin');
  let mapPins = dom.map.querySelector('.map__pins');

  // Функция создания пина
  let createPinMarkup = (pinData) => {
    let pinItem = mapPinTemplate.cloneNode(true);
    pinItem.querySelector('img').src = pinData.author.avatar;
    pinItem.style.left = pinData.location.x + 'px';
    pinItem.style.top = pinData.location.y + 'px';
    pinItem.querySelector('img').alt = pinData.offer.title;
    pinItem.className = 'map__pin map__pin--created';

    // Функция возвращет созданный пин
    return pinItem;
  };

  // Сделать data.TOTAL_ADS.lenght количество пинов
  window.renderPinsMarkup = (arrHowMuchPins) => {
    let mapPinsFragment = document.createDocumentFragment();
    for (let i = 0; i < arrHowMuchPins.length; i++) {
      mapPinsFragment.appendChild(createPinMarkup(arrHowMuchPins[i]));
    }
    return mapPins.appendChild(mapPinsFragment);
  };
})();
