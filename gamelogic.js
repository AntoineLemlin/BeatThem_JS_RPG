const createChar = document.querySelectorAll(".createChar");
const modalCreate = document.querySelector(".creation-panel-modal");
const closeModal = document.querySelectorAll(".closeModal");
const submitChar = document.getElementById("submitChar");
const nameInput = document.getElementById("fname");
const raceInput = document.getElementById("race-select");
const names = document.querySelectorAll(".nameFighter");
const races = document.querySelectorAll(".raceFighter");
const itemInput = document.getElementById("item-select");
const items = document.querySelectorAll(".itemFighter");
const healthBar = document.querySelectorAll(".bar");
const player1Box = document.getElementById("player1");
const player2Box = document.getElementById("player2");
const players = [0, 1];
const log = document.querySelector(".log");
let characters = [];
let currentPlayer = players[0];
let comment = document.getElementById("comment");
const victoryScreen = document.querySelector(".victory-panel-modal");
const visual = document.querySelectorAll("#visual");
const action = document.querySelectorAll(".actions");
const playersGame = document.querySelector(".players");
const dialogBox = document.querySelectorAll('.dialogBox')

const restart = document.getElementById("restart");

//Action buttons
const hit = document.querySelectorAll(".hit");
const heal = document.querySelectorAll(".heal");
const yield = document.querySelectorAll(".yield");

// This resets the color of the inputs and empty them
const resetInputs = () => {
  nameInput.value = null;
  raceInput.value = null;
  itemInput.value = null;
  nameInput.style.borderColor = "black";
  raceInput.style.borderColor = "black";
  itemInput.style.borderColor = "black";
};

// Make the modal appear when we create the player
const createCharacter = (currentPlayer) => {
  modalCreate.style.visibility = "visible";
  modalCreate.querySelector("h2").innerHTML = `Hello Player ${
    currentPlayer + 1
  }`;
};

//Switch the player and the color
const changePlayer = (num) => {
  if (num === 0) {
    player2Box.style.backgroundColor = "grey";
    player1Box.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    return (currentPlayer = players[1]);
  }
  if (num === 1) {
    player1Box.style.backgroundColor = "grey";
    player2Box.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    return (currentPlayer = players[0]);
  }
};

//Add log

const addLog = (name, message) => {
  const template = document.getElementsByTagName("template")[0];
  let clone = template.content.cloneNode(true);

  clone.querySelector("h4").innerHTML = name;

  clone.querySelector("p").innerHTML = message;

  log.appendChild(clone);

  // This keeps the log div scrolled to bottom
  log.scrollTop = log.scrollHeight;
};

const makeComments = (action) => {
  if (action >= 14) {
    comment.innerHTML = "Very nice !";
  } else if (action < 14 && action > 7) {
    comment.innerHTML = "You can do better";
  } else if (action < 7) {
    comment.innerHTML = "This is very bad";
  }
};

const getPercentage = () => {
  return (random = Math.floor(Math.random() * 100) + 1);
};

const makeDamage = (playerAttacking, playerAttacked) => {
  let damagePoints = characters[playerAttacking].damage();

  if (characters[playerAttacked].race === "Human") {
    if (getPercentage() <= 20) {
      damagePoints = damagePoints - (damagePoints / 100) * 20;
      addLog(characters[playerAttacking].name, "reduced the attack");
    }
  }

  if (characters[playerAttacked].race === "Elf" && getPercentage() <= 30) {
    characters[playerAttacking].currenthealth =
      characters[playerAttacking].currenthealth - damagePoints / 2;
    healthBar[
      playerAttacking
    ].style.width = `${characters[playerAttacking].currenthealth}%`;
    addLog(characters[playerAttacking].name, "had his attack reversed on him");
    isPlayerOneDead();
    isPlayerOneDead();
  } else {
    if (characters[playerAttacking].race === "Vampire") {
      characters[playerAttacked].currenthealth =
        characters[playerAttacked].currenthealth -
        (characters[playerAttacked].currenthealth / 100) * 10;
      characters[playerAttacking].currenthealth =
        characters[playerAttacking].currenthealth +
        (characters[playerAttacked].currenthealth / 100) * 10;
      healthBar[
        playerAttacking
      ].style.width = `${characters[playerAttacking].currenthealth}%`;
      addLog(characters[playerAttacking].name, "stole blood from his opponent");

      if (characters[playerAttacking].currenthealth >= 100) {
        characters[playerAttacking].currenthealth = 100;
      }
      healthBar[
        playerAttacking
      ].style.width = `${characters[playerAttacking].currenthealth}%`;
    }
    characters[playerAttacked].currenthealth =
      characters[playerAttacked].currenthealth - damagePoints;
    healthBar[
      playerAttacked
    ].style.width = `${characters[playerAttacked].currenthealth}%`;
    addLog(characters[playerAttacking].name, "threw an attack");
  }

  makeComments(damagePoints);
};

const isPlayerOneDead = () => {
  if (characters[0].currenthealth <= 0) {
    healthBar[0].style.width = "0%";
    action.forEach((el) => (el.style.visibility = "hidden"));
    victoryScreen.querySelector("h2").innerHTML = `The player 2 wins`;
    visual[0].src = `./img/${characters[0].race}_Death.gif`;

    setTimeout(() => {
      player1Box.style.backgroundColor = "red";
      player2Box.style.backgroundColor = "green";
      victoryScreen.style.visibility = "visible";
    }, 5000);
  } else {
    changePlayer(currentPlayer);
  }
};

