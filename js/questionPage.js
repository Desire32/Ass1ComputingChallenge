let sessionID = localStorage.getItem('sessionID')

function getQuestion() {
	let url = 'https://codecyprus.org/th/api/question?session=' + sessionID
	fetch(url)
		.then(response => response.json())
		.then(jsonObject => {
			console.log(jsonObject)
			document.getElementById('userInput').style.display = 'none'
			SeenQuestion.style.display = 'block'
			let html = ''
			switch (jsonObject.questionType) {
				case 'BOOLEAN':
					html += `<li class="PersonInfoPanel">${jsonObject.questionText}</li>`
					html += `<li class="PersonInfoPanel">Please select true or false:</li>`
					break
				case 'INTEGER':
					html += `<li class="PersonInfoPanel">${jsonObject.questionText}</li>`
					html += `<li class="PersonInfoPanel">Please enter an integer answer:</li>`
					html += '<input class="PersonInfoPanel" id="PlayerAnswer" type="text"/>'
					html +=
						'<input class="PersonInfoPanel" id="SubmitButton" type="button" value="Submit" />'
					break
				case 'NUMERIC':
					html += `<li class="PersonInfoPanel">${jsonObject.questionText}</li>`
					html += `<li class="PersonInfoPanel">Please enter a numeric answer:</li>`
					html +=
						'<input class="PersonInfoPanel" id="PlayerAnswer" type="text"/>'
					html +=
						'<input class="PersonInfoPanel" id="SubmitButton" type="button" value="Submit" />'
					break
				case 'MCQ':
					html += `<li class="PersonInfoPanel">${jsonObject.questionText}</li>`
					html += `<li class="PersonInfoPanel">Please select one of the following options:</li>`
					break
				case 'TEXT':
					html += `<li class="PersonInfoPanel">${jsonObject.questionText}</li>`
					html += `<li class="PersonInfoPanel">Please enter a single word answer:</li>`
					html +=
						'<input class="PersonInfoPanel" id="PlayerAnswer" type="text"/>'
					html +=
						'<input class="PersonInfoPanel" id="SubmitButton" type="button" value="Submit" />'
					break
				default:
					html += `<li class="PersonInfoPanel">${jsonObject.questionText}</li>`
					break
			}
			SeenQuestion.innerHTML = html
		})

    document.addEventListener('click', function (event) {
			if (event.target && event.target.id === 'SubmitButton') {
				submitAnswer()
			}
		})
}

function submitAnswer() {
	let answerInput = document.getElementById('PlayerAnswer').value.trim() 
	let answerURL =
		'https://codecyprus.org/th/api/answer?session=' +
		sessionID +
		'&answer=' +
		answerInput 
	fetch(answerURL)
		.then(response => response.json())
		.then(jsonObject => {
			console.log(jsonObject)
		})
}


