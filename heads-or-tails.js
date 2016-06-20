'use strict';

var readline = require('readline'),
    fs       = require('fs'),
    util     = require('util');

// var loger = require('./logs');
var loger = [],
    index = 0,
    rl;

console.log(
    '============================\n'
    + 'Игра орел или решко.\n'
    + '1 - Орел\n'
    + '2 - Решко\n'
    + '----------------------------\n\n'
);


rl = readline.createInterface(process.stdin, process.stdout);


askSide();

rl.on('line', function (answer) {
    index++;
    var chosen = handleAnswer(answer);
    console.log('Выбрано: ' +  chosen);

    var realSide = handleAnswer(generateSide());
    console.log('Выпало: ' + realSide);

    // add to array of game results
    loger.push({index, chosen, realSide});

    // write to file
    var logDataString = util.format('%s %s %s\r\n', index, chosen, realSide);
    fs.appendFile('msg.log', logDataString);

    askSide();
});


// asks question
function askSide() {
    rl.setPrompt('Орел или решко?\n');
    rl.prompt();
}

// return name by number or exit game
function handleAnswer(value) {
  var sideName;
  value = (value+'').toLowerCase().trim();

  switch(value) {
    case '1' : sideName = 'Орел';
      break;
    case '2' : sideName = 'Решко';
      break;
    case 'end' : console.log(loger); rl.close(); process.exit();
      break;
    default : sideName = 'Неизвестное значение';
  }

  return sideName;
}


function generateSide() {
  // Math.floor(min + Math.random() * (max + 1 - min))
  var sideNumber = Math.floor(1 + Math.random()*(2+1-1));

  return sideNumber;
}


















// var endGame = false;

// while (!endGame) {
//   rl.question('Орел или решко?', printResult)  
// }


// function printResult(answer) {
//   if (answer) {
//     var chosenSideName;

//     chosenSideName = handleAnswer(answer);
//     console.log('Вы выбрали: ' + chosenSideName);

//     var autoSide = generateSide();
//     var autoSideName = handleAnswer(autoSide);
//     console.log('Выпало: ' + autoSideName);
//   }

//   rl.close();
// }







// console.log('Орел или решко?');

// get the first arg after argv[] = node
// var answer = process.argv[2];

// if (answer) {
//     var chosenSide;

//     chosenSide = getSideName(answer);
//     console.log('Вы выбрали: ' + chosenSide);

//     var autoSide = generateSide();
//     var autoSideName = getSideName(autoSide);
//     console.log('Выпало: ' + autoSideName);
// }








