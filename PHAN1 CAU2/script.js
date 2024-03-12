const numShirtColors = 5;
const numPantColors = 4;

const calculateTotalCombinations = () => {
  return numShirtColors * numPantColors;
};

const displayResult = () => {
  const resultElement = document.getElementById("result");
  resultElement.textContent = calculateTotalCombinations();
};

displayResult();

