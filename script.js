let possibleMoves = [
  [2, 1],
  [-1, -2],
  [-2, -1],
  [-1, 2],
  [1, -2],
  [-2, 1],
  [2, -1],
  [1, 2],
];

function findEdges(vertex) {
  let edges = [];
  possibleMoves.forEach((move) => {
    if (
      vertex[0] + move[0] >= 0 &&
      vertex[0] + move[0] <= 7 &&
      vertex[1] + move[1] >= 0 &&
      vertex[1] + move[1] <= 7
    ) {
      edges.push([vertex[0] + move[0], vertex[1] + move[1]]);
    }
  });
  return edges;
}

function isIncluded(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (value[0] === array[i][0] && value[1] === array[i][1]) {
      return true;
    }
  }
  return false;
}

class Node {
  constructor(position) {
    this.vertex = position;
    this.edges = [];
  }
}

function buildGraph() {
  let graph = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let node = new Node([i, j]);
      node.edges = findEdges(node.vertex);
      graph.push(node);
    }
  }
  return graph;
}

class Knight {
  constructor() {}

  knightMoves(initial, final, q = [[initial, 0]], visited = [initial]) {
    let queue = q; //[[0,0], 0]
    let sequence = visited; //[[0,0]];
    let initialEdges = findEdges(queue[0][0]); //[[1,2], [2,1]]
    
    while (queue.length > 0) {      
      let [position, moves] = queue[0];
      if (position[0] === final[0] && position[1] === final[1]) {
        return position;
      }

      for (let edge of initialEdges) {
        if (!isIncluded(sequence, edge)) {
          sequence.push(edge);
          queue.push([edge, moves + 1]);
        }
      }
      queue.shift();
      console.log(sequence)
      this.knightMoves(position, final, queue, sequence);
    }
  }
}

let knight = new Knight();

console.log(knight.knightMoves([0, 0], [3,3]));
console.log(knight.knightMoves([3, 3], [0,0]));
