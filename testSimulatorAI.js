/**
 * @Author HyGlobalHD
 * @Github https://github.com/HyGlobalHD
 * 
 * Still in development and planning
 * 
 * 2 dimension array
 */


// common characteristics of an animal
// can view/see length and width of view
// can touch and smell
// can taste
// foodtype : plants,meat // omni, herbi , carni
// hunger , thirst
// movement speed
// sleep tiredness
// health
// sickness
// attack
// size
// personality
let def_Animal = {
    view: true,
    viewFOV: 5,
    touch: true,
    touchSense: 5,
    smell: true,
    smellSense: 5,
    taste: true,
    tasteSense: 5,
    foodType: "omni",
    hunger: false,
    hungerLimit: 5,
    thirst: false,
    thirstLimit: 5,
    movement: true,
    movementSpeed: 5,
    sleep: false,
    tiredness: 5,
    health: 5,
    sickness: false,
    attack: false,
    size: "normal",
    personality: "curious"
};

let def_MAP = {
    /**
     * @TODO
     * list the item that would be use to make terrain
     * for now there isn't any use of this yet.
     */
    grass: "G",
    tree: "T",
    water: "W"
}

function spawnEntityRandom(entityData, map) { /** Spawn an entity to a random location on the specific map */
    // TODO entityData
    // calc grass pos (x,y)
    let animal = "A";
    let gArr = [];
    let item = "G";
    let index = 0;
    for(let i = 0; i < map.length; i++) {
        for(let j = 0; j < map[i].length; j++) {
            if(map[i][j] === item) {
                gArr[index] = i + ";" + j;
                index++;
            }
        }
    }

    let randPos = randomArray(gArr).split(";");
    let x = randPos[0];
    let y = randPos[1];
    
    map[x][y] = animal;

    return map;

}

function randomSelection(maxNum) {
    let randNum = Math.floor(Math.random() * maxNum);
    return randNum;
}

function randomArray(dataArr) {
    let i = randomSelection(dataArr.length);
    return dataArr[i];
}

// G = grass, T = tree, W = water
function generateTerrain(terrainL, terrainW) {
    // using 2 dimensional algorithms
    /**
     * before:
     * terrainL * terrainW
     * [][] L
     * [][] L
     *  W W
     * 
     * target after example:
     * [G][T]
     * [W][G]
     * note: not all output will be the same as it is randomise
     */
    //slet sizeTerrain = terrainL * terrainW;
    let itemT = ["G", "T", "W"];
    //let grass = "G";
    //let tree = "T";
    //let water = "W";
    let terrainArr = [];

    // creating array
    for(let i = 0; i < terrainL; i++) {
        for(let j = 0; j < terrainW; j++) {
            terrainArr[i] = [];
        }
    }

    // inserting random item to terrainArr
    for(let i = 0; i < terrainL; i++) {
        for(let j = 0; j < terrainW; j++) {
            terrainArr[i][j] = randomArray(itemT);
        }
    }

    return terrainArr;
    //console.log(terrainArr);
}

function calcPercMap(map, item) { // only allow 2 dimension array
    // calculate the percentage of an item in an array
    // eg: item = "W" || "T" || "G"
    let totalSize = 0;
    let perc = 0;
    let itemFound = 0;
    for(let i = 0; i < map.length; i++) {
        for(let j = 0; j < map[i].length; j++) {
            // TODO map[i][j]
            totalSize++;
            if(map[i][j] === item) {
                itemFound++;
            }
        }
    }
    perc = (itemFound / totalSize) * 100;
    return perc;
}

//generateTerrain(2,2);

let exMap = generateTerrain(20, 20);
console.log(exMap);
let percW = calcPercMap(exMap, "W");
let percT = calcPercMap(exMap, "T");
let percG = calcPercMap(exMap, "G");
console.log("W = " + percW + " %");
console.log("T = " + percT + " %");
console.log("G = " + percG + " %");


console.log("New Map After Spawn: ")
let spawnNewMap = spawnEntityRandom("", exMap);
console.log(spawnNewMap);
let percA = calcPercMap(spawnNewMap, "A");
percW = calcPercMap(spawnNewMap, "W");
percT = calcPercMap(spawnNewMap, "T");
percG = calcPercMap(spawnNewMap, "G");
console.log("A = " + percA + " %");
console.log("W = " + percW + " %");
console.log("T = " + percT + " %");
console.log("G = " + percG + " %");


