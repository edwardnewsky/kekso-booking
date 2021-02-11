'use strict';

(() => {
  window.data = {
    TOTAL_ADS: 8,
    PIN_SIZE: {
      WIDTH: 50,
      HEIGHT: 70,
    },
    // Mock
    offerOptions: {
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
      TYPES: ['palace', 'flat', 'house', 'bungalo'],
      CHECKINS: ['12:00', '13:00', '14:00'],
      CHECKOUTS: ['12:00', '13:00', '14:00'],
      FEATURES: [
        'wifi',
        'dishwasher',
        'parking',
        'washer',
        'elevator',
        'conditioner',
      ],
      PHOTOS: [
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
      ],
      GUESTS: {
        MIN: 1,
        MAX: 15,
      },
      ROOMS: {
        MIN: 1,
        MAX: 5,
      },
      PRICE: {
        MIN: 1000,
        MAX: 1000000,
      },
      LOCATION: {
        X: {
          MIN: 300,
          MAX: 900,
        },
        Y: {
          MIN: 130,
          MAX: 630,
        },
      },
    },
    adsArr: [],
    template: document.querySelector('template'),
    map: document.querySelector('.map'),
  };

  // Функция создания объекта
  let createAdObj = (i) => {
    let adObj = {
      author: {
        // На всякий случай, если объявлений больше 10
        avatar: 'img/avatars/user' + (i > 10 ? '' : '0') + (i + 1) + '.png',
      },
      offer: {
        title: data.offerOptions.TITLES[i],
        price: utilites.getRandomFromInterval(
          data.offerOptions.PRICE.MIN,
          data.offerOptions.PRICE.MAX
        ),
        type:
          data.offerOptions.TYPES[
            utilites.getRandomFromInterval(
              0,
              data.offerOptions.TYPES.length - 1
            )
          ],
        rooms: utilites.getRandomFromInterval(
          data.offerOptions.ROOMS.MIN,
          data.offerOptions.ROOMS.MAX
        ),
        guests: utilites.getRandomFromInterval(
          data.offerOptions.GUESTS.MIN,
          data.offerOptions.GUESTS.MAX
        ),
        checkin:
          data.offerOptions.CHECKINS[
            utilites.getRandomFromInterval(
              0,
              data.offerOptions.CHECKINS.length - 1
            )
          ],
        checkout:
          data.offerOptions.CHECKOUTS[
            utilites.getRandomFromInterval(
              0,
              data.offerOptions.CHECKOUTS.length - 1
            )
          ],
        features: utilites.getRandomCutFromArr(
          utilites.getRandomShuffleFromArr(data.offerOptions.FEATURES)
        ),
        description: '',
        photos: utilites.getRandomShuffleFromArr(data.offerOptions.PHOTOS),
      },
      location: {
        x:
          utilites.getRandomFromInterval(
            data.offerOptions.LOCATION.X.MIN,
            data.offerOptions.LOCATION.X.MAX
          ) -
          data.PIN_SIZE.WIDTH / 2,
        y:
          utilites.getRandomFromInterval(
            data.offerOptions.LOCATION.Y.MIN,
            data.offerOptions.LOCATION.Y.MAX
          ) - data.PIN_SIZE.HEIGHT,
      },
    };
    adObj.offer.address = adObj.location.x + ', ' + adObj.location.y;
    return adObj;
  };

  // создаем TOTAL_ADS кол-во объектов по ТЗ в массив adsArr
  for (let i = 0; i < data.TOTAL_ADS; i++) {
    data.adsArr[i] = createAdObj(i);
  }
})();
