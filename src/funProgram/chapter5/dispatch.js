import existy from '../chapter1/existy';
import construct from '../chapter2/construct';
import invoker from '../chapter4/invoker';
import always from '../chapter4/always';

function dispatch() {
  var funs = _.toArray(arguments);
  var size = funs.length;

  return function (target) {
    var ret = undefined;
    for (var funIndex = 0; funIndex < size; funIndex++) {
      var fun = funs[funIndex];
      ret = fun.apply(fun, arguments);
      if (existy(ret)) return ret;
    }

    return ret;
  }
}

function stringReverse(s) {
  if (!_.isString(s)) return undefined;
  return s.split('').reverse().join('');
}
// debugger;
var rev= dispatch(invoker('reverse', Array.prototype.reverse), stringReverse);

var sillyReverse = dispatch(rev, always(42));
// console.log(sillyReverse([1,2,3]));