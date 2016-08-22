import existy from './existy';

export default function truthy(x) {
  return existy(x) && (x !== false);
}