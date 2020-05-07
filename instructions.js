// Add the value in mailbox
// to value in the accumulator
function ADD(mailbox) {
    // Adds or subtracts depending on Accumulator negative flag
    Accumulator = NegativeFlags.Accumulator ?
        Accumulator -= Memory[mailbox] :
        Accumulator += Memory[mailbox];

    if (Accumulator < 0)
        _switchAccumulatorSign();
    _manageOverflow();
}

// Subtract the value in mailbox
// from value in the accumulator
function SUB(mailbox) {
    // Adds or subtracts depending on Accumulator negative flag
    Accumulator = NegativeFlags.Accumulator ?
        Accumulator += Memory[mailbox] :
        Accumulator -= Memory[mailbox];

    if (Accumulator < 0) {
        if (!Settings.AllowNegative)
            throw ("Negative numbers not allowed");
        else
            _switchAccumulatorSign();
    }
    _manageOverflow();
}

// Manages overflow depending on settings
function _manageOverflow() {
    if (Accumulator > 10 ** Settings.MemorySize)
        if (Settings.ErrOverflow)
            err("SUB overflow", Accumulator, mailbox);
        else
            // Loops back to 0 after the max memory size, using mod
            Accumulator = Accumulator % (10 ** Settings.MemorySize);
}

// Switches accumulator sign and negative flag
function _switchAccumulatorSign() {
    Accumulator = -Accumulator;
    NegativeFlags.Accumulator = !NegativeFlags.Accumulator;
}

// Store the value in the accumulator
// to the mailbox address
function STO(mailbox) {
    Memory[mailbox] = Accumulator;
    NegativeFlags[mailbox] = NegativeFlags.Accumulator;
}

// Load value from mailbox
// to accumulator
function LDA(mailbox) {
    Accumulator = Memory[mailbox];
    NegativeFlags.Accumulator = NegativeFlags[mailbox];
}

// Branch for next instruction
function BRA(mailbox) {
    Counter = mailbox;
}

// If accumulator is <= 0
// Branch for next instruction
function BRZ(mailbox) {
    if (Accumulator == 0 || (Settings.BRN && NegativeFlags.Accumulator))
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
    if (Accumulator < 0)
        _switchAccumulatorSign();
}

// Concat value in accumulator
// to output
function OUT() {
    Outputs.push(Accumulator);
    if (NegativeFlags.Accumulator)
        Outputs[Outputs.length - 1] *= -1;
}

// Halt the program
function HLT() {
    Halt = true;
}