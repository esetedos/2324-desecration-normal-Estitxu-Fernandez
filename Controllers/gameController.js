const throwDice =require('../Helpers/Dices')


async function game(data){

    //contrincantes
    const villainZarate = await getVillain(data);

    const superHero = getHero(data);

    const order = decideOrder(villainZarate, superHero);
// console.log(order)
    console.log("------------------------------")
    console.log("------------------------------")

    console.log("El primer asalto es para " + order[0].name)

    let asalto = 0;

    //turnos *******************************************
    while(order[0].hp > 0 && order[1].hp > 0){
        console.log("------------------------------");
        console.log("Comienza el asalto " + asalto);
        console.log("------------------------------");

        console.log("El asalto es para " + order[asalto % 2].name)
        
        //Tiradas ----------
        const tirada = throwDice(100, 1);

        if(tirada <= order[asalto % 2].powerstats.combat){
            //Éxito-------------
            const segundaTirada = throwDice(20, 1);
            console.log(order[asalto % 2].name + " obtiene un " + tirada + " y ataca con éxito");

            if(segundaTirada > 2){
                //Éxito certero

                const normalDamage = Math.ceil((order[asalto % 2].powerstats.power + order[asalto % 2].powerstats.strength)*segundaTirada/100);
                let oponent = 0;
                if(asalto % 2 === 0){
                    oponent = 1;
                }
                if(segundaTirada >= 18){
                    //DAÑO CRITICO
                    
                    let damage = 0;
                    let diceResult = -1;
                    switch(segundaTirada){
                        case 18:
                        case 19:
                            diceResult = throwDice(3, (segundaTirada-17))
                            damage = Math.ceil((order[asalto % 2].powerstats.intelligence*order[asalto % 2].powerstats.durability/100)*diceResult);
                            break;
                        case 20:
                            diceResult = throwDice(3, 5)
                            damage = Math.ceil((order[asalto % 2].powerstats.intelligence*order[asalto % 2].powerstats.durability/100)*diceResult);
                            break;
                    }

                    order[oponent].hp -= (damage+normalDamage);
                    
                    console.log("CRITICAL HIT !!! " + order[asalto % 2].name + " obtiene un " + segundaTirada + ", ejerce un daño de " + (damage+normalDamage) + " puntos")
                }
                else{
                    //DAÑO NORMAL
                    order[oponent].hp -= (normalDamage);

                    console.log(order[asalto % 2].name + " obtiene un " + segundaTirada + ", empuña su arma y ejerce un daño de " + (normalDamage) + " puntos")


                }


            }
            else{
                //Éxito pero mala puntería
                let failDamage = 0;
                let diceValue = 0;

                switch(segundaTirada){
                    case 1:
                        diceValue = throwDice(3, 1);
                        break;

                    case 2:
                        diceValue = throwDice(3, 4);
                        break;

                }
                failDamage = Math.ceil(order[asalto % 2].powerstats.speed/diceValue);
                order[asalto % 2].hp -= failDamage;

                console.log("FAIL !! " + order[asalto % 2].name + " obtiene un " + segundaTirada + " y se clava el arma en su pierna izq. Recibe un daño de " + failDamage);

            }


        }
        else{
            //FRACASO
            console.log(order[asalto % 2].name + " obtiene un " + tirada + " y ha fallado")
        }

        for(let i = 0; i < 2; i++){
            const character = {
                "name": order[i].name,
                "intelligence": order[i].powerstats.intelligence,
                "strength": order[i].powerstats.strength,
                "speed": order[i].powerstats.speed,
                "durability": order[i].powerstats.durability,
                "power": order[i].powerstats.power,
                "combat": order[i].powerstats.combat,
                "hp": order[i].hp
            }
            console.log(character)

        }
        






        asalto++;
    
    }

    console.log("------------------------------")
    console.log("------------------------------")

    if(order[0].hp <= 0){
        console.log(order[0].name + " ha sido derrotado.")
    }
    else{
        console.log(order[1].name + " ha sido derrotado.")

    }


}



function decideOrder(villain, hero){
    const order = [];
    const villanValue = villain.powerstats.intelligence + villain.powerstats.combat;
    const heroValue = hero.powerstats.intelligence + hero.powerstats.combat;
    if(villanValue > heroValue){
        order.push(villain);
        order.push(hero);
    }
    else{
        order.push(hero);
        order.push(villain);
    }
    return order;
}


function getVillain(data){
    const character = data.find(character => character.name === "Junkpile");
    character.hp = character["powerstats"].strength*10;
    if(character.hp > 666){
        character.hp = 666;
    }
    return character;
}

function getHero(data){
    let randomNum = Math.round(Math.random() * ((data.length) - 0) + 0);
    while(data[randomNum].name === "Junkpile"){
        randomNum = Math.round(Math.random() * ((data.length) - 0) + 0);
    }
    data[randomNum].hp = data[randomNum]["powerstats"].strength*10;
    if(data[randomNum].hp > 666){
        data[randomNum].hp = 666;
    }

    return data[randomNum];
}


module.exports = game;