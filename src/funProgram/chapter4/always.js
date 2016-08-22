export default function always(val) {
  return () => {
    return val;
  };
}