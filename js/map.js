'use strict';

// Template
/*
let ex = {
  author: {
    avatar: 123,
  },

  offer: {
    title: 123,
    address: 123,
    price: 123,
    type: 123,
    rooms: 123,
    guests: 123,
    checkin: 123,
    checkout: 123,
    features: 123,
    description: 123,
    photos: 123,
  },

  location: {
    x: 123,
    y: 123,
  },
};
*/

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

let createAdObj = function (i) {
  let adObj = {
    author: {
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
  adObj.offer.adress = adObj.location.x + ', ' + adObj.location.y;

  return adObj;
};

// Создали 8 объектов по тз в массив adsArr
for (let k = 0; k < TOTAL_ADS; k++) {
  adsArr[k] = createAdObj(k);
}
