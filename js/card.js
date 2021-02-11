(() => {
  'use strict';

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
    ad.querySelector('.popup__text--address').textContent =
      adData.offer.address;
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
    ad.querySelector('.popup__photos').appendChild(
      createPhotosFragment(adData)
    );

    // Возвращяем собранное
    return ad;
  };
})();
