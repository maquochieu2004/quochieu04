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

const dijkstra = (graph, startNode) => {
  // Khởi tạo tập hợp các nút đã được thăm
  const visited = new Set();

  // Khởi tạo bảng khoảng cách
  const distances = new Map();
  for (const node of graph.nodes) {
    distances.set(node, Infinity);
  }
  distances.set(startNode, 0);

  // Lặp lại cho đến khi tất cả các nút được thăm
  while (visited.size < graph.nodes.length) {
    // Tìm nút có khoảng cách nhỏ nhất chưa được thăm
    let minNode = null;
    let minDistance = Infinity;
    for (const [node, distance] of distances.entries()) {
      if (!visited.has(node) && distance < minDistance) {
        minNode = node;
        minDistance = distance;
      }
    }

    // Đánh dấu nút hiện tại là đã được thăm
    visited.add(minNode);

    // Cập nhật khoảng cách đến các nút lân cận
    for (const neighbor of graph.neighbors(minNode)) {
      const newDistance = distances.get(minNode) + graph.weight(minNode, neighbor);
      if (newDistance < distances.get(neighbor)) {
        distances.set(neighbor, newDistance);
      }
    }
  }

  return distances;
};

const solveProblem = () => {
  const graph = {
    nodes: nodes,
    edges: edges,
  };

  displayNodes(nodes);
  displayEdges(edges);

  const startNode = document.getElementById("start-node").value;

  console.log(`Khoảng cách ngắn nhất từ ${startNode} đến các nút khác:`);
  const distances = dijkstra(graph, startNode);
  for (const [node, distance] of distances.entries()) {
    console.log(`${node}: ${distance}`);
  }
};

document.getElementById("solve-button").addEventListener("click", solveProblem);

solveProblem();
