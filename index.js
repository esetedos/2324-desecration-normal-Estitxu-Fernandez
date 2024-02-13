const getData = require('./Services/gameService')

async function startGame(){
    const data = await getData();
    // console.log(data)
   

}


startGame();
