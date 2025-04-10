// 0->one 1->two 2->three 3->four
// const slider = document.getElementById("range");
// const sliderValue = document.getElementById("sliderValue");
wireTerminalCheck = [
  { resistor: false, one: false },
  { resistor: false, seven: false },
  { eight: false, four: false },
  { five: false, three: false },
  { seven: false, five: false },
  { eight: false, resistor: false },
  { resistor: false, six: false },
  { two: false, six: false },
];


terminalMap = {
  0: "one",
  1: "two",
  2: "three",
  3: "four",
  resistor: "resistor",
  4: "five",
  5: "six",
  6: "seven",
  7: "eight",
  8: "nine",
  9: "ten",
  10: "eleven",
  11: "twelve",
};

var xValues = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360];

sequenceNum = 0;

var rowData = { sno: 0, length: 0, radius: 0, na: 0, theta: 0 };
sessionStorage.setItem("rowData", JSON.stringify(rowData));
sessionStorage.setItem("fullScreen", false);
sessionStorage.setItem("newIndex", 0);
sessionStorage.setItem("length", 0);
sessionStorage.setItem("radius", 0);
sessionStorage.setItem("na", 0);
sessionStorage.setItem("theta", 0);
var btnPressed = [false, false];

setTimeout(() => {
  // if (document.querySelector(".forward")) {
  wireTerminalCheck = [
    { one: false, resistor: false },
    { eight: false, four: false },
    { five: false, three: false },
    { six: false, two: false },
    { nine: false, seven: false },
    { eleven: false, ten: false },

    // { seven: false, five: false },
    // { eight: false, resistor: false },
    // { resistor: false, six: false },
  ];
  // } else {
  //   wireTerminalCheck = [
  //     { one: false, resistor: false },
  //     { resistor: false, seven: false },
  //     { eight: false, four: false },
  //     { five: false, three: false },
  //     { seven: false, five: false },
  //     { eight: false, resistor: false },
  //     { resistor: false, six: false },
  //     { two: false, six: false },
  //   ];
  // }
  enablingSequence(sequenceNum);
}, 2000);

function enablingSequence(sequenceNum) {
  sessionStorage.setItem("circuitComplete", false);
  if (document.querySelector(".forward")) {
    sessionStorage.setItem("type", false);
  } else {
    sessionStorage.setItem("type", true);
  }

  if (sequenceNum <= wireTerminalCheck.length) {
    for (var key in wireTerminalCheck[sequenceNum]) {
      elem = document.getElementsByClassName(key)[0];
      elem.style.stroke = "#FFFF00";
      elem.style.animationName = "pulse";
      elem.style.opacity = "1";
    }
  }
}

function trial(componentSom) {
  componentSomMap = terminalMap[componentSom];
  for (var key in wireTerminalCheck[sequenceNum])
    if (key == componentSomMap) wireTerminalCheck[sequenceNum][key] = true;

  elem = document.getElementsByClassName(componentSomMap)[0];
  elem.style.animationName = "none";
  elem.style.stroke = "none";
  // console.log(checkPair())
  dum = checkPair(sequenceNum);
  // console.log(dum)
  if (dum) {
    wireName = "wire" + (sequenceNum + 1);
    document.getElementById(wireName).style.transition = "display 10s";
    document.getElementById(wireName).style.display = "block";
    ++sequenceNum;
    if (sequenceNum < wireTerminalCheck.length) {
      enablingSequence(sequenceNum);
      // console.log('here')
    } else {
      // console.log('here')
      // alert("Circuit completed");
      replacement();
    }
  }
}

function checkPair(sequenceNum) {
  count = 0;
  for (var key in wireTerminalCheck[sequenceNum])
    if (wireTerminalCheck[sequenceNum][key] == true) count++;
  // console.log(count, 'count')
  if (count == 2) return true;
  return false;
}

function keyPut() {
  document.getElementById("key1").style.animation = "none";
  document.getElementById("key1").onclick = function () {};
  document.getElementById("keyBase1").onclick = function () {};
}

