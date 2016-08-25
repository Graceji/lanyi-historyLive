export default function validator(message, fun) {
  var f = function () {
    return fun.apply(fun, arguments);
  };

  f['message'] = message;
  return f;
}