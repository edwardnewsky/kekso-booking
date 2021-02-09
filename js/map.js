'use strict';

// -------------------- 1  -------------------- Создем mock массив

// Сколько всего объявлений
let TOTAL_ADS = 8;
// Mock объекта
let offerOptions = {
  // строка, заголовок предложения, одно из фиксированных значений. Значения не должны повторяться.
  TITLES: [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде',
  ],
  // строка с одним из четырёх фиксированных значений:
  TYPES: ['palace', 'flat', 'house', 'bungalo'],
  // строка с одним из трёх фиксированных значений:
  CHECKINS: ['12:00', '13:00', '14:00'],
  // строка с одним из трёх фиксированных значений:
  CHECKOUTS: ['12:00', '13:00', '14:00'],
  // массив строк случайной длины из ниже предложенных:
  FEATURES: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ],
  // массив из строк расположенных в произвольном порядке
  PHOTOS: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  ],
  // число, случайное количество гостей, которое можно разместить
  GUESTS: {
    MIN: 1,
    MAX: 15,
  },
  // число, случайное количество комнат от 1 до 5
  ROOMS: {
    MIN: 1,
    MAX: 5,
  },
  // число, случайная цена от 1000 до 1 000 000
  PRICE: {
    MIN: 1000,
    MAX: 1000000,
  },
  LOCATION: {
    // случайное число, координата x метки на карте.
    X: {
      MIN: 300,
      MAX: 900,
    },
    // случайное число, координата x метки на карте от 130 до 630.
    Y: {
      MIN: 130,
      MAX: 630,
    },
  },
};
// Задаем размер пина
let PIN_SIZE = {
  WIDTH: 50,
  HEIGHT: 70,
};
// Список для замены
let typesMap = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало',
};
var DRAG_LIMIT = {
  X: {
    MIN: 0,
    MAX: 1200,
  },
  Y: {
    MIN: 130,
    MAX: 630,
  },
};
// Создать массив из объектов
let adsArr = [];
// Определяем тег "tempalte", где содержиться заготовка
let template = document.querySelector('template');
// 2. определить куда вставлять pins -- map__pin
let mapPinTemplate = template.content.querySelector('.map__pin');
// DOM-элемент объявления и вставьте полученный DOM-элемент в блок .map
let map = document.querySelector('.map');
// Определяем куда render пины
let mapPins = map.querySelector('.map__pins');
// Куда вставлять фотографии объявлений
let popupPhoto = template.content.querySelector('.popup__photo');
// Опредеяем template объявления
let adTemplate = template.content.querySelector('.map__card');
// Определяем главный пин
let mapPinMain = document.querySelector('.map__pin--main');
// Карта
let mapFilters = map.querySelector('.map__filters');
// Поля для заполнения на карте
let mapFiltersFieldset = mapFilters.querySelectorAll('fieldset');
// Поля для выбора на карте
let mapFiltersSelect = mapFilters.querySelectorAll('select');
// Поле формы "Ваше объявление"
let adForm = document.querySelector('.ad-form');
// Поля для заполнения в форме "Ваше объявление"
let adFormFieldset = adForm.querySelectorAll('fieldset');
// Поля формы "Ваше объявление"
let adFormInputAddress = adForm.querySelector('#address');
// Кнопка отправить на форме Объявление
let adFormSubmit = adForm.querySelector('.ad-form__submit');
// Определеляем модальное окно успеха
let successModal = document.querySelector('.success');
// Проверка активна ли форма (по умолчанию false)
let isActive;

