'use strict';

var fs = require('fs'),
		split = require('split');

var logFileName,
		pathToLog,
		gArr = [],
		_wins = 0,
		_loses = 0,
		_rowLoses = 0,
		_numberGames;


logFileName = process.argv[2] || 'history.log';
pathToLog = './logs/' + logFileName + '.log';


fs.createReadStream(pathToLog)
	.pipe(split())
	.on('data', function (line) {
		console.log(line);
		var arr = line.split(' ');
		
		var obj = {};
		obj.index = arr[0];
		obj.chosen = arr[1];
		obj.result = arr[2];
		if (obj.index)	gArr.push(obj);
  })
  .on('end', function () {
  		console.log(gArr);

			handleResults();

			console.log('Сиграно :' + _numberGames + ' игр.');
			console.log('Выиграно :' + _wins + ' игр.');
			console.log('Проиграно :' + _loses + ' игр.');
			console.log('Проиграно подряд:' + _rowLoses + ' игр.');
  });
			


function handleResults() {
	var maxLoses = 0,
			currentLosesNumber = 0;

	_numberGames = gArr.length;

	for (var i =0; i < _numberGames; i++) {
		if (gArr[i].chosen === gArr[i].result) {
			_wins = _wins +1;

			currentLosesNumber = 0;

		} else {
			_loses = _loses + 1;

			currentLosesNumber++;
		}

		if (maxLoses < currentLosesNumber) {
			maxLoses = currentLosesNumber
		}
	}

	_rowLoses = maxLoses;
}