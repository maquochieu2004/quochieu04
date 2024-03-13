const nodes = ["A", "B", "C", "D", "E"];
const edges = [
  ["A", "B", 4],
  ["A", "C", 2],
  ["B", "C", 1],
  ["B", "D", 5],
  ["C", "D", 8],
  ["C", "E", 7],
  ["D", "E", 9],
];

const displayNodes = (nodes) => {
  const nodesElement = document.getElementById("nodes");
  nodesElement.innerHTML = "";
  for (const node of nodes) {
    const nodeElement = document.createElement("li");
    nodeElement.textContent = node;
    nodesElement.appendChild(nodeElement);
  }
};

const displayEdges = (edges) => {
  const edgesElement = document.getElementById("edges");
  edgesElement.innerHTML = "";
  for (const edge of edges) {
    const edgeElement = document.createElement("li");
    edgeElement.textContent = `${edge[0]} -- ${edge[1]} (cân nặng: ${edge[2]})`;
    edgesElement.appendChild(edgeElement);
  }
};

const kruskal = (graph) => {
  // Sắp xếp các cạnh theo trọng số tăng dần
  const sortedEdges = graph.edges.sort((a, b) => a[2] - b[2]);

  // Tạo tập hợp các tập hợp con
  const subsets = new Map();
  for (const node of graph.nodes) {
    subsets.set(node, new Set([node]));
  }

  // Cây khung nhỏ nhất
  const mst = [];

  // Duyệt qua các cạnh theo thứ tự tăng dần
  for (const edge of sortedEdges) {
    const [source, destination] = edge;

    // Tìm tập hợp con chứa source
    const sourceSubset = subsets.get(source);

    // Tìm tập hợp con chứa destination
    const destinationSubset = subsets.get(destination);

    // Nếu source và destination thuộc cùng tập hợp con, bỏ qua cạnh này
    if (sourceSubset === destinationSubset) {
      continue;
    }

    // Thêm cạnh vào cây khung nhỏ nhất
    mst.push(edge);

    // Hợp nhất hai tập hợp con
    subsets.set(destination, new Set([...sourceSubset, ...destinationSubset]));
  }

  return mst;
};

const solveProblem = () => {
  const graph = {
    nodes: nodes,
    edges: edges,
  };

  displayNodes(nodes);
  displayEdges(edges);

  console.log(`Cây khung nhỏ nhất:`);
  const mst = kruskal(graph);
  for (const edge of mst) {
    console.log(`${edge[0]} -- ${edge[1]}`);
  }
};

document.getElementById("solve-button").addEventListener("click", solveProblem);

solveProblem();
