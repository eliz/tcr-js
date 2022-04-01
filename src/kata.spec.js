// Any live cell with fewer than two live neighbours dies, as if by underpopulation.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overpopulation.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
// 2 will live, 3 will give birth, 4 will die


function _gameOfLife (input) {
  const nextGeneration = Array(input.length).fill().map(entry => Array(input[0].length).fill(' '))

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
      const numberOfNeighbours = _numberOfNeighboursForCell(row, col)

      if ((_cellIsAliveCount(row, col) && numberOfNeighbours === 2)
        || (numberOfNeighbours === 3)) {
        nextGeneration[row][col] = '*'
      }
    }
  }

  return nextGeneration;
}

function _print (input) {
  let output = ''
  output += '==============================\n'
  input.forEach(item => {
    item.forEach(i => {
      output += i
    })
    output += '\n'
  })
  output += '==============================\n'
  console.log(output)
}

function gameOfLife (input, numberOfGeneration = 1) {
  for (let i = 0; i < numberOfGeneration; i++) {
    input = _gameOfLife(input)
    _print(input)
  }
  return input
}

describe('Game Of Life', () => {
  describe('3 by 3', () => {
    describe('1 neighbour', () => {
      it('one cell with 0 neighbours, will die', () => {
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

      it('one cell with 1 neighbour, will die', () => {
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
    });

    describe('2 neighbours', () => {

      it('one cell with 2 neighbours (left+right), will live', () => {
        expect(gameOfLife(
          [[' ', ' ', ' '],
          ['*', '*', '*'],
          [' ', ' ', ' ']]
        )).toEqual(
          [[' ', '*', ' '],
          [' ', '*', ' '],
          [' ', '*', ' ']]
        );
      })

      it('one cell with 2 neighbours (top+btm), will live', () => {
        expect(gameOfLife(
          [[' ', '*', ' '],
          [' ', '*', ' '],
          [' ', '*', ' ']]
        )).toEqual(
          [[' ', ' ', ' '],
          ['*', '*', '*'],
          [' ', ' ', ' ']]
        );
      })

      it('one cell with 2 neighbours (diagonal), will live', () => {
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

      it('one cell with 2 neighbours (diagonal + bottom), will live', () => {
        expect(gameOfLife(
          [['*', ' ', ' '],
          [' ', '*', ' '],
          [' ', '*', ' ']]
        )).toEqual(
          [[' ', ' ', ' '],
          ['*', '*', ' '],
          [' ', ' ', ' ']]
        );
      })
    })

    describe('3 neighbours', () => {

      it('one dead cell with 3 neighbours, will become alive', () => {
        expect(gameOfLife(
          [[' ', ' ', ' '],
          [' ', '*', '*'],
          [' ', '*', ' ']]
        )).toEqual(
          [[' ', ' ', ' '],
          [' ', '*', '*'],
          [' ', '*', '*']]
        );
      })

      it('one dead cell with 3 neighbours, will become alive', () => {
        expect(gameOfLife(
          [[' ', '*', ' '],
          [' ', ' ', '*'],
          [' ', '*', ' ']]
        )).toEqual(
          [[' ', ' ', ' '],
          [' ', '*', '*'],
          [' ', ' ', ' ']]
        );
      })

    })

    describe('4 neighbours', () => {
      it('one live cell with 4 neighbours, will die', () => {
        expect(gameOfLife(
          [[' ', '*', ' '],
          ['*', '*', '*'],
          [' ', '*', ' ']]
        )).toEqual(
          [['*', '*', '*'],
          ['*', ' ', '*'],
          ['*', '*', '*']]
        );
      })
    })

    describe('multi generation', () => {
      it.only('2 generation', () => {
        expect(gameOfLife(
          [[' ', '*', ' '],
          [' ', '*', ' '],
          [' ', '*', ' ']], 2
        )).toEqual(
          [[' ', '*', ' '],
          [' ', '*', ' '],
          [' ', '*', ' ']]
        );
      })

      it('3 generations', () => {
        expect(gameOfLife(
          [[' ', ' ', ' ', ' ', ' '],
          [' ', ' ', '*', '*', '*'],
          [' ', '*', '*', '*', ' '],
          [' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ']], 1
        )).toEqual(
          [[' ', ' ', ' ', '*', ' '],
          [' ', '*', ' ', ' ', '*'],
          [' ', '*', ' ', ' ', '*'],
          [' ', ' ', '*', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ']]
        );

        expect(gameOfLife(
          [[' ', ' ', ' ', ' ', ' '],
          [' ', ' ', '*', '*', '*'],
          [' ', '*', '*', '*', ' '],
          [' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ']], 2
        )).toEqual(
          [[' ', ' ', ' ', ' ', ' '],
          [' ', ' ', '*', '*', '*'],
          [' ', '*', '*', '*', ' '],
          [' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ']]
        );

        expect(gameOfLife(
          [[' ', ' ', ' ', ' ', ' '],
          [' ', ' ', '*', '*', '*'],
          [' ', '*', '*', '*', ' '],
          [' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ']], 3
        )).toEqual(
          [[' ', ' ', ' ', '*', ' '],
          [' ', '*', ' ', ' ', '*'],
          [' ', '*', ' ', ' ', '*'],
          [' ', ' ', '*', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ']]
        );
      })
    })
  })
});

// https://playgameoflife.com/

// What can we do better next round
// - Use 0 & 1 instead of string manipulation
// - Test for glider type
// - How to display: printing for each generation
// - Borders? What other representation to use if we don't use 2D array.