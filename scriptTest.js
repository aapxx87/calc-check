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









// равно - пока не проработан (старая версия)
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