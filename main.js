// Settings
const Settings = {
    // Allows negative numbers
    AllowNegative: false,

    // ture => Throws error if ADD or SUB overflows
    // false => Loops back to 000 (non-standard)
    ErrOverflow: true,

    // Size limit of each Memory unit (in digits)
    // @warning: changing this might cause Memory loss, if data gets used as instruction
    // Standard: 3
    MemorySize: 3,
    // Memory limit Length
    // Standard: 100 (0 index)
    MemoryLength: 100,
    // @dev Validates Memory relationship.
    // Tail of mailboxes refer to memory addresses, therefore this relationship must hold
    MemoryValidate: () => {
        if (10 ** Settings.MemorySize != 10 * Settings.MemoryLength)
            throw ("Settings error. Please check MemorySize and MemoryLength");
    },

    // BRZ: Breake if Zero
    // BRN: Break if Zero or Negative (standard)
    // Manages BRZ behaviour
    BRN: false
};

// Instructions and data are saved in Memory
let Memory = [];
// Negative Flag boolean map witht the form
// address (int): isNegative (ture)
let NegativeFlags = {};
// Working bench
let Accumulator = 0;
// Next instruction address
let Counter = 0;
// Array of input values. Read left to right
let Inputs = [];
// Array of output values. Output order left to right.
let Outputs = [];
// Halt the core Loop
let Halt = true;


// Starting point
// @param optional Memory
function Startup(_memory) {
    // Cleanup and variable prepare
    FillupMemory();
    Accumulator = 0;
    Counter = 0;
    Outputs = [];
    Halt = false;
    _emptyNegatives();
    Settings.MemoryValidate();
    // Checks for memory param
    Memory = _memory ?
        // Translates Memory
        Translate(_memory) :
        Translate(Memory);

    // Start Main Loop
    _loop();
}

// Core loop
function _loop() {
    // Accumulator is next mailbox address
    // Mailbox address contains next instruction
    let instruction = Memory[Counter].toString();
    // Opcode: operation to perform
    let opcode = Number(instruction.substring(0, 1));
    // Address: where to find the data
    let address = Number(instruction.substring(1));
    // Prepare next instruction
    _count();
    // Executes for IN / OUT
    if (opcode == 9) Instructions[instruction]();
    // Executes for the rest
    else Instructions[opcode](address);
    // If program hasn't stopped, performs next loop
    if (!Halt) _loop();
    // On halt, logs output
    else DisplayOutput();
}


// Utility functions
function _log(...a) {
    console.log(arguments);
}

// Empry Memory
function CleanMemory() {
    for (let i = 0; i < Settings.MemorySize; i++)
        Memory[i] = 0;
}

// Fills unused Memory with 0
function FillupMemory() {
    if (Memory.length > Settings.MemoryLength)
        Settings.MemoryLength = Memory.length;
    for (let i = 0; i < Settings.MemoryLength; i++)
        if (!Memory[i])
            Memory[i] = 0;
}

// Empties Negative Flag map
function _emptyNegatives() {
    NegativeFlags = {
        Accumulator: false
    };
}

function _count() {
    Counter++;
    if (Counter > Memory.length)
        _err("Counter overflow");
}

function _err(...a) {
    _log(arguments);
    HLT();
    throw (arguments[0]);
}