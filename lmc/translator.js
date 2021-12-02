// Variables
const TranslateInstructions = {
    ADD: "1",
    SUB: "2",
    STO: "3",
    STA: "3",
    LDA: "5",
    BR: "6",
    BRA: "6",
    BRZ: "7",
    BRP: "8",
    IN: "901",
    OUT: "902",
    HLT: "0",
    COB: "0",
    DAT: "0"
}

// Checks what translation is needed by using first item in the object
function Translate(Memory) {
    // Don't translate
    if (Number(Memory[0]) == Memory[0]) return Memory
        // Index based translation
    else if (typeof Memory[0] == "string") return _translateIndex(Memory)
        // Alias based translation
    else if (typeof Memory[0] == "object") return _translateAlias(Memory)
        // Default
    else throw ("Wrong Memory type")
}

// Translates instructions in letters to numeric source code
function _translateIndex(instructions) {
    let Memory = []
    instructions = instructions.map((val) => val.split(" "))

    instructions.map((c_instruction) => {
        let opcode = _getOPCode(c_instruction[0])
        let data = _correctDataLength(c_instruction[1])
        let instruction = data == undefined ? opcode : opcode + data

        Memory.push(Number(instruction))
    })

    return Memory
}

// Translates Aliased instructions to source code
function _translateAlias(instructions) {
    let Memory = []
    let alias = {}

    // Compute alias dictionary
    instructions.map((c_instruction, index) => {
        let a = c_instruction[0].toUpperCase()
        if (a) alias[a] = _correctDataLength(index.toString())
    })

    // Compute full Memory array
    instructions.map((c_instruction) => {
        let opcode = _getOPCode(c_instruction[1])
        let data = c_instruction[2]
        let instruction

        if (!isNaN(Number(data))) instruction = Number(opcode + _correctDataLength(data.toString()))
        else instruction = Number(opcode + alias[data.toUpperCase()])

        Memory.push(instruction)
    })

    return Memory
}

let _correctDataLength = (str) => str && str.length == 1 ? "0" + str : str

let _getOPCode = (instruction) => {
    let t_instruction = instruction.toUpperCase()
    if (typeof t_instruction != "string") throw ("Only translate from string values")

    let opcode = TranslateInstructions[t_instruction]
    if (opcode === undefined) throw ("Unknown instruction")

    return opcode
}