// одно из фиксированных значений
let getRandomFromInterval = function (min, max) {
  // Функция возвращяет рандомное число от min до max значений
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// массив строк случайной длины
let getRandomCutFromArr = function (arr) {
  // Делаем рандомное число и записываем его в отдельную переменную
  let lengthArr = getRandomFromInterval(1, arr.length);

  return arr.slice(0, lengthArr);
};

// массив из строк расположенных в произвольном порядке
let getRandomShuffleFromArr = function (arr) {
  // Копируем массив
  let copyArr = arr.slice(0);
  // Here's a JavaScript implementation of the Durstenfeld shuffle
  for (var i = copyArr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = copyArr[i];
    copyArr[i] = copyArr[j];
    copyArr[j] = temp;
  }
  return copyArr;
};

// Создаем объект согласно ТЗ
let createAdObj = function (i) {
  let adObj = {
    author: {
      // На всякий случай, если объявлений больше 10
      avatar: 'img/avatars/user' + (i > 10 ? '' : '0') + (i + 1) + '.png',
    },
    offer: {
      title: offerOptions.TITLES[i],
      price: getRandomFromInterval(
        offerOptions.PRICE.MIN,
        offerOptions.PRICE.MAX
      ),
      type:
        offerOptions.TYPES[
          getRandomFromInterval(0, offerOptions.TYPES.length - 1)
        ],
      rooms: getRandomFromInterval(
        offerOptions.ROOMS.MIN,
        offerOptions.ROOMS.MAX
      ),
      guests: getRandomFromInterval(
        offerOptions.GUESTS.MIN,
        offerOptions.GUESTS.MAX
      ),
      checkin:
        offerOptions.CHECKINS[
          getRandomFromInterval(0, offerOptions.CHECKINS.length - 1)
        ],
      checkout:
        offerOptions.CHECKOUTS[
          getRandomFromInterval(0, offerOptions.CHECKOUTS.length - 1)
        ],
      features: getRandomCutFromArr(
        getRandomShuffleFromArr(offerOptions.FEATURES)
      ),
      description: '',
      photos: getRandomShuffleFromArr(offerOptions.PHOTOS),
    },
    location: {
      x:
        getRandomFromInterval(
          offerOptions.LOCATION.X.MIN,
          offerOptions.LOCATION.X.MAX
        ) -
        PIN_SIZE.WIDTH / 2,
      y:
        getRandomFromInterval(
          offerOptions.LOCATION.Y.MIN,
          offerOptions.LOCATION.Y.MAX
        ) - PIN_SIZE.HEIGHT,
    },
  };
  adObj.offer.address = adObj.location.x + ', ' + adObj.location.y;

  return adObj;
};

// создаем TOTAL_ADS кол-во объектов по ТЗ в массив adsArr
for (let k = 0; k < TOTAL_ADS; k++) {
  adsArr[k] = createAdObj(k);
}

// -------------------- 3  -------------------- Рисуем пины

// // У блока .map уберите класс .map--faded.
// let map = document.querySelector('.map');
// map.classList.remove('map--faded');

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
let renderPinsMarkup = (arrHowMuchPins) => {
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

// -------------------- 3  -------------------- Попап описание к пинам

// Создаем список features в .popup__features
let createFeatureFragment = (adData) => {
  // Создаем фрагмент
  let featureFragment = document.createDocumentFragment();
  // сколько раз
  for (let i = 0; i < adData.offer.features.length; i++) {
    // Создаем элемент списка (li)
    let featureItem = document.createElement('li');
    // Задаем элементу списка класс
    featureItem.className =
      'popup__feature popup__feature--' + adData.offer.features[i];
    // Куда вставялем
    featureFragment.appendChild(featureItem);
  }
  return featureFragment;
};

// Создаем фотографии в popupPhoto
let createPhotosFragment = (adData) => {
  // Создем фрагмент
  let photosFragment = document.createDocumentFragment();
  // Сколько раз
  for (let i = 0; i < adData.offer.photos.length; i++) {
    // Копируем
    let popupPhotoItem = popupPhoto.cloneNode(true);
    // Что копируем
    popupPhotoItem.src = adData.offer.photos[i];
    // Куда вставляем
    photosFragment.appendChild(popupPhotoItem);
  }
  return photosFragment;
};

// 3. Сделать функцию создания объекта объявления -- попапа
let createAd = (adData) => {
  // Копируем объявление
  let ad = adTemplate.cloneNode(true);
  // Меняем аватар у объявления
  ad.querySelector('.map__card img').src = adData.author.avatar;
  // Выведите заголовок объявления offer.title в заголовок .popup__title
  ad.querySelector('.popup__title').textContent = adData.offer.title;
  // Выведите адрес offer.address в блок .popup__text--address
  ad.querySelector('.popup__text--address').textContent = adData.offer.address;
  // Выведите цену offer.price в блок .popup__text--price строкой
  ad.querySelector('.popup__text--price').textContent =
    adData.offer.price + ' ₽/ночь';
  // В блок .popup__type выведите тип
  ad.querySelector('.popup__type').textContent = typesMap[adData.offer.type];
  // Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой
  ad.querySelector('.popup__text--capacity').textContent =
    adData.offer.rooms + ' комнаты для ' + adData.offer.guests + ' гостей';
  // Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time
  ad.querySelector('.popup__text--time').textContent =
    'Заезд после ' +
    adData.offer.checkin +
    ', выезд до ' +
    adData.offer.checkout;
  // Очищаем список .popup__features
  ad.querySelector('.popup__features').innerHTML = '';
  // В список .popup__features выведите все доступные удобства в объявлении
  ad.querySelector('.popup__features').appendChild(
    createFeatureFragment(adData)
  );
  // В блок .popup__description выведите описание объекта недвижимости offer.description.
  ad.querySelector('.popup__description').textContent =
    adData.offer.description;
  // Удаляем что было до этого
  ad.querySelector('.popup__photos').removeChild(
    ad.querySelector('.popup__photo')
  );
  // В блок .popup__photos выведите все фотографии из списка offer.photos
  ad.querySelector('.popup__photos').appendChild(createPhotosFragment(adData));

  // Возвращяем собранное
  return ad;
};

// Вставляем adTemplate перед блоком .map__filters-container:
// let mapFiltersContainer = map.querySelector('.map__filters-container');
// mapFiltersContainer.insertAdjacentElement('beforebegin', createAd(adsArr[0]));

// -------------------- 4  -------------------- Делаем карту активной

// Первое действие, которое нужно выполнить, перед тем, как приступить к этому заданию, вернуть страницу в исходное состояние. В прошлом разделе мы активировали карту, убрав у неё класс .map--faded и вызвали методы отрисовки похожих объявлений и метод отрисовки карточки. Проблема в том, что это не соответствует ТЗ — эти методы должны вызываться только в рамках соответствующих сценариев, поэтому мы уберём их вызовы, а самими методами воспользуемся позже. Пока что оставим в коде методы, созданные в прошлом задании, но саму страницу вернём в исходное состояние.

// Функция показа карты
let showMap = () => {
  map.classList.remove('map--faded');
};

let blockMap = () => {
  map.classList.add('map--faded');
};

let getMapPinMainCoords = () => {
  let mapPinMainPosition = {
    x: mapPinMain.offsetLeft + Math.floor(mapPinMain.offsetWidth / 2),
    y: mapPinMain.offsetTop + mapPinMain.offsetHeight,
  };
  return mapPinMainPosition;
};

// Функция вывода локации метки в поле адресс
let fillAdressInput = () => {
  // Узнаем координаты главной метки
  let mapPinMainPosition = getMapPinMainCoords();
  adFormInputAddress.value = mapPinMainPosition.x + ', ' + mapPinMainPosition.y;
};

// 5. Рисуем все пины
// renderPinsMarkup(adsArr);

// Вставляем adTemplate перед блоком .map__filters-container:
// let mapFiltersContainer = map.querySelector('.map__filters-container');
// mapFiltersContainer.insertAdjacentElement('beforebegin', createAd(adsArr[0]));

// Еще нужно не забыть проверить пункт ТЗ, указывающий на то, что поля формы должны быть неактивны в исходном состоянии. В разметке проекта поля активны, поэтому их нужно отключить, т.е. добавить через DOM-операции или самим полям или fieldset которые их содержат, атрибут disabled.

// Создаем фукнцию которая может выключать и включать элементы формы к заполнению
let makeFromActive = (boolean /* disabled (true или false) */) => {
  // Если активно то форма добавления объявления => opacity: 0
  if (boolean === true) {
    adForm.classList.remove('ad-form--disabled');
  } else {
    adForm.classList.add('ad-form--disabled');
  }

  // Делаем цикл который проходит по всем элменетам adFormFieldset внутри adForm
  for (let i = 0; i < adFormFieldset.length; i++) {
    // Выключаем или включаем все поля, добавляя disabled
    adFormFieldset[i].disabled = !boolean;
  }

  // Делаем цикл который проходит по всем элменетам mapFiltersSelect внутри mapFilters
  for (let i = 0; i < mapFiltersSelect.length; i++) {
    // Выключаем или включаем все выборы, добавляя disabled
    mapFiltersSelect[i].disabled = !boolean;
  }

  // Делаем цикл который проходит по всем элменетам mapFiltersFieldset внутри mapFilters
  for (let i = 0; i < mapFiltersFieldset.length; i++) {
    // Выключаем или включаем все поля, добавляя disabled
    mapFiltersFieldset[i].disabled = !boolean;

    // Добавляем или убираем класс с opacity 0.3
    if (boolean === true) {
      mapFiltersFieldset[i].classList.remove('ad-form--disabled');
    } else {
      mapFiltersFieldset[i].classList.add('ad-form--disabled');
    }
  }

  // При активации добавляем адрес текущей метки в поле "АДРЕС"
  boolean ? fillAdressInput() : (adFormInputAddress.value = '');

  // Перезаписываем значение переменной isActive
  isActive = boolean;
};

// По умолчанию делаем форму не активной
makeFromActive(false);

// -------------- 4.1 -------------- Обработчики на главный пин

// Обработчик активации полей и элементов и карты
let siteStatusHandler = () => {
  // Если форма не активна, то активируем
  if (isActive === false) {
    // Активируем формы
    makeFromActive(true);
    // Показываем карту
    showMap();
    // Рисуем пины
    renderPinsMarkup(adsArr);
  }
};

// Вешаем обработчик на главный пин
mapPinMain.addEventListener('mouseup', siteStatusHandler);

// -------------- 4.2 -------------- Оработчик передвижения Главного пина

mapPinMain.addEventListener('mousedown', (evt) => {
  // Отмена по умолчанию
  evt.preventDefault();
  // Запомнили начальные координаты
  let startCoords = {
    x: evt.clientX,
    y: evt.clientY,
  };
  console.log(
    `НАЖАТИЕ -- Кордината в которой стоит пин: x = ${startCoords.x}px, y = ${startCoords.y}px`
  );

  let onMouseMoveMainPin = (moveEvt) => {
    moveEvt.preventDefault();
    // Определяем насколько изменилось положение относительно начальной точки
    let shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY,
    };

    // ЧТО ЭТО
    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY,
    };

    // Определяем насколько должно измениться положения главного пина
    let mapPinMainPosition = {
      x: mapPinMain.offsetLeft - shift.x,
      y: mapPinMain.offsetTop - shift.y,
    };

    // Задаем возможность перемещения в формат рамки (границ)
    let LIMIT = {
      TOP: DRAG_LIMIT.Y.MIN - mapPinMain.offsetHeight,
      BOTTOM: DRAG_LIMIT.Y.MAX,
      LEFT: DRAG_LIMIT.X.MIN,
      RIGHT: DRAG_LIMIT.X.MAX - mapPinMain.offsetWidth,
    };
    // Условие если позиция Главного пина по горизонтали меньше Левого и Правого ЛИМИТА, изменить положение (стиль) главного пина, относительно левого края
    if (
      mapPinMainPosition.x >= LIMIT.LEFT &&
      mapPinMainPosition.x <= LIMIT.RIGHT
    ) {
      mapPinMain.style.left = mapPinMainPosition.x + 'px';
    }
    // Условие если позиция Главного пина по вертикали меньше Верхнего и Нижнего ЛИМИТА, изменить положение (стиль) главного пина, относительно верха
    if (
      mapPinMainPosition.y >= LIMIT.TOP &&
      mapPinMainPosition.y <= LIMIT.BOTTOM
    ) {
      mapPinMain.style.top = mapPinMainPosition.y + 'px';
    }

    fillAdressInput();

    console.log(
      `ДВИЖЕНИЕ -- Перемещается на ${mapPinMain.style.top} и ${mapPinMain.style.left}`
    );
  };

  let onMouseUpMainPin = (upEvt) => {
    upEvt.preventDefault();

    // Исправил баг -- Вот здесь нужно было вешать не на кнопку а на документ
    document.removeEventListener('mousemove', onMouseMoveMainPin);
    document.removeEventListener('mouseup', onMouseUpMainPin);

    console.log(
      `ОТПУСТИЛИ -- Обработчики удалены -- Кордината в которой стоит пин: x = ${startCoords.x}px, y = ${startCoords.y}px`
    );
  };

  // При нажатии мышки Добавляем обработчк перемещения мышки
  document.addEventListener('mousemove', onMouseMoveMainPin);
  // При отпускании мышки Удаляем обработчки перемещения и this
  document.addEventListener('mouseup', onMouseUpMainPin);
});

