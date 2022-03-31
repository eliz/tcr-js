// Any live cell with fewer than two live neighbours dies, as if by underpopulation.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overpopulation.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
// 2 will live, 3 will give birth, 4 will die



function gameOfLife (input) {
  const copyOfInput = JSON.parse(JSON.stringify(input));
  const lastRow = input.length - 1
  const lastCol = input[0].length - 1

  const _cellIsAliveCount = (row, col) => (input[row] && input[row][col] === '*') ? 1 : 0

  const _numberOfNeighboursForCell = (row, col) => {
    let cellsStatus = [
      _cellIsAliveCount(row - 1, col - 1), _cellIsAliveCount(row - 1, col), _cellIsAliveCount(row - 1, col + 1),
      _cellIsAliveCount(row, col - 1), _cellIsAliveCount(row, col + 1),
      _cellIsAliveCount(row + 1, col - 1), _cellIsAliveCount(row + 1, col), _cellIsAliveCount(row + 1, col + 1)
    ]

    return cellsStatus.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );
  }

  for (let row = 0; row <= lastRow; row++) {
    for (let col = 0; col <= lastCol; col++) {

      if (_cellIsAliveCount(row, col) &&
        _numberOfNeighboursForCell(row, col) === 2
      ) {
        copyOfInput[row][col] = '*'
      } else {
        copyOfInput[row][col] = ' '
      }
    }
  }

  return copyOfInput;
}

describe('Game Of Life', () => {
  it('one cell with 0 neighbours in a 3 by 3, will die', () => {
    expect(gameOfLife(
      [[' ', ' ', ' '],
      [' ', '*', ' '],
      [' ', ' ', ' ']]
    )).toEqual(
      [[' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']]
    );
  })

  it('one cell with 1 neighbour in a 3 by 3, will die', () => {
    expect(gameOfLife(
      [[' ', ' ', ' '],
      [' ', '*', '*'],
      [' ', ' ', ' ']]
    )).toEqual(
      [[' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']]
    );
  })

  describe('2 neighbours', () => {

    it('one cell with 2 neighbours (left+right) in a 3 by 3, will live', () => {
      expect(gameOfLife(
        [[' ', ' ', ' '],
        ['*', '*', '*'],
        [' ', ' ', ' ']]
      )).toEqual(
        [[' ', ' ', ' '],
        [' ', '*', ' '],
        [' ', ' ', ' ']]
      );
    })

    it('one cell with 2 neighbours (top+btm) in a 3 by 3, will live', () => {
      expect(gameOfLife(
        [[' ', '*', ' '],
        [' ', '*', ' '],
        [' ', '*', ' ']]
      )).toEqual(
        [[' ', ' ', ' '],
        [' ', '*', ' '],
        [' ', ' ', ' ']]
      );
    })

    it('one cell with 2 neighbours (diagonal) in a 3 by 3, will live', () => {
      expect(gameOfLife(
        [['*', ' ', ' '],
        [' ', '*', ' '],
        [' ', ' ', '*']]
      )).toEqual(
        [[' ', ' ', ' '],
        [' ', '*', ' '],
        [' ', ' ', ' ']]
      );
    })

    it('one cell with 2 neighbours (diagonal + bottom) in a 3 by 3, will live', () => {
      expect(gameOfLife(
        [['*', ' ', ' '],
        [' ', '*', ' '],
        [' ', '*', ' ']]
      )).toEqual(
        [[' ', ' ', ' '],
        [' ', '*', ' '],
        [' ', ' ', ' ']]
      );
    })
  })

  describe.skip('3 neighbours', () => {

    it('one dead cell with 3 neighbours in a 3 by 3, will become alive', () => {
      expect(gameOfLife(
        [[' ', ' ', ' '],
        ['*', ' ', '*'],
        [' ', '*', ' ']]
      )).toEqual(
        [[' ', ' ', ' '],
        [' ', '*', ' '],
        [' ', ' ', ' ']]
      );
    })

  })
});