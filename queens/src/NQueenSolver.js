const N = 4;

let ld = new Array(30).fill(0);
let rd = new Array(30).fill(0);
let cl = new Array(30).fill(0);

function isSafe(board, row, col) {
  if (ld[row - col + N - 1] !== 1 && rd[row + col] !== 1 && cl[row] !== 1) {
    return true;
  }
  return false;
}

function solveNQUtil(board, col) {
  if (col >= N) return true;

  for (let i = 0; i < N; i++) {
    if (isSafe(board, i, col)) {
      board[i][col] = 1;
      ld[i - col + N - 1] = rd[i + col] = cl[i] = 1;

      if (solveNQUtil(board, col + 1)) return true;

      board[i][col] = 0; 
      ld[i - col + N - 1] = rd[i + col] = cl[i] = 0;
    }
  }

  return false;
}

function solveNQ(board) {
  if (solveNQUtil(board, 0) === false) {
    return false;
  }
  return true;
}

export { isSafe, solveNQ };
