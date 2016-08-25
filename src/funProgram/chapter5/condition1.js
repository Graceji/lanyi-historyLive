import mapcat from '../chapter2/mapcat';
import validator from '../chapter4/validator';

export default function condition1() {
  var validators = _.toArray(arguments);

  return function (fun, arg) {
    var errors = mapcat(function (isValid) {
      return isValid(arg) ? [] : [isValid.message];
    }, validators);

    if (!_.isEmpty(errors)) throw new Error(errors.join(', '));

    return fun(arg);
  }
}

function complement(pred) {
  return function () {
    return !pred.apply(null, _.toArray(arguments));
  };
}

function uncheckedSqr(n) { return n * n};

var zero = validator('can not be zero', function(n) {return n ===0 });

var sqrPre = condition1(
  validator('are must not be zero', complement(zero)),
  validator('are must be a number', _.isNumber));

var checkedSqr = partial1(sqrPre, uncheckedSqr);
checkedSqr(10);