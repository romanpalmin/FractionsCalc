/**
 * Вспомогательные функции для математических действий с дробями
 *
 * create 03.07.2018 rpalmin
 */

import * as maths from './maths';

const returnFraction = {
  type: 'operand',
  isResult: false,
  numenator: '',
  denomenator: ''
};

const multiply = (x,y) => {
  returnFraction.numenator = +x.numenator * +y.numenator;
  returnFraction.denomenator = +x.denomenator * +y.denomenator;
  return returnFraction;
};

const divide = (x,y) => {
  returnFraction.numenator = +x.numenator * +y.denomenator;
  returnFraction.denomenator = +x.denomenator * +y.numenator;
  return returnFraction;
};

const sum = (x, y) => {
  const nok = maths.findNOK([x.denomenator, y.denomenator]);
  returnFraction.numenator = +x.numenator*(nok/x.denomenator) + +y.numenator*(nok/y.denomenator);
  returnFraction.denomenator = nok;
  return returnFraction;

};

const sub = (x, y) => {
  const nok = maths.findNOK([x.denomenator, y.denomenator]);
  returnFraction.numenator = +x.numenator*(nok/x.denomenator) - +y.numenator*(nok/y.denomenator);
  returnFraction.denomenator = nok;
  return returnFraction;
};

export {sum, multiply, divide, sub}
