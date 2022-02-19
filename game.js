
//Pokercard only show when something in the logic breaks and Spade is the first suit.
let Dealercardsinfo = document.getElementById("Dealercardsinfo");
let Playercardsinfo = document.getElementById("Playercardsinfo");
let Dealerstatus = document.getElementById("Dealerstatus");
let Gamestatus = document.getElementById("Gamestatus");
let hitbutton = document.getElementById("hit");
let staybutton = document.getElementById("stay");
let pcardspic = document.querySelectorAll(".pcardspic")
let dcardspic = document.querySelectorAll(".dcardspic")
let suitTop = document.querySelectorAll(".suit-top")
let suitBottom = document.querySelectorAll(".suit-bottom")
let cardValue = document.querySelectorAll("card-value")
let gameoverbutton = document.getElementById("gameover")
const playerCards = [];
const dealerCards = [];
let playerTotal = 0;
let dealerTotal = 0;
let dealerCardIndex = 0;
let playerCardIndex = 0;
let gameover = false

gameoverbutton.style.display = "none";



const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']
let deck = createDeck()


function createDeck() {
  let deck = []
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
      let card = {
        suit: suits[suitIdx],
        value: values[valueIdx]
      }
      deck.push(card);
    }
  }
  return deck;
}

function defineNum(card) {
  switch (card.value) {
    case 'A':
      return 1;
    case 'K':
      return 13;
    case 'Q':
      return 12;
    case 'J':
      return 11;
    default:
      return parseInt(card.value, 10);
  }

}


function getcardstring(tmp) {
  return tmp.suit + tmp.value;
}

function ShowPoker(card, index, actor) {
  const cardDom = document.querySelectorAll(actor)[index];
  cardDom.querySelector('.card-value').innerText = card.value
  cardDom.querySelector('.suit-top').innerHTML = `<img src="images/${card.suit}.png"  alt="${card.suit}">`
  cardDom.querySelector('.suit-bottom').innerHTML = `<img src="images/${card.suit}.png" alt="${card.suit}">`
  cardDom.style.display = 'flex';
}

function DrawNewDeckcards() {
  for (dealerCardIndex = 0; dealerCardIndex < 2; dealerCardIndex++) {
    let suit = 1 + Math.trunc(Math.random() * deck.length)
    let card = deck[suit]
    dealerCards.push(getcardstring(card))

    dealerTotal += defineNum(card);
    ShowPoker(card, dealerCardIndex, '.dcardspic')
  }

  for (playerCardIndex = 0; playerCardIndex < 2; playerCardIndex++) {
    let suit = 1 + Math.trunc(Math.random() * deck.length)
    let card = deck[suit]

    playerCards.push(getcardstring(card))
    playerTotal += defineNum(card);
    ShowPoker(card, playerCardIndex, '.pcardspic')
  }
}



function Newgamedeck() {
  DrawNewDeckcards()

  Playercardsinfo.innerHTML = `<p id="Playercardsinfo">Player Cards: ${playerCards} -- Total: ${playerTotal}<p>`

  checkgamestatus();

}

function buttonChange() {
  hitbutton.style.display = "none"
  staybutton.style.display = "none";
  gameoverbutton.style.display = "inline"

}

function checkgamestatus() {
  if (playerTotal == 21) {
    gameover = true
    console.log("You Win!")
    Gamestatus.innerText = "You Win!";
    buttonChange()

  } else if (dealerTotal == 21) {
    gameover = true
    console.log("Dealer Win!")
    Gamestatus.innerText = "Dealer Win!";
    buttonChange()

  } else if (dealerTotal > 21) {
    gameover = true
    console.log("You Win!")
    Gamestatus.innerText = "You Win!";
    buttonChange()
  } else if (playerTotal > 21) {
    gameover = true
    console.log("Dealer Win!")
    Gamestatus.innerText = "Dealer Win!";
    buttonChange()
  } else {
    gameover = false
    console.log("Game Continues");
  }

}

function callEndgame() {
  if (playerTotal > dealerTotal <= 21) {
    gameover = true
    Gamestatus.innerText = "Dealer Win!";
    console.log('playercardstotal>dealercardstotal<=21')
    buttonChange()
    //calculation breaks when dealer chose hit first and then stay, no matter the result it will show Dealer win
  } else if (dealerTotal == playerTotal) {
    gameover = true
    Gamestatus.innerText = "Tie";
    buttonChange()
  } else if (dealerTotal > playerTotal <= 21) {
    gameover = true
    Gamestatus.innerText = "You Win!";
    buttonChange()
  }
  else {
    gameover = true
    Gamestatus.innerText = "You Win!";
    buttonChange()
  }

}
function DealerGetNewCards() {
  if (dealerTotal <= 15) {
    let Dcard = 1 + Math.trunc(Math.random() * deck.length);
    let tmp = deck[Dcard]
    dealerCards.push(getcardstring(tmp));
    dealerTotal += defineNum(tmp);
    ShowPoker(tmp, dealerCardIndex, '.dcardspic');
    dcardspic[dealerCardIndex].style.display = 'flex';
    dealerCardIndex++;

    Dealerstatus.innerText = "Dealer chose Hit"
  } else {
    Dealerstatus.innerText = "Dealer chose Stay"
  }
}

hitbutton.addEventListener('click', function () {
  let Pcard = 1 + Math.trunc(Math.random() * deck.length);
  let tmp = deck[Pcard]
  playerCards.push(getcardstring(tmp));
  playerTotal += defineNum(tmp);
  ShowPoker(tmp, playerCardIndex, '.pcardspic')
  pcardspic[playerCardIndex].style.display = 'flex';
  playerCardIndex++;
  Playercardsinfo.innerHTML = `<p id="Playercardsinfo">Player Cards: ${playerCards} -- Total: ${playerTotal}<p>`
  DealerGetNewCards()
  checkgamestatus()
});

staybutton.addEventListener('click', function () {
  DealerGetNewCards()
  if (Dealerstatus.innerText = 'Dealer chose Stay') {
    callEndgame()

  } else {
    checkgamestatus()
  }

})

function BacktoGamestart() {
  const url = window.location.href.replace("game.html", "gamestart.html");
  window.location.href = url;
};

window.onload = Newgamedeck;
