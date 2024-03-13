const NUM_CELLS = 19;
const DIRECTIONS = [
  [0, 1, 2],
  [2, 3, 4],
  [4, 5, 6],
  [6, 7, 8],
  [8, 9, 10],
  [10, 11, 12],
  [12, 13, 14],
  [14, 15, 16],
  [16, 17, 18],
];

const generateCells = () => {
  const cells = [];
  for (let i = 0; i < NUM_CELLS; i++) {
    cells.push(i + 1);
  }
  return cells;
};

const calculateTotalSum = (cells) => {
  let totalSum = 0;
  for (const direction of DIRECTIONS) {
    totalSum += cells[direction[0]] + cells[direction[1]] + cells[direction[2]];
  }
  return totalSum;
};

const findValidSolutions = (cells) => {
  const validSolutions = [];
  const totalSum = calculateTotalSum(cells);
  for (let i = 0; i < NUM_CELLS; i++) {
    for (let j = i + 1; j < NUM_CELLS; j++) {
      for (let k = j + 1; k < NUM_CELLS; k++) {
        const newCells = [...cells];
        [newCells[i], newCells[j], newCells[k]] = [newCells[j], newCells[k], newCells[i]];
        const newTotalSum = calculateTotalSum(newCells);
        if (newTotalSum === totalSum) {
          validSolutions.push(newCells);
        }
      }
    }
  }
  return validSolutions;
};

const displaySolutions = (solutions) => {
  const hexagonElement = document.getElementById("hexagon");
  hexagonElement.innerHTML = "";
  for (const solution of solutions) {
    const hexagonRow = document.createElement("div");
    hexagonRow.classList.add("hexagon-row");
    for (let i = 0; i < NUM_CELLS; i++) {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      cellElement.textContent = solution[i];
      hexagonRow.appendChild(cellElement);
    }
    hexagonElement.appendChild(hexagonRow);
  }
};

const generateSolutions = () => {
  const cells = generateCells();
  const solutions = findValidSolutions(cells);
  displaySolutions(solutions);
};

generateSolutions();
