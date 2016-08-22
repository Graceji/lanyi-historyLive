import existy from '../chapter1/existy';
import doWhen from '../chapter1/doWhen';

export default function invoker(name, method) {
  return (target) => {
    if (!existy(target)) return;
    var targetMethod = target[name];
    var args = _.tail(arguments);

    return doWhen((existy(targetMethod) && method === targetMethod),
      () => targetMethod.apply(target, args));
  }
}

var rev = invoker('reverse', Array.prototype.reverse);
// console.log(_.map([[1,2,3]], rev));
