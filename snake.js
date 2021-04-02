const keypress = require('keypress');
const colors = require('colors');

// Game parameters:
const FIELD_WIDTH = 70;
const FIELD_HEIGHT = 20;
const TOTAL_FIELD_HEIGHT = FIELD_HEIGHT + 2; // Field height considering the border.
const TOTAL_FIELD_WIDTH = FIELD_WIDTH + 2; // Field width considering the border.
const INITIAL_SNAKE_SIZE = 3;
const UP_VECTOR = 0;
const RIGHT_VECTOR = 1;
const DOWN_VECTOR = 2;
const LEFT_VECTOR = 3;
const HORIZONTAL_BORDER = '=';
const VERTICAL_BORDER = '*';
const SNAKE_SEGMENT = 'o';
let field = [];
let currentSnakePosition = { row: null, col: null };
let currentMvmtVector = RIGHT_VECTOR;
let difficulty = { easy: 80, medium: 60, hard: 40 };
let chosenDifficulty = difficulty.easy;

// Function taken from:
// https://stackoverflow.com/questions/16873323/javascript-sleep-wait-before-continuing
function sleep(milliseconds) {
  let start = new Date().getTime();
  for (let i = 0; i < 1e7; i += 1) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

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

// Field initialization function:
// => Randomly set the initial position for the snake.
function setInitialSnakePosition() {
  let initialRow = getRandomInt(INITIAL_SNAKE_SIZE + 1, FIELD_HEIGHT + 1 - INITIAL_SNAKE_SIZE);
  let initialCol = getRandomInt(INITIAL_SNAKE_SIZE + 1, FIELD_WIDTH + 1 - INITIAL_SNAKE_SIZE);

  field[initialRow][initialCol] = SNAKE_SEGMENT;
  currentSnakePosition.row = initialRow;
  currentSnakePosition.col = initialCol;
}

// Field initialization function:
// => Build top and bottom field borders.
function buildFieldBorderRow() {
  let borderRow = [];

  for (let colIndex = 0; colIndex < TOTAL_FIELD_WIDTH; colIndex += 1) {
    borderRow.push(HORIZONTAL_BORDER);
  }

  return borderRow;
}

// Field initialization function:
// => Build left and right field borders.
function buildFieldRow() {
  let row = [];
  row[0] = VERTICAL_BORDER;

  for (let colIndex = 0; colIndex < FIELD_WIDTH; colIndex += 1) {
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
// => Fill the field with the rows and set initial positions.
function initializeField() {
  let row;

  for (let rowIndex of Array(TOTAL_FIELD_HEIGHT).keys()) {
    row = getFieldRow(rowIndex);
    field.push(row);
  }
  setInitialSnakePosition();
}

// Convert the row array to a string in order to print it.
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

// Clear the console, print the current state of the field and wait.
function updateFrame() {
  console.clear();
  printField();
  sleep(chosenDifficulty);
}

// Function to check for collision with field borders.
// NOT IMPLEMENTED YET
function canMove() {
  return true;
}

function autoMoveRight() {
  while (currentMvmtVector === RIGHT_VECTOR && canMove()) {
    field[currentSnakePosition.row][currentSnakePosition.col] = ' ';
    currentSnakePosition.col += 1;
    field[currentSnakePosition.row][currentSnakePosition.col] = SNAKE_SEGMENT;
    updateFrame();
  }
}

// Uncomment lines bellow to test the game running in a basic flow:
// initializeField();
// console.clear();
// printField();
// autoMoveRight();
