module.exports = class Board {
  constructor(height = 3, width = 3) {
    this.board = [];
    for (let i = 0; i < height; i += 1) {
      this.board.push(new Array(width).fill('.'));
    }
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
};
