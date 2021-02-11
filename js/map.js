// -------------------- 2  -------------------- Рисуем пины

// Карта
let mapFilters = map.querySelector('.map__filters');
// Куда вставлять фотографии объявлений
let popupPhoto = template.content.querySelector('.popup__photo');
// Опредеяем template объявления
let adTemplate = template.content.querySelector('.map__card');
// Определяем главный пин
let mapPinMain = document.querySelector('.map__pin--main');
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
