/**
 * @author HyGlobalHD
 * @github https://github.com/hyglobalhd
 * 
 */
// formula: totalSaving * p.a% * 365 = returns

function calcReturnsPD(totalSaving, pa) {
    return ((totalSaving * (pa / 100)) / 365);
}

function calcReturnsPDS(totalSaving, pa) {
    return (totalSaving + ((totalSaving * (pa / 100)) / 365));
}


function calcReturnsPM(totalSaving, pa) {
    return (calcReturnsPD(totalSaving, pa) * 30);
}

function calcReturnsPMS(totalSaving, pa) {
    return (totalSaving + (calcReturnsPD(totalSaving, pa) * 30));
}

function calcYearReturns(currTotal, monthlyInput, year, pa) {
    let m = 0;
    let total = currTotal;
    for(let i = 0; i < (12*year); i++) {
        m++;
        total += monthlyInput;
        total += calcReturnsPM(total, pa);
    }
    return total;
}

function displayO() {
    let currSavings = document.getElementById("currSavings");
    let currPA = document.getElementById("currPA");
    let monthlyInput = document.getElementById("monthlyInput");
    let howManyYear = document.getElementById("howManyYear");

    let outputPD = document.getElementById("outputPD");
    let outputPM = document.getElementById("outputPM");
    let outputYS = document.getElementById("outputYS");
    let outputYSN = document.getElementById("outputYSN");

    
    let pds = calcReturnsPDS(Number(currSavings.value), Number(currPA.value));
    let pms = calcReturnsPMS(Number(currSavings.value), Number(currPA.value));
    let pys = calcYearReturns(Number(currSavings.value), Number(monthlyInput.value), Number(howManyYear.value), Number(currPA.value));

    outputPD.value = pds;
    outputPM.value = pms;
    outputYS.value = pys;

    let yns = (Number(monthlyInput.value)*Number(howManyYear.value)*12); 
    outputYSN.value = yns;

    console.log("TEST");
}