const isPlayerTwoDead = () => {
  if (characters[1].currenthealth <= 0) {
    healthBar[1].style.width = "0%";
    action.forEach((el) => (el.style.visibility = "hidden"));
    victoryScreen.querySelector("h2").innerHTML = `The player 1 wins`;
    visual[1].src = `./img/${characters[1].race}_Death.gif`;

    setTimeout(() => {
      player2Box.style.backgroundColor = "red";
      player1Box.style.backgroundColor = "green";
      victoryScreen.style.visibility = "visible";
    }, 3000);
  } else {
    changePlayer(currentPlayer);
  }
};

const typeWriter = (target) => {
    target.innerHTML = target.textContent.replace(/\S/g, "<span class='letters'>$&</span>")

    let element = document.querySelectorAll(".letters")
    
    element.forEach(el => el.style.opacity ='0')


    for(let i=0; i<element.length;i++){
        setTimeout(function(){
            element[i].style.opacity = '1'
        } , 150 * i)

    }
}

// I Create the characters when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
  // I Display the form to create a character
  createCharacter(currentPlayer);
});

// When I submit the character I check if everything is filled. If not I put the borders in red.
submitChar.addEventListener("click", function () {
  if (nameInput.value && raceInput.value && itemInput.value) {
    characters[currentPlayer] = new Person(
      nameInput.value,
      raceInput.value,
      itemInput.value
    );

    names[currentPlayer].innerHTML = characters[currentPlayer].name;

    races[currentPlayer].innerHTML = characters[currentPlayer].race;

    items[currentPlayer].innerHTML = characters[currentPlayer].item;

    visual[
      currentPlayer
    ].src = `../img/${characters[currentPlayer].race}_Idle.gif`;

    modalCreate.style.visibility = "hidden";
    resetInputs();

    if (currentPlayer === 0) {
      currentPlayer = players[1];
      createCharacter(currentPlayer);
    } else {
      // I set the player to the first
      currentPlayer = players[0];
      // I display the log box
      log.style.visibility = "visible";
      comment.style.visibility = "visible";
      playersGame.style.visibility = "visible";

      // Generate random arena
      let rnd = Math.floor(Math.random() * 6) + 1;
      document.body.style.background = `url(./img/background/bg_${rnd}.jpg)`;
      console.log(rnd)

      // DIalogBox effect and disappear
      characters.forEach((el, index) => {
        dialogBox[index].querySelector("p").innerHTML = el.displayChar()
        typeWriter(dialogBox[index].querySelector("p"))
      })

      setTimeout(() => {
        dialogBox.forEach(el => el.style.visibility = "hidden")
      }, 15000);


    }
  } else {
    if (!nameInput.value) {
      nameInput.style.borderColor = "red";
    }
    if (!raceInput.value) {
      raceInput.style.borderColor = "red";
    }
    if (!itemInput.value) {
      itemInput.style.borderColor = "red";
    }
    if (nameInput.value) {
      nameInput.style.borderColor = "green";
    }
    if (raceInput.value) {
      raceInput.style.borderColor = "green";
    }
    if (itemInput.value) {
      itemInput.style.borderColor = "green";
    }
  }
});

//Actions events

//HIT

hit.forEach((el, index) =>
  el.addEventListener("click", function () {
    if (currentPlayer === 0 && index == 0) {
      if (characters[1].item === "Boots") {
        if (getPercentage() <= 30) {
          addLog(characters[1].name, "dodged the attack");
          changePlayer(currentPlayer);
        } else {
          makeDamage(0, 1);
          isPlayerTwoDead();
        }
      } else {
        makeDamage(0, 1);
        isPlayerTwoDead();
      }
    } else if (currentPlayer === 1 && index == 1) {
      if (characters[0].item === "Boots") {
        if (getPercentage() <= 30) {
          addLog(characters[0].name, "dodged the attack");
          changePlayer(currentPlayer);
        } else {
          makeDamage(1, 0);
          isPlayerOneDead();
        }
      } else {
        makeDamage(1, 0);
        isPlayerOneDead();
      }
    }
  })
);

//HEAL

heal.forEach((el, index) =>
  el.addEventListener("click", function () {
    if (currentPlayer === 0 && index == 0) {
      let healPoints = characters[0].heal();
      healthBar[0].style.width = `${characters[0].currenthealth}%`;
      addLog(characters[0].name, "healed");
      makeComments(healPoints);

      changePlayer(currentPlayer);
    } else if (currentPlayer === 1 && index == 1) {
      let healPoints = characters[1].heal();
      healthBar[1].style.width = `${characters[1].currenthealth}%`;
      addLog(characters[1].name, "healed");
      makeComments(healPoints);

      changePlayer(currentPlayer);
    }
  })
);

restart.addEventListener("click", function () {
  document.location.reload();
});

yield.forEach((el, index) => {
  el.addEventListener("click", function () {
    if (currentPlayer === 0 && index == 0) {
      characters[0].currenthealth = 0;
      isPlayerOneDead();
      addLog(characters[0].name, "gave up");
    } else if (currentPlayer === 1 && index == 1) {
      characters[1].currenthealth = 0;
      isPlayerTwoDead();
      addLog(characters[1].name, "gave up");
    }
  });
});
