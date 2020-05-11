$(document).ready(function () {
    // Populates index field with line numbers
    let _populateIndex = function () {
        let index = [];
        for (var i = 0; i < 100; i++)
            index.push(i);
        document.getElementById("index").value = index.join("\n");
    };

    _populateIndex();
});

// Show instruction table
let OnShowInstructions = function () {
    document.getElementById("instructions").classList.toggle("hidden");
};

// Fills up Machine-based program with 0's
let OnFillupMemory = function () {
    Memory = _getProgram();
    FillupMemory();
    _setProgram(Memory);
};

// Translates Index-based to Machine-based
let OnTranslateMemory = function () {
    let program = _translateIndex(_getIndexCode());
    _setProgram(program);
};

// Startup program
let OnStartup = function () {
    _resetResult();
    _setOutputs([]);
    Inputs = _getInputs();

    if (_getProgram().length > 1) {
        Memory = _getProgram();
        _setResult("Using Machine-based code");
    } else if (_getIndexCode().length > 1) {
        Memory = _translateIndex(_getIndexCode());
        _setResult("Using Index-based code");
    }

    Startup();
};

// Clears memory
let OnClearMemory = function () {
    _setProgram([]);
    _setIndexCode([]);
    CleanMemory();
};

// Displays output - called from `core loop`
let DisplayOutput = function () {
    _setOutputs(Outputs);
    _setProgram(Memory);
};

/// Local Functions
// Machine Code
let _getProgram = function () {
    return document.getElementById("machine_code").value.split("\n")
        .map(x => Number(x));
};

let _setProgram = function (Memory) {
    document.getElementById("machine_code").value = Memory.join("\n");
};

// Index Based Code
let _getIndexCode = function () {
    return document.getElementById("index_code").value.split("\n");
};

let _setIndexCode = function (value) {
    document.getElementById("machine_code").value = value.join("\n");
};

// Inputs
let _getInputs = function () {
    return document.getElementById("inputs").value.split("\n")
        .map(x => Number(x));
};

let _setInputs = function (value) {
    document.getElementById("inputs").value = value.join("\n");
};

// Outputs
let _getOutputs = function () {
    return document.getElementById("outputs").value.split("\n")
        .map(x => Number(x));
};

let _setOutputs = function (value) {
    document.getElementById("outputs").value = value.join("\n");
};

// Push message to result
let _setResult = function (value) {
    document.getElementById("result").innerHTML += `${value}<br>`;
};

let _resetResult = function () {
    document.getElementById("result").innerHTML = "";
};