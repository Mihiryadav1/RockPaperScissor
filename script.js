const closebtn = document.querySelector(".close-btn");
const openbtn = document.querySelector(".open-btn");
const nextbtn = document.querySelector(".next-btn");
const rulescontainer = document.querySelector(".rules-container");
const rock = document.querySelector(".rock");
const paper = document.querySelector(".paper");
const scissor = document.querySelector(".scissor");
const gamewrapper = document.querySelector(".game-wrapper");
const resultPage = document.querySelector(".result-wrapper");
const userScoreDiv = document.querySelector("#user-score");
const computerScoreDiv = document.querySelector("#computer-score");
const selectedcircles = document.querySelectorAll(".selectedcircles");
const computedCircles = document.querySelectorAll(".computedCircles");
let selectedImg = document.querySelector("#selectedImg");
let computedImg = document.querySelector("#computedImg");
let message = document.querySelector("#message-1");
let message2 = document.querySelector("#message-2");
let userScore = parseInt(localStorage.getItem("User Score")) || 0;
let computerScore = parseInt(localStorage.getItem("Computer Score")) || 0;

let winner = null;
let userSelection = null;
let computerSelection = null;
let min = 0;
let max = 2;
const selectOptions = ["rock", "paper", "scissor"];
const violet = "#ae5df6";
const yellow = "#FFD600";
const blue = "#0a4a8e";

function updateUserScore() {
  winner = "User";
  userScore++;
  window.localStorage.setItem("User Score", userScore);
  userScoreDiv.innerText = userScore;
  message.innerText = "You Win";
  nextbtn.style.display = "block";
  selectedcircles.forEach((item) => {
    item.classList.add("scaleAnimate");
  });
}

function updateComputerScore() {
  winner = "Computer";
  computerScore++;
  nextbtn.style.display = "none";
  window.localStorage.setItem("Computer Score", computerScore);
  computerScoreDiv.innerText = computerScore;
  message.innerText = "You Lost";

  computedCircles.forEach((item) => {
    item.classList.add("scaleAnimate");
  });
}

function reloadScreen() {
  location.reload();
}

function decideWinner(e) {
  userSelection = e.target.name;

  if (userSelection) {
    //Random Computer Selection
    const randomNum = Math.floor(Math.random() * (max - min + 1));
    computerSelection = selectOptions[randomNum];

    if (userSelection === "scissor" && computerSelection === "paper") {
      updateUserScore();
      selectedImg.parentNode.style.border = `20px solid ${violet}`;
      computedImg.parentNode.style.border = `20px solid ${yellow}`;
    } else if (userSelection === "rock" && computerSelection === "scissor") {
      updateUserScore();
      selectedImg.parentNode.style.border = `20px solid ${blue}`;
      computedImg.parentNode.style.border = `20px solid ${violet}`;
    } else if (userSelection === "rock" && computerSelection === "paper") {
      updateComputerScore();
      selectedImg.parentNode.style.border = `20px solid ${blue}`;
      computedImg.parentNode.style.border = `20px solid ${yellow}`;
    } else if (userSelection === "paper" && computerSelection === "rock") {
      updateUserScore();
      selectedImg.parentNode.style.border = `20px solid ${yellow}`;
      computedImg.parentNode.style.border = `20px solid ${blue}`;
    } else if (userSelection === "paper" && computerSelection === "scissor") {
      updateComputerScore();
      selectedImg.parentNode.style.border = `20px solid ${yellow}`;
      computedImg.parentNode.style.border = `20px solid ${violet}`;
    } else if (userSelection === "scissor" && computerSelection === "rock") {
      updateComputerScore();
      selectedImg.parentNode.style.border = `20px solid ${violet}`;
      computedImg.parentNode.style.border = `20px solid ${blue}`;
    } else if (userSelection === "scissor" && computerSelection === "paper") {
      updateUserScore();
      selectedImg.parentNode.style.border = `20px solid ${violet}`;
      computedImg.parentNode.style.border = `20px solid ${yellow}`;
    } else {
      winner = "TIE";
      message.innerText = "TIE UP";
      message2.style.display = "none";
      selectedImg.parentNode.style.border = `20px solid ${blue}`;
      computedImg.parentNode.style.border = `20px solid ${blue}`;
    }
    console.log(`Computer Selection : ${computerSelection}`);
    console.log(`User Selection : ${userSelection}`);
    console.log(`Winner : ${winner}`);

    setTimeout(() => {
      resultPage.style.display = "block";
      gamewrapper.style.display = "none";
      nextbtn.parentNode.style.display = "flex";
      nextbtn.parentNode.style.justifyContent = "flex-end";
      selectedImg.setAttribute("src", `${userSelection}.png`);
      computedImg.setAttribute("src", `${computerSelection}.png`);
    }, 10);
  } else {
    alert("Make Valid Selection!");
  }
}

//rules popup handler
closebtn.addEventListener("click", () => rulescontainer.classList.add("close"));
openbtn.addEventListener("click", () =>
  rulescontainer.classList.remove("close")
);

//event for opening rules dialogue box on first load
window.addEventListener("load", () => {
  userScoreDiv.innerText = userScore;
  computerScoreDiv.innerText = computerScore;
  setTimeout(() => closebtn.click(), 1000);
});
