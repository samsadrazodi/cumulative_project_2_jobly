const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.
/**
 * Generate SQL statements for performing partial updates on a database table.
 *
 * @param {Object} dataToUpdate - An object containing the data to be updated.
 *                               Each key represents a column name, and the value represents the new value for that column.
 * @param {Object} jsToSql - An object mapping JavaScript-style column names to their corresponding SQL column names.
 *                           This mapping is useful when the JavaScript and SQL column names differ.
 *                           If a column name in `dataToUpdate` matches a key in `jsToSql`, the SQL column name will be used.
 *                           If no mapping exists, the JavaScript column name will be used as the SQL column name.
 * @returns {Object} An object with `setCols` and `values` properties.
 *                   - `setCols` represents the SQL `SET` clause with column-value pairs.
 *                   - `values` contains the corresponding values for the SQL statement.
 * @throws {BadRequestError} If `dataToUpdate` object is empty.
 */


function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
