let runningTotal = 0;
let buffer = "0";
let previousOpertor; 

const screen = document.querySelector('.Screen');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            runningTotal = 0;
        break;

        case '=':
            if(previousOpertor === null){
                return 
            }
            flushOpertor(parseInt(buffer));
            previousOpertor = null
            buffer = runningTotal;
            runningTotal = 0;
        break;
            
        case '←' :
          if(buffer.length ===1){
              buffer = '0';
          }else{
              buffer = buffer.substring(0, buffer.length - 1);
          }
        break;
        
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
        break;
    }
}

function handleMath(symbol){
    if (buffer ==='0'){
        return;
    }

    const intBuffer = parseInt(buffer);

    if(runningTotal === 0){
        runningTotal = intBuffer;
    }else{
        flushOpertor(intBuffer);
    }
    previousOpertor = symbol;
    buffer = '0';
}

function flushOpertor(intBuffer){
    if (previousOpertor === '+'){
        runningTotal += intBuffer;
    }else if(previousOpertor === '−'){
        runningTotal -= intBuffer;
    }else if (previousOpertor === '×'){
        runningTotal *= intBuffer;
    }else if (previousOpertor === '÷'){
        runningTotal  /= intBuffer;
    }
}


function handleNumber(numberString){
    if(buffer === '0'){
        buffer = numberString;
    }else{
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.calc-buttons').
    addEventListener('click', function(event){
      buttonClick(event.target.innerText);
    })
}

init();
