import construct form '../chapter2/construct.js'

export default function partial1(fun, arg) {
  return function () {
    var args = construct(arg, arguments);
    return fun.apply(fun, args);
  };
}