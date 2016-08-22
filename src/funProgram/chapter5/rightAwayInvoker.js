function rightAwayInvoker() {
  var args = _.toArray(arguments);
  console.log( args);
  var method = args.shift();
  var target = args.shift();

  return method.apply(target, args);
}

rightAwayInvoker(Array.prototype.reverse, [2,3,4]);