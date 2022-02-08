window.addEventListener('load', () =>{  
  const rockBtn = document.querySelector('#rock');
  const paperBtn = document.querySelector('#paper');
  const scissorsBtn = document.querySelector('#scissors');
  const titleResult = document.querySelector('#title-result');
  const userImg = document.querySelector('#user-img');
  const machineImg = document.querySelector('#machine-img');
  const msgPlayer = document.querySelector('#msgPlayer');
  const scorePlayer = document.querySelector('#scorePlayer');
  const scoreMachine = document.querySelector('#scoreMachine');
  const resetBtn = document.querySelector('#reset');
  
  const rock = 'rock';
  const paper = 'paper';
  const scissors = 'scissors';
  
  const tie = 0;
  const win = 1;
  const lose = -1;

  let pointsPlayer = 0;
  let pointsMachine = 0;


  if(sessionStorage.getItem('namePlayer') == null){
    // const namePlayer = sessionStorage.getItem('namePlayer');
    Swal.fire({
      title: 'Quieres elegir un nombre?',
      input: 'text',
      showCancelButton: true,
    })
    .then(nameResult => {
      if(nameResult.value){
        const player = nameResult.value
        sessionStorage.setItem('namePlayer', player);
        location.reload();
      }
    })
  }

  // console.log(sessionStorage.getItem('namePlayer'));

 
  if(sessionStorage.getItem('namePlayer')){
    const namePlayer = sessionStorage.getItem('namePlayer');
    msgPlayer.innerHTML = `Hola ${namePlayer} elige una opcion para empezar`
  }


  rockBtn.addEventListener('click', () => {
    play(rock);
  });
  
  paperBtn.addEventListener('click', () => {
    play(paper);
  });
  
  scissorsBtn.addEventListener('click', () => {
    play(scissors);
  });

  resetBtn.addEventListener('click', () => {
    location.reload();
  })
  
  
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
          titleResult.innerHTML = 'Ganaste !';
          break;
        case lose:
          titleResult.innerHTML = 'Perdiste !';
          break;
        case tie:
          titleResult.innerHTML = 'Empate !';
          break;  
      }
  
      score(result);
  
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
  
  
  function score(result){
    const namePlayer = sessionStorage.getItem('namePlayer');
      
    switch (result){
      case 0:     
        scoreMachine.innerHTML = `Machine Score: ${pointsMachine}`
        scorePlayer.innerHTML = `${namePlayer ? namePlayer : 'Tu ' } Score: ${pointsPlayer}`;
        break;
      case 1:
        scoreMachine.innerHTML = `Machine Score: ${--pointsMachine}`;
        scorePlayer.innerHTML = `Score: ${++pointsPlayer}`;
        break;
      case -1:
        scoreMachine.innerHTML = `Machine Score: ${++pointsMachine}`;
        scorePlayer.innerHTML = `Score: ${--pointsPlayer}`;
        break;
    }
  } 
  
})
