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
    document.getElementById("sliderValue").textContent = 19;
    document.getElementById("range").value = 0;
    alert("Complete the circuit first");
  }
});
let rowCountIndex = 0;

document.getElementById("addtable").addEventListener("click", addTable);

function addTable() {
  if (sessionStorage.getItem("circuitComplete") === "true") {
    const srnos = document.getElementsByClassName("srno");
    const lengths = document.getElementsByClassName("length");
    const orders = document.getElementsByClassName("order");
    const rhs = document.getElementsByClassName("rhs");
    const lhs = document.getElementsByClassName("lhs");
    const means = document.getElementsByClassName("mean");
    const tanThetas = document.getElementsByClassName("tan-theta");
    const sinThetas = document.getElementsByClassName("sin-theta");
    const lambdas = document.getElementsByClassName("wavelength");

    const lengthval = sessionStorage.getItem("length");
    const d1 = sessionStorage.getItem("d1");
    const d2 = sessionStorage.getItem("d2");
    const tanTheta1 = sessionStorage.getItem("tanTheta1");
    const sinTheta1 = sessionStorage.getItem("sinTheta1");
    const lambda1 = sessionStorage.getItem("lambda1");
    const tanTheta2 = sessionStorage.getItem("tanTheta2");
    const sinTheta2 = sessionStorage.getItem("sinTheta2");
    const lambda2 = sessionStorage.getItem("lambda2");

    // First Row (n=1)
    let i = rowCountIndex * 2;
    srnos[rowCountIndex].value = rowCountIndex + 1;
    lengths[rowCountIndex].value = lengthval;
    orders[i].value = 1;
    rhs[i].value = (parseFloat(d1)).toFixed(5);
    lhs[i].value = (parseFloat(d1)).toFixed(5);
    means[i].value = parseFloat(d1).toFixed(5);
    tanThetas[i].value = tanTheta1;
    sinThetas[i].value = sinTheta1;
    lambdas[i].value = (parseFloat(lambda1)).toFixed(8);

    // Second Row (n=2)
    orders[i + 1].value = 2;
    rhs[i + 1].value = (parseFloat(d2)).toFixed(5);
    lhs[i + 1].value = (parseFloat(d2)).toFixed(5);
    means[i + 1].value = parseFloat(d2).toFixed(5);
    tanThetas[i + 1].value = tanTheta2;
    sinThetas[i + 1].value = sinTheta2;
    lambdas[i + 1].value = (parseFloat(lambda2)).toFixed(8);

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
