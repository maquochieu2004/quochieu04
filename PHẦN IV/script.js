const items = [
    { weight: 3, value: 4 },
    { weight: 5, value: 7 },
    { weight: 7, value: 10 },
    { weight: 8, value: 12 },
  ];
  
  const maxWeight = 15;
  
  const calculateMaxValue = (items, maxWeight) => {
    const dp = new Array(items.length + 1).fill(0).map(() => new Array(maxWeight + 1).fill(0));
  
    for (let i = 1; i <= items.length; i++) {
      const item = items[i - 1];
      for (let j = 1; j <= maxWeight; j++) {
        if (item.weight > j) {
          dp[i][j] = dp[i - 1][j];
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - item.weight] + item.value);
        }
      }
    }
  
    return dp[items.length][maxWeight];
  };
  
  const findOptimalSolution = (items, maxWeight) => {
    const dp = new Array(items.length + 1).fill(0).map(() => new Array(maxWeight + 1).fill(null));
  
    for (let i = 1; i <= items.length; i++) {
      const item = items[i - 1];
      for (let j = 1; j <= maxWeight; j++) {
        if (item.weight > j) {
          dp[i][j] = dp[i - 1][j];
        } else {
          const previousValue = dp[i - 1][j];
          const withItemValue = dp[i - 1][j - item.weight] + item.value;
          dp[i][j] = previousValue > withItemValue ? previousValue : withItemValue;
        }
      }
    }
  
    let i = items.length;
    let j = maxWeight;
    const solution = [];
    while (i > 0 && j > 0) {
      if (dp[i][j] === dp[i - 1][j]) {
        i--;
      } else {
        solution.push(items[i - 1]);
        i--;
        j -= items[i].weight;
      }
    }
  
    return solution.reverse();
  };
  
  const displayItems = (items) => {
    const itemsElement = document.getElementById("items");
    itemsElement.innerHTML = "";
    for (const item of items) {
      const itemElement = document.createElement("li");
      itemElement.textContent = `(Trọng lượng: ${item.weight}, Giá trị: ${item.value})`;
      itemsElement.appendChild(itemElement);
    }
  };
  
  const displayMaxValue = (maxValue) => {
    const maxValueElement = document.getElementById("max-value");
    maxValueElement.textContent = maxValue;
  };
  
  const solveProblem = () => {
    const maxValue = calculateMaxValue(items, maxWeight);
    const solution = findOptimalSolution(items, maxWeight);
  
    displayMaxValue(maxValue);
    console.log("Giải pháp tối ưu:", solution);
  };
  
  document.getElementById("solve-button").addEventListener("click", solveProblem);
  
  displayItems(items);
  