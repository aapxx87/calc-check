// ------ ОСНОВНОЙ МАССИВ ХРАНЕНИЯ ДАННЫХ

const dataArray = [
  {
    itemName: 'SpainTrip',
    numberData: [[150, 'Tickets'], [200, 'Hotel'], [100, 'Beer'], [30, 'Apple']],
    calcSum: function () { },
  },
  {
    itemName: 'Shoping',
    numberData: [[50, 'Dress'], [30, 'Phone']],
    calcSum: function () { },
  },
  {
    itemName: 'Guest',
    numberData: [[10, 'Potatos'], [20, 'Wine'], [40, 'Juice']],
    calcSum: function () { },
  },
]


// console.log(dataArray[0].numberData[0][1]);


// ----------- SELECTORS -----------

// ----- основные контейнеры
const caclContainer = document.querySelector('.container')
const listContainer = document.querySelector('.container-list')



const inputAdd = document.querySelector('.input_add')
const inputTitle = document.querySelector('.input_title')

const btnAdd = document.querySelector('.btn_add')
const btnSave = document.querySelector('.btn_save')


// ----- дисплей калькулятора
const display = document.querySelector('.display')
const displayList = document.querySelector('.display-list')
const displayFinal = document.querySelector('.display-final')


// ----- Кнопки калькулятора

// Цифровые кнопки
const tabNumber = document.querySelectorAll('.tab-number')

// Кнопки арифметических операций
const tabCalc = document.querySelectorAll('.tab-calc')
const tabPlus = document.querySelector('.tab-plus')

const tabEqual = document.querySelector('.tab-equal')

const containerBox = document.querySelector('.container-list')

const result = document.querySelector('.result')









// ----------- ФУНКЦИОНАЛ КАЛЬКУЛЯТОРА -----------

// число, которое вводит пользователь для дальнейших операций, строка как оно может склеиваться из нескольких знаков
// после каждой операции эта переменная обнуляется, чтобы юзер мог ввести новое число
let tempNumber = ''

let calcNumber1 = ''
let calcNumber2 = ''
let actionCalc = ''


let calculate = Number(0)

// число, которое образуется после определенной операции
let operation = 0;

// сохраняются все числа которые вводятся дл ясуммирования результата
let numbersData = []


// Проверяем какя из кнопок цифровой клавиатуры нажата
tabNumber.forEach(function (btn) {
  btn.addEventListener('click', function () {

    tempNumber = tempNumber + btn.textContent

    display.textContent = tempNumber

  })
})






tabCalc.forEach(function (btn) {

  btn.addEventListener('click', function () {

    actionCalc = btn.textContent

    calcNumber1 = Number(tempNumber)


    displayList.insertAdjacentHTML("beforeEnd",
      `
     <p>${tempNumber}</p>
    `)





    display.textContent = actionCalc

    numbersData.push(Number(calcNumber1))
    console.log(numbersData);

    tempNumber = ''

    let sum = 0

    for (const item of numbersData) {

      sum = sum + item

    }

    console.log(sum);

    displayFinal.textContent = sum



  })

})










// равно
tabEqual.addEventListener('click', function () {


  console.log(actionCalc);


  calcNumber2 = Number(tempNumber)

  tempNumber = ''


  if (actionCalc === '+') {

    calculate = calcNumber1 + calcNumber2
    console.log(calculate);
    numbersData.push(Number(calcNumber2))
    display.textContent = calculate

  } else if (actionCalc === '*') {

    calculate = calcNumber1 * calcNumber2
    numbersData.push(Number(calcNumber2))
    console.log(calculate);
    display.textContent = calculate


  } else if (actionCalc === '/') {

    calculate = calcNumber1 / calcNumber2
    numbersData.push(Number(calcNumber2))
    console.log(calculate);
    display.textContent = calculate

  } else if (actionCalc === '-') {

    calculate = calcNumber1 - calcNumber2
    numbersData.push(Number(calcNumber2))
    console.log(calculate);
    display.textContent = calculate

  }

  console.log(numbersData);

  actionCalc = ''
  calcNumber1 = ''
  calcNumber2 = ''


})






