# Little Man Computer
> The Little Man Computer (LMC) is an instructional model of a computer, created by Dr. Stuart Madnick in 1965. The LMC is generally used to teach students, because it models a simple von Neumann architecture computer—which has all of the basic features of a modern computer. It can be programmed in machine code (albeit in decimal rather than binary) or assembly code.
> [Wikipedia Article link](https://en.wikipedia.org/wiki/Little_man_computer)

### Execution
Load the `index.html` into any web browser. For now, the only way to interact with it is through the console. Open the devtools and do the following

Load the `Memory` array with the appropriate code.
The program will attempt to translate the human-readable code to machine code.
```
Memory = [901, ...]
```

Load the `Inputs` array with your inputs - will read from left to right.
Memory has a limit of 99 places. Don't worry about filling the unused addresses - they will be filled for you.
You can check out a couple of examples in the `examples.js`
```
Inputs = [1, 2, 3]
```

Execute 
```
Startup()
```

### Other features
* Translate from aliased and indexed human redable to source code.
   Check the `examples.js` to understand the different indexing types.
* Settings for non-standard implementations. This includes, bigger Memory size and length, BRZ behaivour, negative flag, overflow behaviour. 

### Upcoming
* UI interface
* Save and export scripts