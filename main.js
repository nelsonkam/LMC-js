// Variables
const Instructions = {
    1: ADD,
    2: SUB,
    3: STO,
    5: LDA,
    6: BRA,
    7: BRZ,
    8: BRP,
    901: IN,
    902: OUT,
    0: HLT
};

let Memory = [];
let Accumulator = 0;
let Counter = 0;
let Inputs = [];
let Outputs = [];
let Halt = true;


// Main Loop
function Startup() {
    // Cleanup and variable prepare
    FillupMemory();
    Accumulator = 0;
    Counter = 0;
    Outputs = [];
    Halt = false;
    // Translates Memory
    Translate(Memory);
    // Start Main Loop
    _loop();
}

function _loop() {
    // Accumulator is next mailbox address
    // Mailbox address contains next instruction
    let instruction = Memory[Counter].toString();
    // Opcode: operation to perform
    let opcode = Number(instruction[0]);
    // Address: where to find the data
    let address = Number(instruction[1] + instruction[2]);
    // Prepare next instruction
    _count();
    // Executes for IN / OUT
    if (opcode == 9) Instructions[instruction]();
    // Executes for the rest
    else Instructions[opcode](address);
    // If program hasn't stopped, performs next loop
    if (!Halt) _loop();
    // On halt, logs output
    else _log(Outputs, Inputs);
}


// Utility functions
function _log(...a) {
    console._log(arguments);
}

function CleanMemory() {
    for (let i = 0; i < 100; i++)
        Memory[i] = 0;
}

function FillupMemory() {
    for (let i = 0; i < 100; i++)
        if (!Memory[i])
            Memory[i] = 0;
}

function _count() {
    Counter++;
    if (Counter > 999)
        _err("Counter overflow");
}

function _err(...a) {
    _log(arguments);
    HLT();
    throw (arguments[0]);
}