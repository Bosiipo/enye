const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Results {
    name: String
    vicinity: String
  }
  type History {
    radius: String
    type: String
    results: [Results]
  }
  type User {
    user_id: String
    email: String
    history: [History]
  }
  type Query {
    users: [User]
  }`);

module.exports = schema;