const labelMap = {
  0: "19",
  1: "20",
  2: "22.5",
};

function updateInputDisplay(val) {
  document.getElementById("sliderValue").textContent = labelMap[val];
  console.log("Internal value:", val); // Use this for backend or logic (0, 1, 2)
}

function replacement() {
  document.getElementById("black-board").classList.add("hidden");
  document
    .getElementById("options")
    .style.setProperty("display", "none", "important");
  document.getElementById("table-board").classList.add("replacement");

  const paperElem = document.getElementById(`paper`);
  if (paperElem) paperElem.style.display = "inline";
  const wireElement = document.getElementById(`laserfromthelaser`);
  if (wireElement) wireElement.style.display = "inline";
  const splitwireElement = document.getElementById(`splitedlasers`);
  if (splitwireElement) splitwireElement.style.display = "inline";

  // document.getElementsByClassName("power-btn").style.stroke = "yellow";
  // document.getElementsByClassName("power-btn").style.strokeWidth = "0.25%";
  // document.getElementsByClassName("power-btn").onclick = function () {
  //   checkbtnPressed(0);
  // };

  // document.getElementById("key1").style.display = "block";
  // document.getElementById("key1").classList.add("key-up-down");
  // document.getElementById("key1").onclick = function () {
  //   checkbtnPressed(1);
  //   keyPut();
  // };
  // document.getElementById("keyBase1").onclick = function () {
  //   checkbtnPressed(1);
  //   keyPut();
  // };
  sessionStorage.setItem("circuitComplete", true);
  document.getElementById("calculation").style.display = "inline";
  sessionStorage.setItem("fullScreen", true);

  sessionStorage.setItem("newIndex", 0);

  updateDisplay(0);
  updateInputDisplay(0);
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkbtnPressed(btnNum) {
  btnPressed[btnNum] = true;
  if (btnNum == 0) {
    document.getElementById("power").textContent = "03.00";
    document.getElementById("volt").textContent = "00.36";
    document.getElementById("power-btn").style.strokeWidth = "0%";
  }
  if (btnPressed[0]) {
    sessionStorage.setItem("circuitComplete", true);

    // if(document.querySelector(".forward")){
    //   // startWorkingForward();
    // }
    // else{
    //   // startWorkingReverse();
    // }
  }
}

// function keyOp(){
//     document.getElementById('key1').style.display = "none"
//     document.getElementById('key2').style.animation = "none"
//     document.getElementById('key2').onclick = function(){}
//     document.getElementById('keyBase2').onclick = function(){}
// }

function startWorkingForward() {
  let volttext = document.getElementById("volt");
  let currtext = document.getElementById("curr");
  var srno = 0;
  let i = 0;

  let volt = 0.0;
  let curr = 0.0;
  let intervalId = setInterval(() => {
    if (volt < 0.4) {
      volt += 0.1;
      curr = curarr[i++] + getRndInteger(0, 0.1);
    } else {
      volt += 0.05;
      curr = curarr[i++] + getRndInteger(0.5, 1.5);
    }
    volttext.textContent = volt.toFixed(2);
    currtext.textContent = curr;
    filldata(srno, volt, curr);
    srno++;
    console.log("fill data callede");

    currtext.textContent = curr.toFixed(2);
    // Stop the interval after reaching a certain temprature
    if (volt >= 0.7) {
      clearInterval(intervalId);
    }
  }, 1000);
}

function startWorkingReverse() {
  let volttext = document.getElementById("volt");
  let currtext = document.getElementById("curr");
  var srno = 0;
  let i = 0;

  let volt = 0.0;
  let curr = 0.0;
  let intervalId = setInterval(() => {
    curr = curarr[i++] - getRndInteger(0.5, 1.5);
    if (volt < 0.4) {
      volt += 0.1;
    } else {
      volt += 0.2;
    }
    volttext.textContent = volt.toFixed(2);
    currtext.textContent = curr;
    filldata(srno, volt, curr);
    srno++;
    console.log("fill data callede");

    currtext.textContent = curr.toFixed(2);
    // Stop the interval after reaching a certain temprature
    if (volt >= 2.5) {
      clearInterval(intervalId);
    }
  }, 1000);

  // alert("reverse ka data hai dont worry bhai")
}

function filldata(srno, volt, curr) {
  rowData = { srno: 0, volt: 0, curr: 0 };
  sessionStorage.setItem("rowData", JSON.stringify(rowData));
  rowData.srno = srno;
  rowData.volt = volt;
  rowData.curr = curr;
  console.log(srno);
  sessionStorage.setItem("rowData", JSON.stringify(rowData));
}

//ye wala code range ke sath ke lia hai

setTimeout(() => {
  rangeSelector();
}, 100);

// const voltarr = [0.1, 0.2, 0.3, 0.4, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75];
// const curarrforward = [0, 0, 0, 0, 0.4, 0.7, 2.3, 5.5, 15.8, 18, 18.9];

// function rangeSelector() {
//   newIndexinterval = setInterval(() => {
//     let newIndex = sessionStorage.getItem("newIndex"); // Retrieve newIndex
//     newIndex = Math.floor(newIndex / 10); // Map to range [1, 10]

//     // Ensure newIndex stays within bounds of the array
//     if (newIndex < 1 || newIndex > 10) {
//       console.error("newIndex out of range");
//       return; // Skip this iteration if out of bounds
//     }

//     let volttext = document.getElementById("volt");
//     let currtext = document.getElementById("curr");

//     volttext.textContent = voltarr[newIndex - 1]; // Adjust for 0-based index
//     let curr = 0;
//       curr = Math.abs(curarrforward[newIndex - 1] - getRndInteger(0.01, 0.03));
//       currtext.textContent = curr.toFixed(2);
//     let currcopy = curr.toFixed(2);

//     sessionStorage.setItem("current", curarrforward[0]);
//     sessionStorage.setItem("voltage", voltarr[0]);

//     // alert("Data recorded in the Table and Graph will be plotted.", currcopy , voltarr[newIndex - 1]);
//   }, 500);
// }

function updateDisplay(value) {
  // Update slider value display
  // sliderValue.textContent = value;

  // Hide all elements
  hideAllElements();
  // alert(value)
  // Show elements corresponding to the current value
  showElements(value);
}
// let lengthElement;
// window.onload = () => {
//   lengthElement = document.getElementById("lengthonsvg");
//   if (lengthElement) {
//       lengthElement.textContent = `L = asdf`;
//   } else {
//       console.error("Element with ID 'lengthonsvg' not found");
//   }
// };

function hideAllElements() {
  // Hide all wire paths
  for (let i = 1; i <= 3; i += 1) {
    const wireElement = document.getElementById(`arr${i}`);
    if (wireElement) wireElement.style.display = "none";
  }
}
// updateDisplay(slider.value);
function showElements(value) {
  // Show elements matching the current value
  value++;
  const wireElement = document.getElementById(`arr${value}`);
  if (wireElement) wireElement.style.display = "block";
}

// slider.addEventListener("input", function () {
//   updateDisplay(this.value);
// });
// const sliderValueElement = document.getElementById("sliderValue");
// function updateValues(value) {
//   if (sliderValueElement) {
//     sliderValueElement.textContent = sessionStorage.getItem("newIndex");
//   } else {
//     alert("sliderValue element not found");
//   }
// }

// const radiusValue = [3.25, 6.75, 8, 10.25, 12.5, 14.75, 17, 19.25, 21.5, 23.75];
const radiusValue = [
  1.625, 3.25, 4.875, 6.75, 8.625, 8, 9.125, 10.25, 11.375, 12.5,
];

const data = [
  {
    SNo: 1,
    L: 19,
    readings: [
      {
        n: 1,
        rhs: 8,
        lhs: 8,
      },
      {
        n: 2,
        rhs: 22.5,
        lhs: 22.5,
      },
    ],
    D1: 8,
    D2: 22.5,
  },
  {
    SNo: 2,
    L: 20,
    readings: [
      {
        n: 1,
        rhs: 8.5,
        lhs: 8.5,
      },
      {
        n: 2,
        rhs: 24.5,
        lhs: 24.9,
      },
    ],
    D1: 8.5,
    D2: 27.7,
  },
  {
    SNo: 3,
    L: 22.5,
    readings: [
      {
        n: 1,
        rhs: 9.9,
        lhs: 9.7,
      },
      {
        n: 2,
        rhs: 28,
        lhs: 27.7,
      },
    ],
    D1: 9.8,
    D2: 27.85,
  },
];

function rangeSelector() {
  newIndexinterval = setInterval(() => {
    let newIndex = sessionStorage.getItem("newIndex"); // Retrieve newIndex
    // newIndex = Math.floor(newIndex / 2.5); // Map to range [1, 10]

    // Ensure newIndex stays within bounds of the array
    if (newIndex < 0 || newIndex > 10) {
      console.error("newIndex out of range");
      return; // Skip this iteration if out of bounds
    }
    const isComplete = sessionStorage.getItem("circuitComplete");
    if (isComplete) {
      // alert(newIndex);
      updateDisplay(newIndex);
    }

    const length = labelMap[newIndex];
    const d1 = data[newIndex].D1;
    const d2 = data[newIndex].D2;
    // alert(newIndex);
    // alert(length);
    // alert(d1);

    const a_b = 1.6933e-4;
    const tanTheta1 = d1 / length;

    // If you need theta in degrees rather than radians
    const thetaInDegrees1 = Math.atan(tanTheta1) * (180 / Math.PI);
    // alert(tanTheta);
    const sinTheta1 = Math.sin(Math.atan(tanTheta1));
    const lambda1 = a_b * sinTheta1;
    
    const tanTheta2 = d2 / length;
    const thetaInDegrees2 = Math.atan(tanTheta2) * (180 / Math.PI);
    // alert(tanTheta);
    const sinTheta2 = Math.sin(Math.atan(tanTheta2));
    const lambda2 = (a_b * sinTheta2) / 2;
    // console.log(tanTheta, sinTheta, lambda);

    console.log(tanTheta1, lambda1);
    sessionStorage.setItem("length", length);
    sessionStorage.setItem("d1", d1);
    sessionStorage.setItem("d2", d2);
    sessionStorage.setItem("tanTheta1", tanTheta1.toFixed(5));
    sessionStorage.setItem("sinTheta1", sinTheta1.toFixed(5));
    sessionStorage.setItem("lambda1", lambda1.toFixed(9));
    sessionStorage.setItem("tanTheta2", tanTheta2.toFixed(5));
    sessionStorage.setItem("sinTheta2", sinTheta2.toFixed(5));
    sessionStorage.setItem("lambda2", lambda2.toFixed(8));

    // document.getElementById("sliderValue").textContent = length.toFixed(1);
    document.getElementById("diameter1").textContent = d1.toFixed(5);
    document.getElementById("tanTheta1").textContent = tanTheta1.toFixed(5);
    document.getElementById("thetaDegree1").textContent =
      thetaInDegrees1.toFixed(2);
    document.getElementById("sinTheta1").textContent = sinTheta1.toFixed(5);
    document.getElementById("wavelengthAngstrom1").textContent =
      lambda1.toFixed(8);

    document.getElementById("diameter2").textContent = d2.toFixed(5);
    document.getElementById("tanTheta2").textContent = tanTheta2.toFixed(5);
    document.getElementById("thetaDegree2").textContent =
      thetaInDegrees2.toFixed(2);
    document.getElementById("sinTheta2").textContent = sinTheta2.toFixed(5);
    document.getElementById("wavelengthAngstrom2").textContent =
      lambda2.toFixed(8);
  }, 500);
}

// function rangeSelector() {
//   newIndexinterval = setInterval(() => {
//     let newIndex = sessionStorage.getItem("newIndex"); // Retrieve newIndex
//     newIndex = Math.floor(newIndex / 2.5); // Map to range [1, 10]

//     // Ensure newIndex stays within bounds of the array
//     if (newIndex < 1 || newIndex > 10) {
//       console.error("newIndex out of range");
//       return; // Skip this iteration if out of bounds
//     }

//     const isComplete = sessionStorage.getItem("circuitComplete");
//     if (isComplete) {
//       // Update display with the newIndex
//       updateDisplay(newIndex);

//       // updateValues(newIndex);
//     }

//     const testindex = newIndex * 2.5;
//     // Calculate values based on newIndex
//     const length = testindex; // Simple length calculation based on index
//     const radius = radiusValue[newIndex - 1]; // r = D/2 = 25/2 = 12.5 mm (from your table header)

//     // Calculate Numerical Aperture (NA = r/√(L² + r²))
//     const numericalAperture =
//       radius / Math.sqrt(Math.pow(length, 2) + Math.pow(radius, 2));

//     // Calculate acceptance angle in degrees (θₒ = sin⁻¹(NA))
//     const acceptanceAngle = Math.asin(numericalAperture) * (180 / Math.PI);

//     sessionStorage.setItem("rowData", JSON.stringify(rowData));

//     // Store optical values in sessionStorage
//     sessionStorage.setItem("length", length.toFixed(1));
//     sessionStorage.setItem("radius", radius.toFixed(2));
//     sessionStorage.setItem("na", numericalAperture.toFixed(5));
//     sessionStorage.setItem("theta", acceptanceAngle.toFixed(5));

//     // document.getElementById("sliderValue").textContent = length.toFixed(1);
//     // document.getElementById("lengthDisplay").textContent = length.toFixed(1);
//     // document.getElementById("radiusDisplay").textContent = radius.toFixed(2);
//     // document.getElementById("naDisplay").textContent = numericalAperture.toFixed(5);
//     // document.getElementById("thetaDisplay").textContent = acceptanceAngle.toFixed(4);

//     // Calculate Diameters
//     const D1 = (2 * radius).toFixed(2);
//     const D2 = (2 * radius).toFixed(2);
//     const Dmean = ((parseFloat(D1) + parseFloat(D2)) / 2).toFixed(2);
//     const r = (Dmean / 2).toFixed(2);

//     // Function to safely update element text content
//     const updateTextContent = (id, value) => {
//       const element = document.getElementById(id);
//       if (element) {
//         element.textContent = value;
//       }
//     };

//     // Update SVG elements only if they exist
//     updateTextContent("d1text", D1);
//     updateTextContent("d2text", D2);
//     updateTextContent("dmeantext", Dmean);
//     updateTextContent("rtext", r);

//     const lengthElement = document.getElementById("lengthonsvg");
//     if (lengthElement && lengthElement.firstChild) {
//       lengthElement.firstChild.nodeValue = `L = ${length.toFixed(1)}`;
//     }

//     document.getElementById("sliderValue").textContent = length.toFixed(1);
//     // document.getElementById("lengthDisplay").textContent = length.toFixed(1);
//     document.getElementById("radiusDisplay").textContent = radius.toFixed(2);

//     document.getElementById("naDisplay").textContent =
//       numericalAperture.toFixed(5);
//     document.getElementById("thetaDisplay").textContent =
//       acceptanceAngle.toFixed(5);
//     const naNumerator = radius; // Define naNumerator
//     document.getElementById("naFormula").textContent = `${naNumerator.toFixed(
//       2
//     )} / √(${length.toFixed(2)}² + ${radius.toFixed(2)}²)`;
//     document.getElementById("thetaFormula").textContent =
//       numericalAperture.toFixed(5);
//   }, 500);
// }

function getRndInteger(min, max) {
  return Math.random() * (max - min) + min;
}
