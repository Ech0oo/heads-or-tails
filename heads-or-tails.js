'use strict';

var readline = require('readline'),
          fs = require('fs'),
        util = require('util');

var loger = [],
    index = 0,
    rl,
    logFileName,
    pathToLogFile = './logs/',
    fullPathToLogFile;

console.log(
    '============================\n'
    + 'Игра орел или решко.\n'
    + '1 - Орел\n'
    + '2 - Решко\n'
    + '----------------------------\n\n'
);



// get a log file name from a command line
logFileName = process.argv[2] || 'history';

// full path to log file
fullPathToLogFile = util.format('%s%s%s', pathToLogFile, logFileName, '.log');

// delete file if exists 
fs.stat(fullPathToLogFile, function (err, stats){
  if (err) writeErrorToFile('Сheck of existence of the file: ', err);

  if (stats) {
    fs.unlink(fullPathToLogFile, function (err) {
      if (err) writeErrorToFile('Delete a file: ', err);
    });
  }
});



rl = readline.createInterface(process.stdin, process.stdout);

askSide();

rl.on('line', function (answer) {
    var chosenSide,
        realSide,
        logDataString;

    index++;

    chosenSide = handleAnswer(answer);
    console.log('Выбрано: ' +  chosenSide);

    realSide = handleAnswer(generateSide());
    console.log('Выпало: ' + realSide);

    if (chosenSide === realSide) {
      console.log('Вы угадали!\n')
    } else {
      console.log('Попробуйте еще раз.\n')
    }

    // add to array of game results
    loger.push({index, chosenSide, realSide});

    // write to file
    logDataString = util.format('%s %s %s\r\n', index, chosenSide, realSide);

    fs.appendFile(fullPathToLogFile, logDataString);

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
    case 'end' : quitGame();
      break;
    default : sideName = 'Неизвестное значение';
  }

  return sideName;
}

// generate coint side
function generateSide() {
  // Math.floor(min + Math.random() * (max + 1 - min))
  var sideNumber = Math.floor(1 + Math.random()*(2+1-1));

  return sideNumber;
}

// end the game
function quitGame() {
  rl.close();
  process.exit(console.log(loger));
}


// write errors to the file
function writeErrorToFile(doing, err) {
  var lineToWrite;

  lineToWrite = util.format('%s%s\r\n', doing, err);

  fs.appendFile('./errors.log', lineToWrite);
}