'use strict';

// -------------------- 1  -------------------- Создем mock массив

let TOTAL_ADS = 8;
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

let PIN_SIZE = {
  WIDTH: 50,
  HEIGHT: 70,
};

// Создать массив из объектов
let adsArr = [];

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

// Создали 8 объектов по ТЗ в массив adsArr
for (let k = 0; k < TOTAL_ADS; k++) {
  adsArr[k] = createAdObj(k);
}

// -------------------- 3  -------------------- Рисуем пины

// // У блока .map уберите класс .map--faded.
let showMap = document.querySelector('.map');
showMap.classList.remove('map--faded');

// 1. нужно определить блок template
// Определяем тег "tempalte", где содержиться заготовка
let template = document.querySelector('template');

// 2. определить куда вставлять pins -- map__pin
let mapPinTemplate = template.content.querySelector('.map__pin');

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

// DOM-элемент объявления и вставьте полученный DOM-элемент в блок .map
let map = document.querySelector('.map');
// Определяем куда render пины
let mapPins = map.querySelector('.map__pins');

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

// Опредеяем template объявления
let adTemplate = template.content.querySelector('.map__card');

// Список для замены
let typesMap = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало',
};

// Создаем список в .popup__features
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

let popupPhoto = template.content.querySelector('.popup__photo');

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
