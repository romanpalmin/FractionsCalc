/**
 * Reverse polish notation
 *
 * Методы для работы с обратной польской записью
 * links:
 * * https://en.wikipedia.org/wiki/Reverse_Polish_notation
 *
 * create 03.07.2018 rpalmin
 */

import * as fm from './fractions-maths';

/**
 * Получает на вход массив, состоящий из последовательных операндов и операторов в инфиксной записи,
 * приводит массив в массив постфиксной записи (в обратной польской записи). Использован классический
 * стековый алгоритм.
 *
 * Example: 'a + b * c - d / e'  ===> 'a b c * + d e / -'
 *
 * @param infixArr
 */
const generate = infixArr => {
  let postFix = [];
  let operationsStack = [];
  const operators = {
    "/": {precedence: 3}, "*": {precedence: 3},
    "+": {precedence: 2}, "-": {precedence: 2}
  };

  for (let i = 0; i < infixArr.length; i++) {
    let token = infixArr[i];
    if (token.type === 'operand') {
      postFix.push(token);
    } else {
      let op1 = token;
      let op2 = operationsStack[operationsStack.length - 1];
      while (
        op2 && operators[op1.value].precedence <= operators[op2.value].precedence) {
        postFix.push(operationsStack.pop());
        op2 = operationsStack[operationsStack.length - 1];
      }
      operationsStack.push(op1);
    }
  }
  while (operationsStack.length > 0) {
    postFix.push(operationsStack.pop());
  }

  // test
  let resStr = '';
  postFix.forEach(item => {
    if (item.type === 'operand') {
      resStr += 'op ';
    } else {
      resStr += item.value + ' ';
    }
  });
  return postFix;
};

/**
 * Получает на вход массив, представляющий собой постфиксную запись,
 * возвращает результаты вычислений в виде объекта вида {чиcлитель, знаменатель}
 * @param postfixArr
 * @returns {{numinator: number, denominator: number}}
 */
const parse = postfixArr => {
  let res = {
    numinator: 1,
    denominator: 1
  };

  const operators = {
    '+': (x, y) => fm.sum(x, y),
    '-': (x, y) => fm.sub(x, y),
    '*': (x, y) => fm.multiply(x, y),
    '/': (x, y) => fm.divide(x, y)
  };

  let stack = [];
  postfixArr.forEach(token => {
    if (token.type === 'operation') {
      let [y, x] = [stack.pop(), stack.pop()];
      stack.push(operators[token.value](x, y));
    } else {
      stack.push(token);
    }
  });
  res = stack.pop();
  return res;
};

const calculate = infix => {
  return parse(generate(infix));
};

export {calculate};
