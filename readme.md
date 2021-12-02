# LMC - Little Man Computer
This is an editor and compiler of the [LMC machine language](https://en.wikipedia.org/wiki/Little_man_computer) proposed by Dr. Stuart Madnick in 1965.

For further instructions on how to use the LMC language, refer to the wikipedia article linked above. This is part of an article [published here](https://filosofiadelfuturo.com/lmc/), which is in Spanish.

The source code is made in vanilla JS (plain JS), with Semantic as a UI framework.

### Opcodes

| OP Code | Mnemonic Code | Description | 
|---------|---------|---------| 
| 1xx | ADD xx | Add the value stored in mailbox xx to whatever value is currently on the accumulator | 
| 2xx | SUB xx | Subtract the value stored in mailbox xx to whatever value is currently on the accumulator | 
| 3xx | STO xx | (STORE) Store the contents of the accumulator in mailbox xx (destructive) | 
| 5xx | LDA xx | (LOAD) Load the contents of the mailbox xx to the accumulator (destructive) | 
| 6xx | BR xx <br> BRA xx | (BREAK) Set the program counter to the given address xx | 
| 7xx | BRZ xx | (BREAK IF ZERO) If the accumulator is 000, set program counter to value xx | 
| 8xx | BRP xx | (BREAK IF POSITIVE) If the accumulator is 000 or positive, set program counter to value xx | 
| 901 | IN xx | Fetch next INBOX value and set the accumulator to that value | 
| 902 | OUT xx | Copy the value from the accumulator to the OUTBOX | 
| 000 | HLT xx <br> COB xx | (HALT) Stop the program | 
| xxx | DAT xxx | Program data |

###### Suggestions and pull requests are welcomed!
