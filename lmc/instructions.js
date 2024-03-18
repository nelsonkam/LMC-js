// Variables
const Instructions = {
    // Add the value in mailbox
    // to value in the accumulator
    1: function (mailbox) {
        document.getElementById("debug").innerHTML += `> ADD ${mailbox}: ${Accumulator} + ${Memory[mailbox]}<br>`
        Accumulator += Memory[mailbox];
        this._manageOverflow(mailbox);
    },
    // Subtract the value in mailbox
    // from value in the accumulator
    2: function (mailbox) {
        document.getElementById("debug").innerHTML += `> SUB ${mailbox}: ${Accumulator} - ${Memory[mailbox]}<br>`
        Accumulator -= Memory[mailbox];
        this._manageOverflow(mailbox);
    },
    // Store the value in the accumulator
    // to the mailbox address
    3: function (mailbox) {
        document.getElementById("debug").innerHTML += `> STO ${mailbox}: ${Accumulator}<br>`
        Memory[mailbox] = Accumulator;
    },
    // Load value from mailbox
    // to accumulator
    5: function (mailbox) {
        document.getElementById("debug").innerHTML += `> LDA ${mailbox}: ${Memory[mailbox]}<br>`
        Accumulator = Memory[mailbox];
    },
    // Branch for next instruction
    6: function (mailbox) {
        document.getElementById("debug").innerHTML += `> BR ${mailbox}: ${Counter} to ${mailbox}<br>`
        Counter = mailbox;
    },
    // If accumulator is <= 0
    // Branch for next instruction
    7: function (mailbox) {
        if (Accumulator == 0) {
            document.getElementById("debug").innerHTML += `> BRZ ${mailbox}: ${Counter} to ${mailbox}<br>`
            Counter = mailbox;
            return;
        }
        document.getElementById("debug").innerHTML += `> BRZ ${mailbox}: NO BRANCH<br>`
            
    },
    // If accumulator is > 0
    // Branch for next instruction
    8: function (mailbox) {
        if (Accumulator >= 0) {
            document.getElementById("debug").innerHTML += `> BRP ${mailbox}: ${Counter} to ${mailbox}<br>`
            Counter = mailbox;
            return;
        }
        document.getElementById("debug").innerHTML += `> BRP ${mailbox}: NO BRANCH<br>`
    },
    // Fetch first value in Inputs
    // to the accumulator
    901: function () {
        Accumulator = Inputs.shift();
        document.getElementById("debug").innerHTML += `> IN: ${Accumulator}<br>`
    },
    // Concat value in accumulator
    // to output
    902: function () {
        document.getElementById("debug").innerHTML += `> OUT: ${Accumulator}<br>`
        Outputs.push(Accumulator);
    },
    // Halt the program
    0: function () {
        Halt = true;
    },
    // Manages overflow depending on settings
    _manageOverflow: function (mailbox) {
        if (Math.abs(Accumulator) > 10 ** Settings.MemorySize)
            if (Settings.ErrOverflow)
                _err("Overflow", Accumulator, mailbox);
            else
                // Loops back to 0 after the max memory size, using mod
                Accumulator = Accumulator % (10 ** Settings.MemorySize);
    }
};