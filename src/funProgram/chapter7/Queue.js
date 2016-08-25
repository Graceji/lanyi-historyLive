function Queue(elems) {
  this._q = elems;
}

Queue.prototype = {
  enqueue: function(thing) {
    return new Queue(this._q + thing);
  }
};

var seed = [1,2,3];
var q = new Queue(seed);

console.log(q);

var q2 = q.enqueue(108);

console.log(q2);

seed.push(108);
console.log(q);