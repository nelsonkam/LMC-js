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