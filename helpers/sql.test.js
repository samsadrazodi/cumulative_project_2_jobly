const { BadRequestError } = require("../expressError");
const { sqlForPartialUpdate } = require("./sql");

describe("sqlForPartialUpdate", () => {
  test("should generate SQL statements for partial update with non-empty data", () => {
    const dataToUpdate = { firstName: "Aliya", age: 32 };
    const jsToSql = { firstName: "first_name" };

    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);

    expect(result).toEqual({
      setCols: "\"first_name\"=$1, \"age\"=$2",
      values: ["Aliya", 32],
    });
  });

  test("should generate SQL statements for partial update with no column mapping", () => {
    const dataToUpdate = { firstName: "Aliya", age: 32 };
    const jsToSql = {};

    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);

    expect(result).toEqual({
      setCols: "\"firstName\"=$1, \"age\"=$2",
      values: ["Aliya", 32],
    });
  });

  test("should throw BadRequestError for empty dataToUpdate object", () => {
    const dataToUpdate = {};
    const jsToSql = {};

    expect(() => {
      sqlForPartialUpdate(dataToUpdate, jsToSql);
    }).toThrow(BadRequestError);
  });
});
