const readline = require('readline');
const Board = require('./board');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const board = new Board();

rl.questionAsync = (...args) =>
  new Promise((resolve) => rl.question(...args, resolve));

console.log('tic-tac-toe started\n');

const round = async (player = 'X') => {
  console.log(board.render());
  const answer = await rl.questionAsync(`
Player ${player}'s turn
Enter coordinates seperated by a comma:
`);
  const coordinates = answer.split(',').map((coordinate) => Number(coordinate));
  console.log(`
Place a(n) ${player} at ${coordinates}
`);

  if (
    coordinates[0] > board.height - 1 ||
    coordinates[1] > board.width - 1 ||
    coordinates[0] < 0 ||
    coordinates[1] < 0
  ) {
    console.log(`Invalid location
`);
    return round(player);
  }

  if (board.hasBeenToggled(...coordinates)) {
    console.log(`Piece already placed at ${coordinates}
`);
    return round(player);
  }
  board.togglePiece(player, ...coordinates);

  const status = board.check();
  if (status) {
    rl.close();
    console.log(board.render());
    return console.log(status);
  }

  if (player === 'X') return round('O');
  if (player === 'O') return round('X');
};

round();
