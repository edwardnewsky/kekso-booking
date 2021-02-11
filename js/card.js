'use strict';

(() => {
  let popupPhoto = dom.template.content.querySelector('.popup__photo');
  let adTemplate = dom.template.content.querySelector('.map__card');
  let typesMap = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
  };

  // Создаем список features в .popup__features
  let createFeatureFragment = (adDataIndex) => {
    // Создаем фрагмент
    let featureFragment = document.createDocumentFragment();
    // сколько раз
    for (let i = 0; i < adDataIndex.offer.features.length; i++) {
      // Создаем элемент списка (li)
      let featureItem = document.createElement('li');
      // Задаем элементу списка класс
      featureItem.className =
        'popup__feature popup__feature--' + adDataIndex.offer.features[i];
      // Куда вставялем
      featureFragment.appendChild(featureItem);
    }
    return featureFragment;
  };

  // Создаем фотографии в popupPhoto
  let createPhotosFragment = (adDataIndex) => {
    // Создем фрагмент
    let photosFragment = document.createDocumentFragment();
    // Сколько раз
    for (let i = 0; i < adDataIndex.offer.photos.length; i++) {
      // Копируем
      let popupPhotoItem = popupPhoto.cloneNode(true);
      // Что копируем
      popupPhotoItem.src = adDataIndex.offer.photos[i];
      // Куда вставляем
      photosFragment.appendChild(popupPhotoItem);
    }
    return photosFragment;
  };

  // Функция создания 1 попапа из объекта
  window.createAd = (adDataIndex) => {
    // Копируем объявление
    let ad = adTemplate.cloneNode(true);
    // Меняем аватар у объявления
    ad.querySelector('.map__card img').src = adDataIndex.author.avatar;
    // Выведите заголовок объявления offer.title в заголовок .popup__title
    ad.querySelector('.popup__title').textContent = adDataIndex.offer.title;
    // Выведите адрес offer.address в блок .popup__text--address
    ad.querySelector('.popup__text--address').textContent =
      adDataIndex.offer.address;
    // Выведите цену offer.price в блок .popup__text--price строкой
    ad.querySelector('.popup__text--price').textContent =
      adDataIndex.offer.price + ' ₽/ночь';
    // В блок .popup__type выведите тип
    ad.querySelector('.popup__type').textContent =
      typesMap[adDataIndex.offer.type];
    // Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой
    ad.querySelector('.popup__text--capacity').textContent =
      adDataIndex.offer.rooms +
      ' комнаты для ' +
      adDataIndex.offer.guests +
      ' гостей';
    // Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time
    ad.querySelector('.popup__text--time').textContent =
      'Заезд после ' +
      adDataIndex.offer.checkin +
      ', выезд до ' +
      adDataIndex.offer.checkout;
    // Очищаем список .popup__features
    ad.querySelector('.popup__features').innerHTML = '';
    // В список .popup__features выведите все доступные удобства в объявлении
    ad.querySelector('.popup__features').appendChild(
      createFeatureFragment(adDataIndex)
    );
    // В блок .popup__description выведите описание объекта недвижимости offer.description.
    ad.querySelector('.popup__description').textContent =
      adDataIndex.offer.description;
    // Удаляем что было до этого
    ad.querySelector('.popup__photos').removeChild(
      ad.querySelector('.popup__photo')
    );
    // В блок .popup__photos выведите все фотографии из списка offer.photos
    ad.querySelector('.popup__photos').appendChild(
      createPhotosFragment(adDataIndex)
    );

    // Возвращяем собранное
    return ad;
  };
})();
