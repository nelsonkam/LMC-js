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

// Add the value in mailbox
// to value in the accumulator
function ADD(mailbox) {
    Accumulator += Memory[mailbox];

    _manageOverflow(mailbox);
}

// Subtract the value in mailbox
// from value in the accumulator
function SUB(mailbox) {
    Accumulator -= Memory[mailbox];

    if (Accumulator < 0)
        _err("Negative numbers not allowed");

    _manageOverflow(mailbox);
}

// Manages overflow depending on settings
function _manageOverflow(mailbox) {
    if (Math.abs(Accumulator) > 10 ** Settings.MemorySize)
        if (Settings.ErrOverflow)
            _err("Overflow", Accumulator, mailbox);
        else
            // Loops back to 0 after the max memory size, using mod
            Accumulator = Accumulator % (10 ** Settings.MemorySize);
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

// If accumulator is == 0
// Branch for next instruction
function BRZ(mailbox) {
    if (Accumulator == 0)
        Counter = mailbox;
}

// If accumulator is > 0
// Branch for next instruction
function BRP(mailbox) {
    if (Accumulator != 0)
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