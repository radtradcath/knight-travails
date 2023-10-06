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

class Node {
  constructor(position) {
    this.vertex = position;
    this.edges = [];
  }
}

class Knight {
  constructor() {}

  knightMoves(initial, final, q = [initial], enqueued = [initial]) {
    let initialEdges = findEdges(initial);

    let queue = q;
    let visited = enqueued;
    while (queue.length > 0) {
      if (queue[0][0] === final[0] && queue[0][1] === final[1]) {
        return "found";
      }
      initialEdges.forEach((edge) => {
        if (!isIncluded(enqueued, edge)) {
          queue.push(edge);
          visited.push(edge);
        }
      });
      queue.shift();
      this.knightMoves(queue[0], final, queue, visited);
    }
  }
}

const knight = new Knight();
console.log(knight.knightMoves([0, 0], [7,7]));

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

// function buildGraph(root) {
//   possibleMoves.forEach((move) => {
//     if (
//       root.vertex[0] + move[0] >= 0 &&
//       root.vertex[0] + move[0] <= 7 &&
//       root.vertex[1] + move[1] >= 0 &&
//       root.vertex[1] + move[1] <= 7
//     ) {
//       root.edges.push(
//         new Node([root.vertex[0] + move[0], root.vertex[1] + move[1]])
//       );
//     }
//     for (let i = 0; i < root.edges.length; i++) {
//       buildGraph(root.edges[i]);
//     }
//   });
//   return root;
// }
