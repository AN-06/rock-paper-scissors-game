let userMove='';
let computerMove='';
let result='';
const game=JSON.parse(localStorage.getItem('game'))||{
    win:0,
    lose:0,
    tie:0,
}
const gameHistory=JSON.parse(localStorage.getItem('gameHistory'))||[];
renderGameSummary();
renderGameHistory();





function generateComputerMove(){ 

    const randNum=Math.random();
    if(randNum<1/3){
        computerMove='Rock';
    }
    else if(randNum<2/3){
        computerMove='Paper';
    }
    else{
        computerMove='Scissors';
    }

}
function evaluateMoves(userMove,computerMove){
    if(userMove === computerMove)
    {
        result='Tie';
        game.tie+=1;
    }
    else if((userMove==='Paper' && computerMove==='Rock') || (userMove==='Scissors' && computerMove==='Paper')||(userMove==='Rock' && computerMove==='Scissors'))
    {
        result='Win';
        game.win+=1;
    }
    else{
        result='Lose';
        game.lose+=1;
    }
    gameHistory.push({
        userMove: userMove,
        computerMove:computerMove,
        result:result
    });


localStorage.setItem('game',JSON.stringify(game));
localStorage.setItem('gameHistory',JSON.stringify(gameHistory)); //important--local storage
}

function renderGameSummary(){
    document.getElementById('wins').innerHTML=game.win;
    document.getElementById('loses').innerHTML=game.lose;
    document.querySelector('#ties').innerHTML=game.tie;
    document.getElementById('games').innerHTML=game.win+game.lose+game.tie;
}

function renderGameHistory(){
    let gameHistoryHTML = `<tr>
    <th>#</th>
    <th>User Move</th>
    <th>Computer Move</th>
    <th>Result</th>

    </tr>`;
    for(let i=0;i<gameHistory.length;i++){
        const gameItem=gameHistory[i];
        gameHistoryHTML+=
        `<tr>
            <td>${i+1}</td>
            <td>${gameItem.userMove}</td>
            <td>${gameItem.computerMove}</td>
            <td>${gameItem.result}</td>
            
        </tr>`
    }
    document.getElementById('gameHistory').innerHTML=gameHistoryHTML;


}

function resetGame() {
    
    game.win = 0;
    game.lose = 0;
    game.tie = 0;
    
    
    gameHistory.length = 0; // This will clear the array without reassigning it
    
    // Update local storage to reflect the reset state
    localStorage.setItem('game', JSON.stringify(game));
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
    
    // Re-render the game summary and history to reflect the reset
    renderGameSummary();
    renderGameHistory();
}

