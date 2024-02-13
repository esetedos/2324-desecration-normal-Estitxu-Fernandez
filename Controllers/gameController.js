
async function game(data){

    //contrincantes
    const villainZarate = await getVillain(data);

    const superHero = getHero(data);
    console.log(superHero)





}


function getVillain(data){
    const character = data.find(character => character.name === "Junkpile");
    character.hp = character["powerstats"].strength*10;
    return character;
}

function getHero(data){
    let randomNum = Math.round(Math.random() * ((data.length) - 0) + 0);
    while(data[randomNum].name === "Junkpile"){
        randomNum = Math.round(Math.random() * ((data.length) - 0) + 0);
    }
    data[randomNum].hp = data[randomNum]["powerstats"].strength*10;


    return data[randomNum];
}


module.exports = game;