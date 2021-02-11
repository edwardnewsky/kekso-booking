'use strict';

(() => {
  // Карта
  let mapFilters = dom.map.querySelector('.map__filters');
  // Определяем главный пин
  let mapPinMain = document.querySelector('.map__pin--main');
  // Поля для заполнения на карте
  let mapFiltersFieldset = mapFilters.querySelectorAll('fieldset');
  // Поля для выбора на карте
  let mapFiltersSelect = mapFilters.querySelectorAll('select');
  // Контейнер куда рендерить карточки
  let mapFiltersContainer = dom.map.querySelector('.map__filters-container');

  // ФОРМА
  let adFormFieldset = dom.adForm.querySelectorAll('fieldset');
  let adFormInputAddress = dom.adForm.querySelector('#address');
  // ФОРМА

  let DRAG_LIMIT = {
    X: {
      MIN: 0,
      MAX: 1200,
    },
    Y: {
      MIN: 130,
      MAX: 630,
    },
  };

  // Функция показа карты
  let showMap = () => {
    dom.map.classList.remove('map--faded');
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
    adFormInputAddress.value =
      mapPinMainPosition.x + ', ' + mapPinMainPosition.y;
  };

  // Создаем фукнцию которая может выключать и включать элементы формы к заполнению
  window.makeFromActive = (boolean /* disabled (true или false) */) => {
    // Если активно то форма добавления объявления => opacity: 0
    if (boolean === true) {
      dom.adForm.classList.remove('ad-form--disabled');
    } else {
      dom.adForm.classList.add('ad-form--disabled');
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
    flags.isActive = boolean;
  };

  // По умолчанию делаем форму не активной
  makeFromActive(false);

  // -------------- 4.1 -------------- Обработчики на главный пин

  let renderCard = (adsArrIndex) => {
    // Вставляем adTemplate перед блоком .map__filters-container:
    mapFiltersContainer.insertAdjacentElement(
      'beforebegin',
      window.createAd(adsArrIndex)
    );
  };

  // Обработчик активации полей и элементов и карты
  let siteStatusHandler = () => {
    // Если форма не активна, то активируем
    if (flags.isActive === false) {
      // Активируем формы
      makeFromActive(true);
      // Показываем карту
      showMap();
      // Рисуем пины
      renderPinsMarkup(data.adsArr);
      // ВРЕМЕННО -- Показываем карточку
      renderCard(data.adsArr[0]);
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
})();
