document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const newGameButton = document.getElementById('new-game');
    let squares = [];
    let score = 0;

    function createBoard() {
        for (let i = 0; i < 16; i++) {
            let square = document.createElement('div');
            square.innerHTML = '';
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
    }

    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length);
        if (squares[randomNumber].innerHTML === '') {
            squares[randomNumber].innerHTML = 2;
            checkForGameOver();
        } else generate();
    }

    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML || 0;
                let totalTwo = squares[i+1].innerHTML || 0;
                let totalThree = squares[i+2].innerHTML || 0;
                let totalFour = squares[i+3].innerHTML || 0;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill('');
                let newRow = zeros.concat(filteredRow);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }
    
    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML || 0;
                let totalTwo = squares[i+1].innerHTML || 0;
                let totalThree = squares[i+2].innerHTML || 0;
                let totalFour = squares[i+3].innerHTML || 0;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
    
                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill('');
                let newRow = filteredRow.concat(zeros);
    
                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }
    
    
    
    

    function moveUp() {
        // Logic to move tiles up
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML || 0;
            let totalTwo = squares[i+4].innerHTML || 0;
            let totalThree = squares[i+8].innerHTML || 0;
            let totalFour = squares[i+12].innerHTML || 0;
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill('');
            let newColumn = filteredColumn.concat(zeros);

            squares[i].innerHTML = newColumn[0];
            squares[i + 4].innerHTML = newColumn[1];
            squares[i + 8].innerHTML = newColumn[2];
            squares[i + 12].innerHTML = newColumn[3];
        }
    }

    function moveDown() {
        // Logic to move tiles down
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML || 0;
            let totalTwo = squares[i+4].innerHTML || 0;
            let totalThree = squares[i+8].innerHTML || 0;
            let totalFour = squares[i+12].innerHTML || 0;
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill('');
            let newColumn = zeros.concat(filteredColumn);

            squares[i].innerHTML = newColumn[0];
            squares[i + 4].innerHTML = newColumn[1];
            squares[i + 8].innerHTML = newColumn[2];
            squares[i + 12].innerHTML = newColumn[3];
        }
    }

    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + 1].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }

    function combineColumn() {
        // Combine tiles in a column and update the score
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + 4].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 4].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + 4].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
    }

    function control(e) {
        if(e.keyCode === 39) {
            keyRight();
        } else if (e.keyCode === 37) {
            keyLeft();
        } else if (e.keyCode === 38) {
            keyUp();
        } else if (e.keyCode === 40) {
            keyDown();
        }
    }

    function keyRight() {
        moveRight();
        combineRow();
        moveRight();
        generate();
    }

    function keyLeft() {
        moveLeft();
        combineRow();
        moveLeft();
        generate();
    }

    function keyDown() {
        moveDown();
        combineColumn();
        moveDown();
        generate();
    }

    function keyUp() {
        moveUp();
        combineColumn();
        moveUp();
        generate();
    }

    function checkForWin() {
        for (let i=0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = 'You Win!';
                document.removeEventListener('keyup', control);
                setTimeout(() => clear(), 3000);
            }
        }
    }

    function checkForGameOver() {
        let zeros = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeros++;
            }
        }
        if (zeros === 0) {
            alert('Game Over');
            document.removeEventListener('keyup', control);
        }
    }



    function clear() {
        clearInterval(myTimer);
    }

    newGameButton.addEventListener('click', resetGame);

    // Reset game
    function resetGame() {
        squares.forEach(square => square.innerHTML = 0);
        score = 0;
        scoreDisplay.innerHTML = score;
        generate();
        generate();
    }

    // Event listeners
    document.addEventListener('keyup', control);
    newGameButton.addEventListener('click', resetGame);
    createBoard();
});