// -------------- 4.3 -------------- Оработчик правильности заполненя и отправки формы

// Обработчик показа модального окна "успех"
let showSuccessHandler = (evt) => {
  // Отменяем действие по умолчанию (переход на другую страницу, отправка...)
  evt.preventDefault();
  // Показываем окно, удаляя класс hidden
  successModal.classList.remove('hidden');
  // Отключаем форму
  makeFromActive(false);
  // Добавляем обработчик закрытия мобального окна по клику
  successModal.addEventListener('click', hideSuccessHandler);
  successModal.addEventListener('keypress', hideSuccessHandler);
};

// Обработчик скрытия модального окна "успех"
let hideSuccessHandler = (evt) => {
  // Отменяем действие по умолчанию
  evt.preventDefault();
  // Закрываем по кнопке ESC
  if (evt.keyCode === 27) {
    successModal.classList.add('hidden');
  }
  // Скрываем окно, добавляем класс hidden
  successModal.classList.add('hidden');
  // Удаляем обработчик закрытия окна
  successModal.removeEventListener('click', hideSuccessHandler);
  successModal.removeEventListener('keypress', hideSuccessHandler);
};

// Вешаем обработчик открытия и закрытия модального окна "успех"
adForm.addEventListener('submit', showSuccessHandler);

