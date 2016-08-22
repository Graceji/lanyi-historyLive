import existy from '../chapter1/existy';

export default function cat() {
  var head = _.first(arguments);
  if (existy(head)) {
    console.log(_.tail(arguments));
    return head.concat.apply(head, _.tail(arguments));
  } else {
    return [];
  }
}
