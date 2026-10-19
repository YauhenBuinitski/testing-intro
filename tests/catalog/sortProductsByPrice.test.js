const products = require("../../src/data/products");
const { sortProductsByPrice } = require("../../src/catalog");

describe("sortProductsByPrice", () => {
  test("'asc' сортирует все товары по возрастанию", () => {
    const result = sortProductsByPrice(products, "asc");
    expect(result.map((p) => p.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });
  test("без направления сортирует по возрастанию", () => {
    const result = sortProductsByPrice(products);
    expect(result.map((p) => p.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });
  test("'asc' сортирует товары [1, 3, 4]", () => {
    const subset = products.filter(({ id }) => [1, 3, 4].includes(id));
    const result = sortProductsByPrice(subset, "asc");
    expect(result.map((p) => p.id)).toEqual([3, 4, 1]);
  });
  test("'desc' сортирует все товары по убыванию", () => {
    const result = sortProductsByPrice(products, "desc");
    expect(result.map((p) => p.id)).toEqual([1, 2, 4, 5, 6, 3]);
  });
  test("'desc' сортирует товары [3, 1, 4]", () => {
    const subset = products.filter(({ id }) => [3, 1, 4].includes(id));
    const result = sortProductsByPrice(subset, "desc");
    expect(result.map((p) => p.id)).toEqual([1, 4, 3]);
  });
  test("'desc' сортирует товары [5, 2, 6]", () => {
    const subset = products.filter(({ id }) => [5, 2, 6].includes(id));
    const result = sortProductsByPrice(subset, "desc");
    expect(result.map((p) => p.id)).toEqual([2, 5, 6]);
  });
  test("'asc' не меняет исходный массив", () => {
    const subset = products.filter(({ id }) => [1, 3, 4].includes(id));
    sortProductsByPrice(subset, "asc");
    expect(subset.map((p) => p.id)).toEqual([1, 3, 4]);
  });
  test("'desc' не меняет исходный массив", () => {
    const subset = products.filter(({ id }) => [1, 3, 4].includes(id));
    sortProductsByPrice(subset, "desc");
    expect(subset.map((p) => p.id)).toEqual([1, 3, 4]);
  });
  test("направление по умолчанию не меняет исходный массив", () => {
    const before = products.map((p) => p.id);
    sortProductsByPrice(products);
    expect(products.map((p) => p.id)).toEqual(before);
  });
});
