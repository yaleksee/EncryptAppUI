highlight_row();
document.getElementById("inputField").addEventListener("focusin", inputFieldChange);

let selectedRecordId;


function inputFieldChange() {
    changeElementDisabling("decrypt-btn", true);
}

function onClickEncryptBtn() {
    let inputFieldValue = document.getElementById("inputField").value;
    let blankField = inputFieldValue === "";
    if (blankField) {
        outputInfoField("Please input value.Field is empty");
    } else {
        let data = {id: selectedRecordId, encryptedMessage: inputFieldValue};
        fetch('http://localhost:8080/api/v1/cryptedMessages', {
            method: selectedRecordId === undefined ? 'POST' : 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            updateTable(data);
            changeElementDisabling("ecrypt-btn", false);
            changeElementDisabling("decrypt-btn", true);
        });
    }
}

function updateTable(data) {
    if (selectedRecordId === undefined) {
        let tableRef = document.getElementById('display-table');
        let newRow = tableRef.insertRow(-1);
        let newCell = newRow.insertCell(0);
        let newId = document.createTextNode(data.id);
        newCell.appendChild(newId);
        newCell = newRow.insertCell(1);
        let newCrypt = document.createTextNode(data.encryptedMessage);
        newCell.appendChild(newCrypt);
        outputInfoField("New value is added to table!");
    } else {
        let row = document.getElementById(selectedRecordId);
        row.cells[1].innerHTML = data.encryptedMessage;
        outputInfoField("Value is updated in table. Row id = " + data.id);
    }
    document.getElementById("inputField").value = "";
}


function onClickDecryptBtn() {
    fetch('http://localhost:8080/api/v1/cryptedMessages/' + selectedRecordId)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
        document.getElementById("inputField").value = data.encryptedMessage;
        changeElementDisabling("ecrypt-btn", false);
        changeElementDisabling("decrypt-btn", true);
    });
}

function highlight_row() {
    var table = document.getElementById('display-table');
    var cells = table.getElementsByTagName('td');

    for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        cell.onclick = function () {
            var rowId = this.parentNode.rowIndex;

            var rowsNotSelected = table.getElementsByTagName('tr');
            for (var row = 0; row < rowsNotSelected.length; row++) {
                rowsNotSelected[row].style.backgroundColor = "";
                rowsNotSelected[row].classList.remove('selected');
            }
            var rowSelected = table.getElementsByTagName('tr')[rowId];
            rowSelected.style.backgroundColor = "green";
            rowSelected.className += " selected";

            document.getElementById("inputField").value = this.innerHTML;
            selectedRecordId = rowSelected.cells[0].innerHTML;
            changeElementDisabling("decrypt-btn", false);
            changeElementDisabling("ecrypt-btn", true);
        }
    }
}

function changeElementDisabling(elementId, value) {
    document.getElementById(elementId).disabled = value;
}

function outputInfoField(value) {
    document.getElementById("outputInfoField").value = value;
}