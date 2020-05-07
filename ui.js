$(document).ready(function () {
    populateForm();

    function populateForm() {
        for (let i = 0; i < Settings.MemoryLength; i++) {
            writeSingleRow(i);
        }
    }

    function writeSingleRow(id) {
        document.getElementById("instructionset").innerHTML += `
            <label for="${id}-name">${id}</label>
            <input type="text" id="${id}" name="${id}-name"> <br>
        `;
    }

});

function OnStartup() {
    let Memory = [];
    for (let i = 0; i < Settings.MemoryLength; i++)
        Memory.push(Number(document.getElementById(i).value));

    Startup(Memory);
}

function DisplayOutput() {
    document.getElementById("outputs").value = "";
    for (let o = 0; o < Outputs.length; o++)
        document.getElementById("outputs").value += Outputs[o] + " ";
}