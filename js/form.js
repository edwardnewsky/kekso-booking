(() => {
  'use strict';

  // --------------------------------------------------------- Форма

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

  statusAdFormSubmit(false); // По умолчанию кнока не активна

  let checkAdFormSubmitStatus = () => {
    if (
      adFormTitleInput.validity.valid &&
      adFormAddressInput.validity.valid &&
      adFormPriceInput.validity.valid
    ) {
      console.log('можно жать кнопку');
      statusAdFormSubmit(true);
    } else {
      statusAdFormSubmit(false);
    }
  };

  let inputCheckValidity = (focusEvt) => {
    focusEvt.target.addEventListener('keypress', () => {
      if (focusEvt.target.validity.tooShort) {
        let min = focusEvt.target.getAttribute('minlength');
        focusEvt.target.setCustomValidity(
          `Слишком коротко, минимум ${min} символов`
        );
        focusEvt.target.style.borderColor = 'red';
        focusEvt.target.style.boxShadow = '0 0 2px 2px red';
      } else if (focusEvt.target.validity.valueMissing) {
        focusEvt.target.setCustomValidity('Заполните это поле');
        focusEvt.target.style.borderColor = 'red';
        focusEvt.target.style.boxShadow = '0 0 2px 2px red';
      } else if (focusEvt.target.validity.rangeOverflow) {
        focusEvt.target.setCustomValidity('Вы ввели слишком большое значение');
        focusEvt.target.style.borderColor = 'red';
        focusEvt.target.style.boxShadow = '0 0 2px 2px red';
      } else if (focusEvt.target.validity.rangeUnderflow) {
        focusEvt.target.setCustomValidity(
          'Вы ввели слишком маленькое значение'
        );
        focusEvt.target.style.borderColor = 'red';
        focusEvt.target.style.boxShadow = '0 0 2px 2px red';
      } else {
        focusEvt.target.setCustomValidity('');
        focusEvt.target.style.borderColor = '#529955';
        focusEvt.target.style.boxShadow = '0 0 2px 2px #529955';
        checkAdFormSubmitStatus(); // Проверка, можно ли жать кнопку
      }
    });

    focusEvt.target.addEventListener('blur', () => {
      focusEvt.target.style.boxShadow = 'none';
    });
  };

  adForm
    .querySelectorAll('input')
    .forEach((input) => input.addEventListener('focus', inputCheckValidity));
})();
