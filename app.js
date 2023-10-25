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
    let gameElements = document.querySelectorAll("#game-board li");
  
    let activePlayer = ""; // Store the active player for the form submission
    let p1 = ""; // Declare p1 outside the event listener functions
    let p2 = ""; // Declare p2 outside the event listener functions
  
    let currentPlayerIndex = 0;
  
    const players = [
      { name: "", symbol: "X" },
      { name: "", symbol: "O" },
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
        p1 = playername.toUpperCase();
        players[0].name = p1; // Update the player name in the players array
        name1El.textContent = playername;
      } else if (activePlayer === "player2") {
        p2 = playername.toUpperCase();
        players[1].name = p2; // Update the player name in the players array
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
      gameboardEl.scrollIntoView({ behavior: "smooth" });
      playernamegEl.innerHTML = players[currentPlayerIndex].name; // Update player name in the game board
  
      gameElements = document.querySelectorAll("#game-board li"); // Update the gameElements variable
  
      for (let gameElement of gameElements) {
        gameElement.addEventListener("click", selectGameField);
      }
    }
  
    newgameEl.addEventListener("click", start);
  
    function checkWinCondition() {
      const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      for (let combo of winCombos) {
        if (
          gameElements[combo[0]].textContent === players[currentPlayerIndex].symbol &&
          gameElements[combo[1]].textContent === players[currentPlayerIndex].symbol &&
          gameElements[combo[2]].textContent === players[currentPlayerIndex].symbol
        ) {
          return true;
        }
      }
      return false;
    }
  
    function checkDrawCondition() {
      for (let gameElement of gameElements) {
        if (gameElement.textContent === "") {
          return false;
        }
      }
      return true;
    }
  
    function resetGame() {
      resultEl.textContent = ""; // Clear the result text
      for (let gameElement of gameElements) {
        gameElement.textContent = ""; // Clear the game board
        gameElement.addEventListener("click", selectGameField);
        gameElement.classList.remove("disabled");
      }
    }
  
    newgameEl.addEventListener("click", resetGame);
  
    function selectGameField(event) {
      if (!event.target.textContent) {
        event.target.textContent = players[currentPlayerIndex].symbol;
        if (checkWinCondition()) {
          resultEl.textContent = ` Appie ${players[currentPlayerIndex].name} won the match`;
          gameElements.forEach((element) => {
            element.removeEventListener("click", selectGameField);
            element.classList.add("disabled");
          });
          return;
        }
  
        if (checkDrawCondition()) {
          resultEl.textContent = "Match Drawn";
          return;
        }
  
        currentPlayerIndex = 1 - currentPlayerIndex; // Switch player
        playernamegEl.innerHTML = players[currentPlayerIndex].name; // Update current player name
      }
      event.target.classList.add("disabled");
    }
  });
  
