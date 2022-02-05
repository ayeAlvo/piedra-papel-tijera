const rock = 'rock';
const paper = 'paper';
const scissors = 'scissors';

const tie = 0;
const win = 1;
const lose = 2;

const rockBtn = document.querySelector('#rock');
const paperBtn = document.querySelector('#paper');
const scissorsBtn = document.querySelector('#scissors');
const titleResult = document.querySelector('#title-result');
const userImg = document.querySelector('#user-img');
const machineImg = document.querySelector('#machine-img');


rockBtn.addEventListener('click', () => {
  play(rock);
});

paperBtn.addEventListener('click', () => {
  play(paper);
});

scissorsBtn.addEventListener('click', () => {
  play(scissors);
});


function play(userOption){
  userImg.src = `img/${userOption}.svg`;

  titleResult.innerHTML = 'Eligiendo...';

  const interval = setInterval(() => {
    const machineOption = calcMachineOption();
    machineImg.src = `img/${machineOption}.svg`;
  }, 200)

  setTimeout(() => {
    clearInterval(interval);
    const machineOption = calcMachineOption();
    const result = calcResult(userOption, machineOption);
    // console.log(result);
  
    machineImg.src = `img/${machineOption}.svg`;
    
    switch (result) {
      case win:
        titleResult.innerHTML = 'Ganaste !'
        // Swal.fire('Any fool can use a computer')
        break;
      case lose:
        titleResult.innerHTML = 'Perdiste !'
        break;
      case tie:
        titleResult.innerHTML = 'Empate !'
        break;  
    }

  }, 2000);

}

function calcMachineOption(machineOption){
  const number = Math.floor(Math.random() * 3);
  switch (number){
    case 0:
      return rock;
    case 1:
      return paper;
    case 2:
      return scissors;
  }
}

function calcResult(userOption, machineOption){
  if(userOption === machineOption){
    return tie;
  }else if(userOption === rock){
    if(machineOption === paper) 
      return lose;
    if(machineOption === scissors) 
      return win;
  }else if(userOption === paper){
    if(machineOption === scissors) 
      return lose;
    if(machineOption === rock) 
      return win;
  }else if(userOption === scissors){
    if(machineOption === paper) 
      return win;
    if(machineOption === rock) 
      return lose;
  }
}

