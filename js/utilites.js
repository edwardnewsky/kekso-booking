'use strict';

(() => {
  window.utilites = {
    // Функция которая возвращяет рандомное число от min до max значений
    getRandomFromInterval: (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    // Функция которая случайно обрезает массив
    getRandomCutFromArr: (arr) => {
      let lengthArr = utilites.getRandomFromInterval(1, arr.length);
      return arr.slice(0, lengthArr);
    },
    // Функция перемешивания массива
    getRandomShuffleFromArr: (arr) => {
      let copyArr = arr.slice(0);

      for (var i = copyArr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = copyArr[i];
        copyArr[i] = copyArr[j];
        copyArr[j] = temp;
      }
      return copyArr;
    },
  };
})();
