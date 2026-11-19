import validateProduct from "./validateProduct";

// a product that passes every rule
const validProduct = {
  name: "Snake Plant",
  category: "Indoor",
  careLevel: "easy",
  description: "An upright plant for a simple indoor display.",
  price: 850,
  image: "/images/snake-plant.jpg",
};

test("a valid product has no errors", () => {
  expect(validateProduct(validProduct)).toEqual({});
});

test("name is required", () => {
  const errors = validateProduct({ ...validProduct, name: "" });
  expect(errors.name).toBeDefined();
});

test("a name with only spaces is not accepted", () => {
  const errors = validateProduct({ ...validProduct, name: "   " });
  expect(errors.name).toBeDefined();
});

test("description is required", () => {
  const errors = validateProduct({ ...validProduct, description: "" });
  expect(errors.description).toBeDefined();
});

test("category must be one of the agreed options", () => {
  const errors = validateProduct({ ...validProduct, category: "Water plants" });
  expect(errors.category).toBeDefined();
});

test("care level must be one of the agreed options", () => {
  const errors = validateProduct({ ...validProduct, careLevel: "hard" });
  expect(errors.careLevel).toBeDefined();
});

test("price must be greater than zero", () => {
  expect(validateProduct({ ...validProduct, price: 0 }).price).toBeDefined();
  expect(validateProduct({ ...validProduct, price: -5 }).price).toBeDefined();
});

test("price must be a number", () => {
  const errors = validateProduct({ ...validProduct, price: "abc" });
  expect(errors.price).toBeDefined();
});

test("image must come from the bundled images", () => {
  const errors = validateProduct({ ...validProduct, image: "/images/other.jpg" });
  expect(errors.image).toBeDefined();
});