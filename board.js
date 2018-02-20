module.exports = class Board {
  constructor(height = 3, width = 3) {
    this.height = height;
    this.width = width;
    this.board = [];
    for (let i = 0; i < height; i += 1) {
      this.board.push(new Array(width).fill('.'));
    }
  }

  hasBeenToggled(x, y) {
    if (this.board[x][y] !== '.') return true;
    return false;
  }

  togglePiece(piece, x, y) {
    this.board[x][y] = piece;
  }

  render() {
    let renderedBoard = '';

    for (let i = 0; i < this.board.length; i += 1) {
      renderedBoard += ` ${this.board[i].join(' | ')}`;

      if (i < this.board.length - 1) {
        renderedBoard += '\n---|---|---\n';
      }
    }

    return renderedBoard;
  }

  check() {
    const checkRow = (row) => {
      if (row.indexOf('.') === -1 && row.every((piece) => piece === row[0]))
        return true;
      return false;
    };

    // check diagonals
    const leftDiagonal = [];
    for (let i = 0; i < this.board.length; i += 1) {
      leftDiagonal.push(this.board[i][i]);
    }

    if (checkRow(leftDiagonal)) {
      return `Left diagonal win, ${leftDiagonal[0]}`;
    }

    const rightDiagonal = [];
    for (
      let i = 0, o = this.board.length - 1;
      i < this.board.length;
      i += 1, o -= 1
    ) {
      rightDiagonal.push(this.board[i][o]);
    }

    if (checkRow(rightDiagonal)) {
      return `Right diagonal win, ${rightDiagonal[0]}`;
    }

    // check horizontals
    for (let i = 0; i < this.board.length; i += 1) {
      if (checkRow(this.board[i])) {
        return `Horizontal win, ${this.board[i][0]}`;
      }
    }

    // check verticals
    for (let i = 0; i < this.board.length; i += 1) {
      const vertical = [];

      for (let o = 0; o < this.board[i].length; o += 1) {
        vertical.push(this.board[o][i]);
      }

      if (checkRow(vertical)) {
        return `Vertical win, ${vertical[0]}`;
      }
    }

    return false;
  }
};
