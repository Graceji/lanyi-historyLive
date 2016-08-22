import cat from './cat';

export default function construct(head, tail) {
  return cat([head], _.toArray(tail));
}