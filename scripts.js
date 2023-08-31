document.addEventListener("DOMContentLoaded", function() {
  const table = document.querySelector(".schedule-table");

  let hour = 7;
  let minute = 30;

  const cellMatrix = []; // Matriz para representar el estado de las celdas

  for (let i = 0; i < 24; i++) {
    const row = document.createElement("tr");

    const timeCell = document.createElement("td");
    timeCell.textContent = `${hour}:${minute < 10 ? "0" + minute : minute}`;
    row.appendChild(timeCell);

    const rowCells = []; // Almacena las celdas de la fila actual

    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("td");
      cell.addEventListener("click", function() {
        if (!cell.classList.contains("filled")) {
          cell.classList.add("filled");
          showModal("¡Usted ha reservado el turno!");
          const rowIndex = rowCells.indexOf(cell);
          cellMatrix[i][rowIndex] = true; // Marca como reservado en la matriz
          setTimeout(function() {
            closeModal();
          }, 2000);
        } else {
          cell.classList.remove("filled");
          showModal("Su reserva ha sido cancelada.");
          const rowIndex = rowCells.indexOf(cell);
          cellMatrix[i][rowIndex] = false; // Marca como no reservado en la matriz
          setTimeout(function() {
            closeModal();
          }, 2000);
        }
      });
      row.appendChild(cell);
      rowCells.push(cell); // Agrega la celda actual a la matriz de celdas
    }

    table.appendChild(row);
    cellMatrix.push(rowCells); // Agrega la fila de celdas a la matriz global

    minute += 30;
    if (minute >= 60) {
      hour++;
      minute = 0;
    }
  }
});

function showModal(message) {
  const modalOverlay = document.querySelector(".modal-overlay");
  const modalContent = document.querySelector(".modal-content");
  const modalMessage = document.querySelector(".modal-message");

  modalMessage.textContent = message;
  modalOverlay.style.display = "flex";
}

function closeModal() {
  const modalOverlay = document.querySelector(".modal-overlay");
  modalOverlay.style.display = "none";
}