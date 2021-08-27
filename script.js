// ----------- SELECTORS -----------

// ----- Основные контейнеры
const caclContainer = document.querySelector('.container')
const listContainer = document.querySelector('.container-list')
const allListContainer = document.querySelector('.container-allList')


// блок с детлизацией ивента при переходе с главной
// const eventList = document.querySelectorAll('.result')

// инпут названия события
const inputTitle = document.querySelector('.input_title')

// кнопка Save в калькуляторе для сохранени события
const btnSave = document.querySelector('.btn_save')



// вывод текущего вводимого числа
const display = document.querySelector('.display')

// список всех введенных значений
const displayList = document.querySelector('.display-list')

// выводится итоговая сумма 
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





// ------ ОСНОВНОЙ МАССИВ ХРАНЕНИЯ ДАННЫХ

// в нем каждый новый рассчет пользователем сохраняется в виде объекта. Новый объект пушится в массив. 

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





// ----------- СТАРТОВЫЕ УСЛОВИЯ -----------

// переменная для сохраннеия текущего вводимого числа
let tempNumber = ''

// две переменные для сохраннеия чисел с которыми будет производиться операция
let calcNumber1 = ''
let calcNumber2 = ''

// переменная для сохраннеия выбранного дейтсивя калькуляции пользователем
let actionCalc = ''

let calculate = Number(0)

// число, которое образуется после определенной операции
let operation = 0;

// сохраняются все числа которые вводятся для суммирования результата
let numbersData = []






// ----------- ФУНКЦИОНАЛ КАЛЬКУЛЯТОРА -----------

// Нажатие по кнопкам цифр - проверяем какя из кнопок цифровой клавиатуры нажата
tabNumber.forEach(function (btn) {
  btn.addEventListener('click', function () {

    tempNumber = tempNumber + btn.textContent

    display.textContent = tempNumber

  })
})



// Нажатие по кнопке калькуляции
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


    tempNumber = ''

    let sum = 0

    for (const item of numbersData) {

      sum = sum + item

    }

    // console.log(sum);

    displayFinal.textContent = sum

  })

})



//  -------------------- SAVE from Calculator ----------

btnSave.addEventListener('click', function () {

  //  numbersData - массив из всех введенных значений передаем аргументом в функцию addNewData и   передаем название ивента из inputTitle.value
  addNewData(numbersData, inputTitle.value)

  //  после того как массив отправили в функцию numbersData обнуляем его
  numbersData = []



  // ------ дальше идет функционал выгрузки добавленного нового ивента в интерфейс 


  // выбираем из массива всех данных только последний добавленный объект -> ниже его выгружаем в HTML
  const lastItem = dataArray[dataArray.length - 1]

  // Выгрузка в HTML последнего добавленного в массив элемента
  containerBox.insertAdjacentHTML("beforeEnd",
    `
      <div class="result ${lastItem.itemName}">
       <p class="result-title"><b>${lastItem.itemName}</b></p>
       <p class="result-sum"></p>
      </div >
    `
  )


  let sum = 0

  // потом из каждого элемента списка довставляем его array
  for (const [i, list] of lastItem.numberData.entries()) {

    sum = sum + list[0]

    // console.log(sum)

    document.querySelector(`.${lastItem.itemName}`).insertAdjacentHTML("beforeEnd",
      `

      <ul class="result-ul">
        <li>
          <p class="result-list">${list[0]}</p>
          <p class="result-name">${list[1]}<span class='result-name-span'>${i}</span></p>
        </li>
        </ul>
     `)
  }


  document.querySelector('.result-sum').insertAdjacentHTML("beforeEnd",
    `<p class="result-sum">${sum}</p>`)


  // caclContainer.classList.add('shift-out-container')
  // listContainer.classList.add('shift-in-container-list')


  caclContainer.style.display = 'none'
  listContainer.style.display = 'block'


  // обнуление всех вводимых ранее данных в калькулятор

  // переменная для сохраннеия текущего вводимого числа
  tempNumber = ''

  // две переменные для сохраннеия чисел с которыми будет производиться операция
  calcNumber1 = ''
  calcNumber2 = ''

  displayFinal.textContent = ''
  displayList.textContent = ''
  display.textContent = ''
  inputTitle.value = ''

  console.log(dataArray);



  // добаляем последний добавленный элемент массива с даннвми на главную страницу
  allListContainer.insertAdjacentHTML("beforeEnd",
    `<div class="result ${lastItem.itemName}">
       <p><b>${lastItem.itemName}</b></p>
      </div >`
  )





})



// ------ ДОБАВЛЕНИЕ НОВОГО ИВЕНТА В МАССИВ СО ВСЕМИ ИВЕНТАМИ