// ---------------------------------------------------------

// INPUTS
let adFormTitleInput = adForm.querySelector('#title');
let adFormAddressInput = adForm.querySelector('#address');
let adFormPriceInput = adForm.querySelector('#price');

// Статус кнопки активная / не активная
let statusAdFormSubmit = (boolean) => {
  if (boolean === false) {
    adFormSubmit.disabled = true;
    adFormSubmit.classList.add('ad-form--disabled');
  } else {
    adFormSubmit.disabled = null;
    adFormSubmit.classList.remove('ad-form--disabled');
  }
};

// По умолчанию кнока не активна
// statusAdFormSubmit(false);

let adFormCheckValidity = () => {
  // let adFormInputs = adForm.querySelectorAll('input');
  // console.log(adFormInputs);

  let inputCheckValidity = (keypressEvt) => {
    console.log('keypress');
    if (keypressEvt.target.validity.tooShort) {
      keypressEvt.target.setCustomValidity('Слишком коротко');
      keypressEvt.target.style.borderColor = 'red';
      keypressEvt.target.style.boxShadow = '0 0 2px 2px red';
    } else if (keypressEvt.target.validity.valueMissing) {
      keypressEvt.target.setCustomValidity('Заполните это поле');
      keypressEvt.target.style.borderColor = 'red';
      keypressEvt.target.style.boxShadow = '0 0 2px 2px red';
    } else {
      keypressEvt.target.setCustomValidity('');
      keypressEvt.target.style.borderColor = '#529955';
      keypressEvt.target.style.boxShadow = '0 0 2px 2px #529955';
    }
  };

  let inputBlur = (blurEvt) => {
    console.log('blur');
    blurEvt.target.style.boxShadow = 'none';
  };

  console.log(adForm);

  adForm
    .querySelectorAll('input')
    .forEach((input) => input.addEventListener('keypress', inputCheckValidity));

  adForm
    .querySelectorAll('input')
    .forEach((input) => input.addEventListener('blur', inputBlur));

  // adFormTitleInput.addEventListener('keypress', inputCheckValidity);
  // adFormTitleInput.addEventListener('blur', inputBlur);

  // adFormAddressInput.addEventListener('keypress', inputCheckValidity);
  // adFormAddressInput.addEventListener('blur', inputBlur);

  // adFormPriceInput.addEventListener('keypress', inputCheckValidity);
  // adFormPriceInput.addEventListener('blur', inputBlur);

  // let makeFormColor
  // if (adFormTitleInput.validity.tooShort) {
  //   adFormTitleInput.setCustomValidity('Название объявления слишком короткое');
  //   console.log(1);
  // } else if (adFormTitleInput.validity.tooLong) {
  //   adFormTitleInput.setCustomValidity('Название объявления слишком длинное');
  //   console.log(2);
  // } else if (adFormTitleInput.validity.valueMissing) {
  //   adFormTitleInput.setCustomValidity('Введите название объявления');
  //   console.log(3);
  // } else if (adFormTitleInput.validity.valid) {
  //   console.log('valid');
  // } else {
  //   adFormTitleInput.setCustomValidity('');
  //   console.log(4);
  //   adFormTitleInput.style.borderColor = '#529955';
  // }
};

adFormCheckValidity();
