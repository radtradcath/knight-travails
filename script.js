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

class Knight {
  constructor() {}

  knightMoves(initial, final, q = [[initial, 0]], visited = [initial]) {
    let queue = q; //[[0,0], 0]
    let sequence = visited; //[[0,0]];
    let initialEdges = findEdges(queue[0][0]); //[[1,2], [2,1]]

    while (queue.length > 0) {
      let [position, moves] = queue[0];
      if (position[0] === final[0] && position[1] === final[1]) {
        let untilFinal = sequence.slice(
          0,
          sequence.findIndex(
            (element) => element[0] === final[0] && element[1] === final[1]
          ) + 1
        );
        let path = reverseTree(position, sequence[0], untilFinal);
        path.unshift(final);

        let reversed = [];
        for (let i = path.length - 1; i >= 0; i--) {
          reversed.push(path[i]);
        }
        console.log(`You made it in ${moves} moves. Here's your path:`);
        reversed.forEach((pos) => {
          console.log(pos);
        });
        return;
      }

      for (let edge of initialEdges) {
        if (!isIncluded(sequence, edge)) {
          sequence.push(edge);
          queue.push([edge, moves + 1]);
        }
      }
      queue.shift();

      return this.knightMoves(position, final, queue, sequence);
    }
  }
}

function reverseTree(pos, initial, visited, arr = []) {
  let moves = arr;
  let posEdges = findEdges(pos);
  if (pos[0] === initial[0] && pos[1] === initial[1]) {
    return moves;
  }

  for (let i = 0; i < posEdges.length; i++) {
    if (isIncluded(visited, posEdges[i])) {
      moves.push(posEdges[i]);
      break;
    }
  }
  let untilNext = visited.slice(
    0,
    visited.findIndex(
      (element) =>
        element[0] === moves[moves.length - 1][0] &&
        element[1] === moves[moves.length - 1][1]
    ) + 1
  );

  return reverseTree(moves[moves.length - 1], initial, untilNext, moves);
}

let knight = new Knight();

knight.knightMoves([6, 5], [1, 3]);
//You made it in 3 moves. Here's your path:
// [6, 5]
// [5, 3]
// [3, 4]
// [1, 3]
