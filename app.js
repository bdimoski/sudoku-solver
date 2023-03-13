const puzzleBoard = document.querySelector('#puzzle')
const solveButton = document.querySelector('#solve-button')
const solutionDisplay = document.querySelector('#solution')
const squares = 81
const submission = []

for (let index = 0; index < squares; index++) {
    const inputElement = document.createElement('input')
    inputElement.setAttribute('type', 'number')
    inputElement.setAttribute('min', 1)
    inputElement.setAttribute('max', 9)
    if (
        ((index % 9 === 0 || index % 9 === 1 || index % 9 === 2) && index < 21) ||
        ((index % 9 === 6 || index % 9 === 7 || index % 9 === 8) && index < 27) ||
        ((index % 9 === 3 || index % 9 === 4 || index % 9 === 5) && (index > 27 && index < 53)) ||
        ((index % 9 === 0 || index % 9 === 1 || index % 9 === 2) && index > 53) ||
        ((index % 9 === 6 || index % 9 === 7 || index % 9 === 8) && index > 53)
    ) {
        inputElement.classList.add('odd-section')
    }

    puzzleBoard.appendChild(inputElement)

}

const joinValues = () => {
    const inputs = document.querySelectorAll('input')
    submission.length = 0
    inputs.forEach(input => {
        if (input.value) {
            submission.push(parseInt(input.value))
        } else {
            submission.push(0)
        }
    })
}

const populateValues = (answer) => {
    const inputs = document.querySelectorAll('input')
    inputs.forEach((input, i) => {
        input.value = answer[i]
    })
    solutionDisplay.innerHTML = 'This is the answer'
}

const solve = () => {
    joinValues();
    const data = {
        input: submission
    };
    fetch('http://localhost:8888/solve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            populateValues(data.answer)
        })
        .catch(error => console.error(error));
}


solveButton.addEventListener('click', solve)
