const keypress = require('keypress');
const colors = require('colors');

// Game parameters:
const FIELD_WIDTH = 70;
const FIELD_HEIGHT = 20;
const TOTAL_FIELD_HEIGHT = FIELD_HEIGHT + 2; // Field height considering the border.
const TOTAL_FIELD_WIDTH = FIELD_WIDTH + 2; // Field width considering the border.
const HORIZONTAL_BORDER = '=';
const VERTICAL_BORDER = '*';
const SNAKE_SEGMENT = 'o';
let field = [];

// Field initialization function:
// => Build top and bottom field borders.
function buildFieldBorderRow() {
  let borderRow = '';

  for (let colIndex of Array(TOTAL_FIELD_WIDTH).keys()) {
    borderRow += HORIZONTAL_BORDER;
  }

  return borderRow;
}

// Field initialization function:
// => Build left and right field borders.
function buildFieldRow() {
  let row = VERTICAL_BORDER;

  for (let colIndex of Array(FIELD_WIDTH).keys()) {
    row += ' ';
  }
  row += VERTICAL_BORDER;

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
}

// Print the current state of the field.
function printField() {
  for (let row of field) {
    console.log(row);
  }
}

// Clear the console and print the current state of the field.
function updateFrame() {
  console.clear();
  printField();
}
