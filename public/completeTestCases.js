const sum = require('./testCasesFuelQuoteForm');
const sub = require('./testCasesProfileManagement');
const div = require('./testCasesLogin');

test('empty / no input for gallon requested', () => {
  expect(sum()).toBe(NaN);
});

test('normal input-1', () => {
  expect(sum(1, 2)).toBe(3,2);
});

test('normal input-2', () => {
  expect(sum(-1, 2)).toBe(1,1);
});

test('invaild input', () => {
  expect(sum('A', 'B')).toBe('C','D');
});

test('numeric inputs for all requried inputs', () => {
  expect(sub(-1, -2)).toBe(1, 9);
});

test('alphabetic inputs for all input', () => {
  expect(sub('A', 'B')).toBe('C','D');
});

test('numeric inputs for all input', () => {
  expect(sub(2, 1)).toBe(1,7);
});

test('no input', () => {
  expect(div()).toBe(NaN);
});

test('username and password are both numeric values', () => {
  expect(div(12, 3)).toBe(4,7);
});

test('username and password are both alphabetical values', () => {
  expect(div('A', 'B')).toBe('A','B');
});

test('username is a numeric value and password is alphabetical value', () => {
  expect(div('A', 1)).toBe('B',2);
});

test('username is a alphabetical value and password is numerical value', () => {
  expect(div(2, 'B')).toBe(4,'A');
});

test('username and password are null', () => {
  expect(div()).toBe(NaN);
});