/*
// ----------- ВЫВОД В ИНТЕРФЕЙС -----------
for (const item of dataArray) {


  // сначала выгружаем основные элементы списка, добавляем класс, чтобы потом именно сюда вставлять детали array
  containerBox.insertAdjacentHTML("beforeEnd",
    `
    <div class="result ${item.itemName}">
     <p><b>${item.itemName}</b></p>
    </div >
  `
  )

  // потом из каждого элемента списка довставляем его array
  for (const list of item.numberData) {
    document.querySelector(`.${item.itemName}`).insertAdjacentHTML("beforeEnd",
      `
     <p>${list}</p>
   `)
  }

}
*/


// Событие клика по кнопке done, массив из инпута добавляется в объект
btnSave.addEventListener('click', function () {

  addNewData(numbersData, inputTitle.value)

  numbersData = []

  // inputAdd.value = ''
  inputTitle.value = ''


  console.log('--------- Updated array ---------');
  console.log(dataArray);


  const lastItem = dataArray[dataArray.length - 1]


  // Вынрузка в HTML последнего добавленного в массив элемента
  containerBox.insertAdjacentHTML("beforeEnd",
    `
      <div class="result ${lastItem.itemName}">
       <p class="result-title"><b>${lastItem.itemName}</b></p>
      </div >
    `
  )

  // потом из каждого элемента списка довставляем его array
  for (const list of lastItem.numberData) {
    document.querySelector(`.${lastItem.itemName}`).insertAdjacentHTML("beforeEnd",
      `
       <p class="result-list">${list}</p>
     `)
  }


  caclContainer.classList.add('shift-out-container')
  listContainer.classList.add('shift-in-container-list')


})



// ------ ДОБАВЛЕНИЕ НОВОГО ПУНКТА РАСХОДОВ

// получаем их интерфейса название для расходной темы и массив из чисел из калькулятора, это пункты расходов (к ним по дефолту проставляется имя "Item name")
const addNewData = function (arr, title) {

  const number = []  // создаем пустой массив, в который дальше засунем каждый элемент массива в конструкцию типа [10, 'Item name']

  // ------ объект описывающий расходный пункт, он заполняется данными из интерфейса и потом пушится в массив со всеми расходными пунктами
  const itemObj = {
    calcSum: function () { },
  }

  for (const i of arr) {  // итерируем массив который передаем аргументом, чтобы заполнить массив number
    number.push([i, 'Item name']) // заполняем массив number в нужном формате [[число, "Item name"]
  }

  itemObj.itemName = title   // добавляем в объект item name из переданного аргумента
  itemObj.numberData = number

  dataArray.push(itemObj)

}




// ------ ВЫВОД СПИСКА РАСХОДОВ С НАИМЕНОВАНИЕМ ПО СТАТЬЕ ПРИ ВВОДЕ ЕЕ Title

// выгружается в интерфейс типа как структура расходов по конкретной теме
const findItem = function (title) {

  // итерируем массив с основными данными и условие, если в элемента массива (объект имя ранво переданному аргументу), то есть мы нашли нужны йобъект, то выводим его  свойство с расходами
  for (const i of dataArray) {

    if (i.itemName === title) {
      console.log(i.numberData, dataArray.indexOf(i));
    }

  }

}

// в интефрфейсе кликаем по тайтлу пункта расходов и проваливаемся в его детализацию, то есть тайтл является аргументом по которому далее мы находим нужный объект в массиве со всеми пунктами
findItem('Weekend')





// ------ ПЕРЕИМЕНОВАНИЕ ДЕФОЛТНОГО НАЗВАНИЯ ДЛЯ ЗНАЧЕНИЯ РАСХОДОВ ('Item name')

// выбор пункта происходит из списка расходов внутри конкретного расхода, то есть из функции findItem , мы  когда кликаем по пункту то забираем индекс конкретного числа dataArray.indexOf(i)
const renameItem = function (indexItem, indexNumber, name) {

  // dataArray[indexItem].numberData[indexNumber][1] = name

}

renameItem(4, 0, 'Bar')
renameItem(4, 1, 'Cinema')
renameItem(4, 2, 'Cafe')

// console.log(dataArray);




// ------ УДАЛЕНИЕ ITEM ВНУТРИ РАСХОДНОГО ПУНКТА
