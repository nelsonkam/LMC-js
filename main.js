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
    FillupMemory();
    Accumulator = 0;
    Counter = 0;
    Outputs = [];
    Halt = false;

    Loop();
}

function Loop() {
    // Accumulator is next mailbox address
    // Mailbox address contains next instruction
    let instruction = Memory[Counter].toString();
    // Opcode: operation to perform
    let opcode = Number(instruction[0]);
    // Address: where to find the data
    let address = Number(instruction[1] + instruction[2]);
    // Prepare next instruction
    Count();
    // Executes for IN / OUT
    if (opcode == 9) Instructions[instruction]();
    // Executes for the rest
    else Instructions[opcode](address);
    // If program hasn't stopped, performs next loop
    if (!Halt) Loop();
    // On halt, logs output
    else log(Outputs);
}


// Utility functions
function log(...a) {
    console.log(arguments);
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

function Count() {
    Counter++;
    if (Counter > 999)
        err("Counter overflow");
}

function err(...a) {
    log(arguments);
    HLT();
    throw (arguments[0]);
}



// Add the value in mailbox
// to value in the accumulator
function ADD(mailbox) {
    Accumulator = Accumulator += Memory[mailbox];
    if (Accumulator > 999)
        err("ADD overflow", Accumulator, mailbox);
}

// Subtract the value in mailbox
// from value in the accumulator
function SUB(mailbox) {
    Accumulator = Accumulator -= Memory[mailbox];
    if (Accumulator < -999)
        err("SUB overflow", Accumulator, mailbox);
}

// Store the value in the accumulator
// to the mailbox address
function STO(mailbox) {
    Memory[mailbox] = Accumulator;
}

// Load value from mailbox
// to accumulator
function LDA(mailbox) {
    Accumulator = Memory[mailbox];
}

// Branch for next instruction
function BRA(mailbox) {
    Counter = mailbox;
}

// If accumulator is <= 0
// Branch for next instruction
function BRZ(mailbox) {
    if (Accumulator <= 0)
        Counter = mailbox;
}

// If accumulator is > 0
// Branch for next instruction
function BRP(mailbox) {
    if (Accumulator > 0)
        Counter = mailbox;
}

// Fetch first value in Inputs
// to the accumulator
function IN() {
    Accumulator = Inputs.shift();
}

// Concat value in accumulator
// to output
function OUT() {
    Outputs.push(Accumulator);
}

// Halt the program
function HLT() {
    Halt = true;
}