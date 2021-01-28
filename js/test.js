// // Куда будем вставлять
//

// let renderButton = () => {
//   let buttonFragment = document.createDocumentFragment();
//   for (let i = 0; i < 3; i++) {
//     let buttonItem = document.createElement('button');
//     buttonItem.className = 'insert-button insert-button--' + (+i + 1);
//     buttonItem.insertAdjacentHTML(
//       'beforeend',
//       `<div class='inset-div insert-div--${+i + 1}'>insert-button--${
//         +i + 1
//       }</div>`
//     );
//     buttonFragment.appendChild(buttonItem);
//   }
//   return buttonFragment;
// };

// let createButton = () => {
//   let buttonItem = document.createElement('button');
//   buttonItem.className = 'insert-button insert-button';
//   // buttonItem.style.position = 'fixed';
//   buttonItem.style.height = '300px';
//   buttonItem.style.width = '300px';
//   buttonItem.insertAdjacentHTML('beforeend', '<div>insert</div>');

//   return buttonItem;
// };

// insertHere.insertAdjacentElement('beforebegin', createButton());

// Сделать список из 4х картинок

// Создаем массив из объектов
let TOTAL_IMG = 3;
let imgArr = [];

let createObj = (i) => {
  let obj = {
    src: '../img/test/' + (i + 1) + '.jpg',
    alt: 'Тестовая картинка ' + (i + 1),
  };

  return obj;
};

for (let i = 0; i < TOTAL_IMG; i++) {
  imgArr[i] = createObj(i);
}

// Создали 1 массив с 3 объектами
console.log(imgArr);

// Куда вставляем
let insertHere = document.querySelector('.notice');

// let createList = (howMuch, arrObj) => {
//   // Создаем фрагмент
//   let fragment = new DocumentFragment();

//   // ul - Создать элемент
//   let ul = document.createElement('ul');
//   ul.className = 'list';

//   for (let i = 0; i < howMuch; i++) {
//     // Создаем li * 3
//     let li = document.createElement('li');
//     li.className = 'list-item--' + i;
//     li.innerHTML = i;
//     // Каждый из li поместить в перед концом ul
//     li.append(i);

//     // // Создаем img * 3
//     // let img = document.createElement('img');
//     // img.src = arrObj[i].src;
//     // img.alt = arrObj[i].alt;
//     // // Каждый из img[i] поместить в перед концом li[i]
//     // ul.append(img);

//     fragment.append(li);
//   }

// };

// ul - Создать элемент
let ul = document.createElement('ul');
ul.className = 'list';

insertHere.before(ul);

let renderListItem = (howMuch) => {
  let fragment = new DocumentFragment();

  for (let i = 0; i < howMuch; i++) {
    let li = document.createElement('li');
    li.append(i);
    fragment.append(li);
  }
  return fragment;
};

ul.append(renderListItem(TOTAL_IMG));
