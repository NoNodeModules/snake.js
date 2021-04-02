const keypress = require('keypress');
const colors = require('colors');
// GAME PARAMATERS
const FIELD_WIDTH = 70;
const FIELD_HEIGHT = 50;
const BORDER_SIZE = 1;
const TOTAL_FIELD_HEIGHT = FIELD_HEIGHT + 2 * BORDER_SIZE;
const TOTAL_FIELD_WIDTH = FIELD_WIDTH + 2 * BORDER_SIZE;
const HORIZONTAL_BORDER = '=';
const VERTICAL_BORDER = '*';
const SNAKE_SEGMENT = 'o';
let field = [];

function buildFieldBorderRow() {
  let borderRow = '';

  for (let colIndex of Array(TOTAL_FIELD_WIDTH).keys()) {
    borderRow += HORIZONTAL_BORDER;
  }

  return borderRow;
}

function buildFieldRow() {
  let row = VERTICAL_BORDER;

  for (let colIndex of Array(FIELD_WIDTH).keys()) {
    row += ' ';
  }
  row += VERTICAL_BORDER;

  return row;
}

function getFieldRow(rowIndex) {
  if (rowIndex === 0 || rowIndex === TOTAL_FIELD_HEIGHT - 1) {
    return buildFieldBorderRow();
  }

  return buildFieldRow();
}

function initializeField() {
  let row;

  for (let rowIndex of Array(TOTAL_FIELD_HEIGHT).keys()) {
    row = getFieldRow(rowIndex);
    field.push(row);
  }
}