// получаем их интерфейса название для расходной темы и массив из чисел из калькулятора, это пункты расходов (к ним по дефолту проставляется имя "Item name")
const addNewData = function (arr, title) {

  const number = []  // создаем пустой массив, в который дальше засунем каждый элемент массива в конструкцию типа [10, 'Item name']

  // ------ объект описывающий расходный пункт, он заполняется данными из интерфейса и потом пушится в массив со всеми расходными пунктами
  const itemObj = {
    calcSum: function () { },
  }

  for (const [idx, i] of arr.entries()) {  // итерируем массив который передаем аргументом, чтобы заполнить массив number
    console.log(idx);
    number.push([i, ('Item name' + ' ' + idx)]) // заполняем массив number в нужном формате [[число, "Item name"]
  }

  itemObj.itemName = title   // добавляем в объект item name из переданного аргумента
  itemObj.numberData = number

  dataArray.push(itemObj)




}





// ----------- ВЫВОД В ИНТЕРФЕЙС -----------

// ----------- ПЕРВЫЙ ЭКРАН + список всех ивентов

// выгрузка данных из массива с событиями в интерфейс на стартовую страницу со списком всех ивентов
for (const item of dataArray) {

  // сначала выгружаем основные элементы списка, добавляем класс, чтобы потом именно сюда  вставлять детали array

  allListContainer.insertAdjacentHTML("beforeEnd",
    `<div class="result ${item.itemName}">
     <p><b>${item.itemName}</b></p>
    </div >`
  )

}


const eventList = document.querySelectorAll('.result')




// ----------- ЭКРАН ДЕТАЛИЗАЦИИ ИВЕНТА + открывается расходная детализация ивента

// выгружаем данные при клике по событию на странице всех событий на страницу с детализацией выбранного события
eventList.forEach(function (item) {

  item.addEventListener('click', function () {

    allListContainer.style.display = 'none'
    listContainer.style.display = 'block'


    const name = item.classList


    for (const list of dataArray) {

      // console.log(list);

      if (list.itemName === name[1]) {
        // console.log(list);
        // console.log(list.numberData);

        listContainer.insertAdjacentHTML("beforeEnd",
          `
          <div class="result ${list.itemName}">
            <p class="result-title"><b>${list.itemName}</b></p>
            <p class="result-sum"></p>
          </div >
          `
        )

        for (const number of list.numberData) {

          document.querySelector(`.container-list .${list.itemName}`).insertAdjacentHTML("beforeEnd",
            `
          <ul class="result-ul">
            <li>
            <p class="result-list">${number[0]}</p>
            <p class="result-name">${number[1]}</p>
            </li>
          </ul>
         `)

        }

      }

    }



    //!  функционал переименования item name - работает, но очень сложно


    // шаг 1 - создаем переменную из нод элементов из которых мы будем забирать данные для дальнейшего переименования
    const itemNode = document.querySelectorAll('.container-list .result-name')


    itemNode.forEach(function (item) {
      // шаг 2 - проходимся циклом по нодам, чтобы понять по какой кликнул юзер
      item.addEventListener('click', function () {

        // сохраняем из HTML text content, который будем использовать как уникальный ключ для поиска нужного объекта и массива
        const name = item.textContent
        // console.log(name);

        for (const list of dataArray) {
          // шаг 3 - перебираем циклом все объекты в основном массиве
          // console.log(list);

          for (const [i, arr] of list.numberData.entries()) {
            // шаг 4 - перебираем все свойства numberData (массив) из каждого объекта
            // console.log(arr);

            for (const name2 of arr) {
              // шаг 5 - выбираем все элементы массива numberData - список массивов типа [150, "Tickets"]

              if (typeof name2 === 'string') {
                // console.log(name2);
                // шаг 6 - забираем только второй элемент из массива, который строка, чтобы дальше сравнить с ней изначальный const name = item.textContent

                if (name2 === name) {

                  // шаг 7 - если name = item.textContent равен второму элементу из массива шагом выше

                  list.numberData[i].splice(1)
                  // то м ыего вырезаем

                  const inputData = document.querySelector('.newItemName').value

                  list.numberData[i].push(inputData)
                  // и вставляем новое значение из инпута

                }

              }

            }
          }
        }

      })

    })

  })
})





// ----------- ФУНКЦИОНАЛ КНОПКИ CALC! НА ГЛАВНОЙ -> ПЕРЕХОД НА КАЛЬКУЛЯТОР -----------

const btnCalc = document.querySelector('.btnNewCalc')

btnCalc.addEventListener('click', function () {

  allListContainer.style.display = 'none'
  caclContainer.style.display = 'block'

})



// ----------- ФУНКЦИОНАЛ КНОПКИ MAIN PAGE! НА СТРАНИЦЕ ДЕТАОИЗЦИИ ПОСЛЕ КНОПКИ SAVE -> ПЕРЕХОД НА ГЛАВНУЮ -----------

const btnStartPage = document.querySelector('.btnStartpage')

btnStartPage.addEventListener('click', function () {

  listContainer.style.display = 'none'
  allListContainer.style.display = 'block'


  document.querySelector('.container-list .result').remove()

})




// ----------- ПЕРЕИМЕНОВАНИЕ Item list

// const itemNode = document.querySelectorAll('.container-list .result-name')

// console.log(itemNode);

// itemNode.forEach(function (item) {

//   item.addEventListener('click', function () {
//     console.log(item);
//   })

// })