function lazyChain(obj) {
  this._calls = [];
  this._target = obj;
}

lazyChain.prototype.invoke = function (methodNmae) {
  var args = _.tail(arguments);

  this._calls.push(function(target) {
    var meth = target[methodName];

    return meth.apply(target, args);
  });

  return this;
}

lazyChain.prototype.force = function () {
  return _.reduce(this._calls, function(target, thunk) {
    return thunk(target);
  }, this._target);
}

new lazyChain([1,2,3]).invoke('sort').force();