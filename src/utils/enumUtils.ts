export function getEnumKeys<E extends object>(enumObj: E): (keyof E)[] {
  return Object.keys(enumObj).filter((key) =>
    isNaN(Number(key))
  ) as (keyof E)[];
}

export function getEnumValues<E extends object>(enumObj: E): E[keyof E][] {
  return Object.values(enumObj).filter(
    (value) => !isNaN(Number(value))
  ) as E[keyof E][];
}
