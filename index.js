const readline = require('readline');
const util = require('util');

const Board = require('./board');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const board = new Board();

rl.questionAsync = (...args) =>
  new Promise((resolve) => rl.question(...args, resolve));

console.log(`tic-tac-toe started`);

const round = async (player = 'X') => {
  console.log(board.render());
  const answer = await rl.questionAsync(`Player ${player}'s turn
Enter coordinates seperated by a comma:
`);
  const coordinates = answer.split(',').map((coordinate) => Number(coordinate));
  console.log(`Toggle piece at ${coordinates}`);
  board.togglePiece(player, ...coordinates);

  if (player === 'X') return round('O');
  if (player === 'O') return round('X');
};

round();
