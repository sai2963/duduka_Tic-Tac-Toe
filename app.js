document.addEventListener("DOMContentLoaded", function () {
    let btn1El = document.getElementById("btn1");
    let name1El = document.getElementById("name1");
    let btn3El = document.getElementById("btn3");
    let name2El = document.getElementById("name2");
    let btn4El = document.getElementById("btn4");
    let newgameEl = document.getElementById("newgame");
    let playernamegEl = document.getElementById("playernameg");
    let resultEl = document.getElementById("result");
    let modalEl = document.getElementById("modal");
    let entireEl = document.getElementById("entire");
    let backdropEl = document.getElementById("backdrop");
    let playernameEl = document.getElementById("playername");
    let gameboardEl = document.getElementById("game-board");
    let gameElements = document.querySelectorAll('#game-board li');

    let activePlayer = ""; // Store the active player for the form submission
    let p1 = ""; // Declare p1 outside the event listener functions
    let p2 = ""; // Declare p2 outside the event listener functions

    let currentPlayerIndex = 0;

    const players = [
        { name: p1, symbol: 'X' },
        { name: p2, symbol: 'O' }
    ];

    function openModal() {
        backdropEl.style.display = "block";
        modalEl.style.display = "block";
        playernameEl.value = ""; // Clear the input value when the modal is opened
        activePlayer = this.id === "btn3" ? "player1" : "player2";
    }

    btn3El.addEventListener("click", openModal);
    btn4El.addEventListener("click", openModal);

    function close() {
        modalEl.style.display = "none";
        backdropEl.style.display = "none";
    }

    btn1El.addEventListener("click", close);

    // Event listener for the "Confirm" button
    document.getElementById("btn2").addEventListener("click", function (e) {
        e.preventDefault(); // Prevent the default form submission
        if (playernameEl.value.trim() === "") {
            alert("Enter Your Name");
            return; // Return early if the input is empty
        }
        let playername = playernameEl.value;

        if (activePlayer === "player1") {
            p1 = playername;
            name1El.textContent = playername;
        } else if (activePlayer === "player2") {
            p2 = playername;
            name2El.textContent = playername;
        }

        modalEl.style.display = "none";
        backdropEl.style.display = "none";
        playernameEl.value = ""; // Clear the input value after confirming the name
    });

    function start() {
        if (p1 === "" || p2 === "") {
            alert("Enter Player Names");
            return; // Return early if the input is empty
        }
        gameboardEl.style.display = "grid"; // Display the game board

        // Scroll to the game board
        gameboardEl.scrollIntoView({ behavior: 'smooth' });
        playernamegEl.innerHTML = players[currentPlayerIndex].name; // Update player name in the game board

        gameElements = document.querySelectorAll('#game-board li'); // Update the gameElements variable

        for (let gameElement of gameElements) {
            gameElement.addEventListener('click', selectGameField);
        }
    }

    newgameEl.addEventListener("click", start);

    function selectGameField(event) {
        if (!event.target.textContent) {
            event.target.textContent = players[currentPlayerIndex].symbol;
            if (checkWin(players[currentPlayerIndex].symbol)) {
                resultEl.textContent = `${players[currentPlayerIndex].name} wins!`;
                // Reset the game or perform any other necessary action
                return;
            }
            currentPlayerIndex = 1 - currentPlayerIndex; // Switch player
            playernamegEl.innerHTML = players[currentPlayerIndex].name; // Update current player name
        }
    }

    function checkWin(symbol) {
        // Check rows, columns, and diagonals for a win
        const rows = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
        const columns = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
        const diagonals = [[0, 4, 8], [2, 4, 6]];

        for (let row of rows) {
            if (row.every(index => gameElements[index].textContent === symbol)) {
                return true;
            }
        }

        for (let column of columns) {
            if (column.every(index => gameElements[index].textContent === symbol)) {
                return true;
            }
        }

        for (let diagonal of diagonals) {
            if (diagonal.every(index => gameElements[index].textContent === symbol)) {
                return true;
            }
        }

        return false;
    }
});
