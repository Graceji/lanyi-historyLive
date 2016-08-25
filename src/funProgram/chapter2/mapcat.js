import cat from './cat';

export default function mapcat(fun, coll) {
  return cat.apply(null, _.map(coll, fun));
}