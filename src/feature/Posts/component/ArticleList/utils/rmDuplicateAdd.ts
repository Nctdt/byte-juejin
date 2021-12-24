type FindIndexPredicate<T extends I[], I extends unknown> = (
  a: I,
  idx: number,
  obj: T,
) => boolean

function* findIndex<T extends I[], I extends unknown>(
  arr: T,
  predicate: FindIndexPredicate<T, I>,
) {
  let r = null
  while ((r = arr.findIndex(predicate as any))) if (r !== -1) yield r
}
export const rmDuplicateAdd = <T extends I[], I extends unknown>(
  arr: T,
  item: I,
  predicate: FindIndexPredicate<T, I>,
) => {
  const cpArr = [...arr]
  for (let idx of findIndex(arr, predicate)) cpArr.splice(idx, 1)
  return [item, ...arr]
}
