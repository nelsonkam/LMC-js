// Sugar syntax
let getById = (id) => document.getElementById(id);
let indexCode, machineCode;

// Show More options
let OnShowMore = function () {
  getById("more").classList.toggle("hidden");
};

let OnShowInstructions = function () {
  getById("instructions").classList.toggle("hidden");
};

let OnShowMachineCode = function () {
  getById("machine_code_col").classList.remove("hidden");
  getById("index_code_col").classList.add("hidden");
};

let OnShowIndexCode = function () {
  getById("machine_code_col").classList.add("hidden");
  getById("index_code_col").classList.remove("hidden");
};

// Loads examples
let OnLoadExample = function (name) {
  _memory = eval(name);
  _setProgram(_memory);
  _setResult("Program Loaded Successfully.");
};

let OnLoadExampleIndex = function (name, isAlias) {
  let _memory = eval(name);
  _setIndexCode(_memory, isAlias);
  _setResult("Program Loaded Successfully.");
};

// Save / Load Program
let OnLoadProgram = function () {
  const { remote } = require("electron");
  const { dialog } = remote;
  const { readFile } = require("fs");

  dialog.showOpenDialog().then((fileNames) => {
    if (fileNames === undefined) return _setResult("No file selected");

    readFile(fileNames.filePaths[0], "utf-8", (err, data) => {
      if (err) return _setResult("Error: " + err.message);

      _setProgram(data.split(","));
      _setResult("Program Loaded Successfully.");
    });
  });
};

let OnSaveProgram = async function () {
  const { remote } = require("electron");
  const { dialog } = remote;

  const { writeFile } = require("fs");
  const { filePath } = await dialog.showSaveDialog({
    buttonLabel: "Save Program",
    defaultPath: `program-${Date.now()}.lmc`,
  });

  writeFile(filePath, _getProgram(), () => {
    _setResult("Program Saved Successfully.");
  });
};

// Fills up Machine-based program with 0's
let OnFillupMemory = function () {
  Memory = _getProgram();
  FillupMemory();
  _setProgram(Memory);

  _setResult("Memory filled up with 0s. Max number 100.");
};

// Translates Index-based to Machine-based
let OnTranslateMemory = function () {
  let program;
  try {
    if (_isIndexMode()) program = _translateIndex(_getIndexCode());
    else program = _translateAlias(_getAliasCode());

    _setResult("Translation succesfull. Check machine code.");
  } catch (e) {
    console.log(e);
    _setResult("Error in translation. Check assembly version.");
    return;
  }

  _setProgram(program);
};

// Startup program
let OnStartup = function () {
  _resetResult();
  OnTranslateMemory();

  if (_getProgram().length > 1) {
    Memory = _getProgram();
    _setResult("Using Machine-based code");
  } else if (_getIndexCode().length > 1) {
    // Memory = _translateIndex(_getIndexCode());
    return _setResult("Translate your program before executing.");
  } else {
    return _setResult("No program set.");
  }

  _setOutputs([]);
  Inputs = _getInputs();

  try {
    Startup();
  } catch (e) {
    _setResult(e);
  }
};

// Clears memory
let OnClearMemory = function () {
  _setProgram([]);
  _setIndexCode([]);
  CleanMemory();
  _resetResult();
};

// Displays output - called from `core loop`
let DisplayOutput = function () {
  _setOutputs(Outputs);
  _setProgram(Memory);
};

/// Local Functions
// Machine Code
let _getProgram = function () {
  return machineCode
    .getDoc()
    .getValue()
    .split("\n")
    .map((x) => (isNaN(Number(x)) ? 0 : Number(x)));
};

let _setProgram = function (Memory) {
  machineCode.getDoc().setValue(Memory.join("\n"));
  //   getById("machine_code").value = Memory.join("\n");
};

// Index Based Code
let _getIndexCode = function () {
  return indexCode.getDoc().getValue().split("\n");
  //   return getById("index_code").value.split("\n");
};

let _getAliasCode = function () {
  return (max = indexCode
    .getDoc()
    .getValue()
    .split("\n")
    .map((x) => x.split(/\s/)));
};

let _isIndexMode = function () {
  return getById("index_code_radio").checked;
};

let _setIndexCode = function (value, isAlias) {
  value = isAlias ? value.join("\n").split(",").join(" ") : value.join("\n");
  //   getById("index_code").value = value;
  indexCode.getDoc().setValue(value);
};

// Inputs
let _getInputs = function () {
  return getById("inputs")
    .value.split("\n")
    .map((x) => (isNaN(Number(x)) ? 0 : Number(x)));
};

let _setInputs = function (value) {
  getById("inputs").value = value.join("\n");
};

// Outputs
let _getOutputs = function () {
  return getById("outputs")
    .value.split("\n")
    .map((x) => (isNaN(Number(x)) ? 0 : Number(x)));
};

let _setOutputs = function (value) {
  getById("outputs").value = value.join("\n");
};

// Push message to result
let _setResult = function (value) {
  getById("result").innerHTML += `> ${value}<br>`;
};

let _resetResult = function () {
  getById("result").innerHTML = "";
  getById("debug").innerHTML = "";
};

// Mobile check
window.mobileCheck = function () {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

window.addEventListener("load", (event) => {
  const isMobile = window.mobileCheck();
  if (!isMobile) {
    getById("index_code_col").classList.remove("hidden");
    document.getElementsByClassName("two")[0].classList.add("three");
    document.getElementsByClassName("two")[0].classList.remove("column");
    document.getElementsByClassName("two")[0].classList.remove("row");
    document.getElementsByClassName("two")[0].classList.remove("two");
    document.getElementsByClassName("three")[0].classList.add("column");
    document.getElementsByClassName("three")[0].classList.add("row");
    let hideElements = document.getElementsByClassName("mobile");
    for (let i = 0; i < hideElements.length; i++)
      hideElements[i].classList.add("hidden");
  }

  machineCode = CodeMirror.fromTextArea(
    document.getElementById("machine_code"),
    {
      lineNumbers: true,
      firstLineNumber: 0,
      theme: "abbott",
      lineNumberFormatter: (line) => line.toString().padStart(2, "0"),
    }
  );

  indexCode = CodeMirror.fromTextArea(document.getElementById("index_code"), {
    lineNumbers: true,
    theme: "abbott",
  });
});
