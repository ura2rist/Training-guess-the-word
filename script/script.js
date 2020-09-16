if(document.getElementById('start')){
	let start = document.getElementById('start'),						/* Получение кнопки старт */
		stop = document.getElementById('stop'),							/* Получение кнопки стоп */
		form = document.querySelector('.game-form');					/* Получение формы */
	let hp = 10;

	start.addEventListener('click', function(event){					/* Клик по кнопке старт */
		toggleButton();													/* Вызов функции hide кнопок и формы */
		hp = 10;
		startGame();													/* Вызов функции запуска игры */
	});

	stop.addEventListener('click', function(event){						/* Клик по кнопке стоп */
		toggleButton();													/* Вызов функции hide кнопок и формы */
	});

	function toggleButton(){											/* Функция hide кнопок и формы */
		event.preventDefault();											/* Отмена действия по умолчанию */
		start.classList.toggle('header-button-hide');					/* Показать или скрыть кнопку старт */
		stop.classList.toggle('header-button-hide');					/* Показать или скрыть кнопку стоп */
		form.classList.toggle('game-form-hide');						/* Показать или скрыть форму */
	}

	let arrayWords = [{													/* Массив  слов */
		word: 'рыба',
		hint: 'Плавает в воде'
	},{
		word: 'птица',
		hint: 'Летает в небе'
	},{
		word: 'машина',
		hint: '4 колеса'
	},{
		word: 'стол',
		hint: 'За ним едят'
	}];

	function startGame(){												/* Функция запуска игры */
		hp = 10,													/* Переменная с ХП */
		number = Math.floor(Math.random() * arrayWords.length), 	/* Получаем рандомное число */
		word = arrayWords[number].word,								/* Получаем нужное слово */
		hint = arrayWords[number].hint,								/* Получаем нужную подсказку */
		answerArray = [],											/* Пустой массив для ответа */
		remainingLetters = word.length,								/* Счетчик, сколько букв осталось */
		innerHp = document.getElementById('hp'),					/* Получение блока вывода hp жизней*/
		innerHint = document.getElementById('hint'),				/* Получение блока вывода hint подсказки*/
		innerLetter = document.getElementById('letter'),			/* Получение блока вывода letter букв*/
		buttonEnter = document.getElementById('enter-letter'),		/* Кнопка отправки буквы */
		message = document.querySelector('.message');				/* Получение блока для сообщений */
		document.getElementById('input-letter').value = ''			/* Очистки инпута */

		innerHp.innerHTML = hp;											/* Вывод ХП */
		innerHint.innerHTML = hint;										/* Вывод подсказки */

		for(let i = 0; i < word.length; i++){
			answerArray[i] = '_';										/* Заполнение пустого массива */
		}

		innerLetter.innerHTML = answerArray.join(' ');					/* Вывод угаданных букв и замена запятых на пробел */

		buttonEnter.addEventListener('click', function(event){			/* Клик по кнопки отправки буквы */
			event.preventDefault();										/* Отмена действий по умолчанию */
			message.innerHTML = '';
			let enterLetter = document.getElementById('input-letter').value;	/* Получение буквы */
			document.getElementById('input-letter').value = ''			/* Очистки инпута */
			if(enterLetter.length !== 1){
				message.innerHTML = 'Введите 1 букву';					/* Если поле ввода отличается от 1 */
			}else{
				message.innerHTML = '';
				let negation = false;									/* Отгаданна ли буква */
				for(let q = 0; q < word.length; q++){					/* Перебор слова */
					if(word[q] == enterLetter.toLowerCase()){			/* Если буквы совпадают */
						answerArray[q] = enterLetter;					/* Запись введенной буквы в массив */
						innerLetter.innerHTML = answerArray.join(' ');	/* Вывод обновленного массива с буквами */
						negation = true;								/* Если буква есть */
					}
				}

				if(!negation && hp > 0){
					message.innerHTML = 'Буква не найдена';				/* Буква не найдена*/
					hp--;												/* Отнять ХП */
					innerHp.innerHTML = hp;								/* Вывод ХП */
				}

				if(hp <= 0){
					alert('Вы проиграли');								/* Счетчик ХП меньше 0, вы проиграли */
				}
			}
		});
	}
}
