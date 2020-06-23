const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Values {
    id: String
    name: String
    vicinity: String
  }
  type User {
    id: Int
    email: String
    values: [Values]
  }
  type Query {
    user(userId: String): [Values]
  }`);

module.exports = schema;