currtrigger = 0;
var xValues = [0.0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8];
var logValues = [];
var count = 0;
let trigger = 0;
let type;
setTimeout(() => {
  fillTable();
}, 3700);

function fillTable() {
  filltableintrval = setInterval(() => {
    if (sessionStorage.getItem("fullScreen") == "true") {
      snackbarFunction(
        "Put the key and press on the Power Supply button and Heater button to begin."
      );
      sessionStorage.setItem("fullScreen", false);
      setTimeout(() => {
        snackbarFunction(
          "Readings are automatically recorded in the Table and Graph will be plotted."
        );
      }, 13000);
    }

    if (sessionStorage.getItem("type") == "false") {
      idx = 1;
    } else {
      idx = 2;
    }
    var rowData = JSON.parse(sessionStorage.getItem("rowData"));
    if (rowData.volt && rowData.srno < 15) {
      srno = document.getElementsByClassName(`srno${idx}`)[rowData.srno];
      current = document.getElementsByClassName(`curr${idx}`)[rowData.srno];
      voltage = document.getElementsByClassName(`voltage${idx}`)[rowData.srno];

      srno.value = rowData.srno + 1;
      current.value = rowData.curr.toFixed(2);
      voltage.value = rowData.volt.toFixed(2);

      if (rowData.curr > currtrigger) {
        currtrigger = rowData.curr;
        logValues.push(currtrigger.toFixed(3));
        console.log(logValues);
        myChart.update();
        count++;
        console.log(`count hu mai ${count}`);
      }

      let f = 0;
      if (count == 16) {
        if (f == 0) {
          f = 1;
          snackbarFunction(
            "For Calculation Take the Value of Slope from graph "
          );
        }
        document.querySelector(".slope-div").style.display = "block";
        document.querySelector("#download").style.display = "block";
      }
    }
    if (rowData.srno == 14 && idx == 1) {
      setTimeout(() => {
        let svgObject = document.getElementById("main-svg");
        svgObject.data = "./assets/reverse.svg";
        fillTable();
      }, 2000);
    }

    if (rowData.srno == 14) {
      clearInterval(filltableintrval);
    }
  }, 500);
}

snackbarFunction(
  "Follow the Indicators and Click on the Terminals to make the connection."
);

function snackbarFunction(instruction) {
  var x = document.getElementById("snackbar");
  x.textContent = instruction;
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 10000);
}

var elem = document.getElementsByTagName("body")[0];
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}
const range = document.getElementById("range");

range.addEventListener("input", (event) => {
  if (sessionStorage.getItem("circuitComplete") == "true") {
    const newIndex = event.target.value;
    sessionStorage.setItem("newIndex", newIndex);
  } else {
    document.getElementById("range").value = 5;
    alert("Complete the circuit first");
  }
});
let rowCountIndex = 0;

document.getElementById("addtable").addEventListener("click", addTable);
let idx;
function addTable() {
  if (sessionStorage.getItem("circuitComplete") === "true") {
    srno = document.getElementsByClassName(`srno`)[rowCountIndex];
    length = document.getElementsByClassName(`length`)[rowCountIndex];
    radius = document.getElementsByClassName(`radius`)[rowCountIndex];
    na = document.getElementsByClassName(`na`)[rowCountIndex];
    theta = document.getElementsByClassName(`theta`)[rowCountIndex];

    let lengthval = sessionStorage.getItem("length");
    let radiusval = sessionStorage.getItem("radius");
    let naval = sessionStorage.getItem("na");
    let thetaval = sessionStorage.getItem("theta");

    srno.value = rowCountIndex + 1;
    length.value = lengthval;
    radius.value = radiusval;
    na.value = naval;
    theta.value = thetaval;
    rowCountIndex++;
  } else {
    alert("Complete the circuit first");
  }
}
document.getElementById('clear').addEventListener('click', function() {
  // Get all input fields with the classes we want to clear
  const srnoInputs = document.querySelectorAll('input.srno');
  const lengthInputs = document.querySelectorAll('input.length');
  const radiusInputs = document.querySelectorAll('input.radius');
  const naInputs = document.querySelectorAll('input.na');
  const thetaInputs = document.querySelectorAll('input.theta');
  
  // Clear the value of each input
  srnoInputs.forEach(input => input.value = '');
  lengthInputs.forEach(input => input.value = '');
  radiusInputs.forEach(input => input.value = '');
  naInputs.forEach(input => input.value = '');
  thetaInputs.forEach(input => input.value = '');
  
  console.log('Table values cleared');
  rowCountIndex=0;
});

document.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener("click", function (event) {
    event.preventDefault();
    const selectedValue = this.getAttribute("data-value");
    const dropdownButton = document.getElementById("dropdownMenuButton");

    dropdownButton.textContent = this.textContent;

    console.log("Selected bias type:", selectedValue);
    document.getElementById("main-svg").setAttribute("data", selectedValue);
  });
});
async function downloadGraphAndObservations() {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Set background color
    doc.setFillColor(0, 123, 255); // Blue color (RGB)
    doc.rect(10, 5, 190, 10, "F");
    // Add a header with white text
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255); // Set text color to white
    doc.setFontSize(20); // Set font size for the header
    doc.text("Observations Table", 75, 12); // Add text at x=10, y=10

    const tableCanvas = await html2canvas(document.querySelector("#table"), {
      scale: 2,
    });
    const tableImgData = tableCanvas.toDataURL("image/png");
    doc.addImage(tableImgData, "PNG", 15, 17, 180, 120);

    // Save the PDF
    doc.save("observations_table.pdf");
  } catch (error) {
    console.log(error.message);
    if (error.message === "Incomplete or corrupt PNG file") {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Please complete the calculation using the Graph",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }
}

// Add event listener to the download button
document
  .getElementById("download")
  .addEventListener("click", downloadGraphAndObservations);
