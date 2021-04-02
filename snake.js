const keypress = require('keypress');
const colors = require('colors');

// Game parameters:
const FIELD_WIDTH = 70;
const FIELD_HEIGHT = 20;
const TOTAL_FIELD_HEIGHT = FIELD_HEIGHT + 2; // Field height considering the border.
const TOTAL_FIELD_WIDTH = FIELD_WIDTH + 2; // Field width considering the border.
const INITIAL_SNAKE_SIZE = 3;
const HORIZONTAL_BORDER = '=';
const VERTICAL_BORDER = '*';
const SNAKE_SEGMENT = 'o';
let field = [];

// Get random number between 0 and 1, including both.
function inclusiveRandom() {
  return Math.ceil(Math.random() * 1000000000000) / 1000000000000;
}

// Get random integer between min and max, including both.
// Adapted from:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  return Math.floor(inclusiveRandom() * (max - min) + min);
}

// Randomly set the initial position for the snake.
function setInitialSnakePosition() {
  let initialRow = getRandomInt(INITIAL_SNAKE_SIZE + 1, FIELD_HEIGHT + 1 - INITIAL_SNAKE_SIZE);
  let initialCol = getRandomInt(INITIAL_SNAKE_SIZE + 1, FIELD_WIDTH + 1 - INITIAL_SNAKE_SIZE);

  field[initialRow][initialCol] = SNAKE_SEGMENT;
}

// Field initialization function:
// => Build top and bottom field borders.
function buildFieldBorderRow() {
  let borderRow = [];

  for (let colIndex of Array(TOTAL_FIELD_WIDTH).keys()) {
    borderRow.push(HORIZONTAL_BORDER);
  }

  return borderRow;
}

// Field initialization function:
// => Build left and right field borders.
function buildFieldRow() {
  let row = [];
  row[0] = VERTICAL_BORDER;

  for (let colIndex of Array(FIELD_WIDTH).keys()) {
    row.push(' ');
  }
  row.push(VERTICAL_BORDER);

  return row;
}

// Field initialization function:
// => Call field border building functions according to current row index.
function getFieldRow(rowIndex) {
  if (rowIndex === 0 || rowIndex === TOTAL_FIELD_HEIGHT - 1) {
    return buildFieldBorderRow();
  }

  return buildFieldRow();
}

// Field initialization function:
// => Fill the field with the rows.
function initializeField() {
  let row;

  for (let rowIndex of Array(TOTAL_FIELD_HEIGHT).keys()) {
    row = getFieldRow(rowIndex);
    field.push(row);
  }
  setInitialSnakePosition();
}

// Convert the row array into a string in order to print it.
function fieldRowToString(rowArray) {
  let rowString = '';

  for (let col of rowArray) {
    rowString += col;
  }

  return rowString;
}

// Print the current state of the field.
function printField() {
  for (let row of field) {
    console.log(fieldRowToString(row));
  }
}

// Clear the console and print the current state of the field.
function updateFrame() {
  console.clear();
  printField();
}
