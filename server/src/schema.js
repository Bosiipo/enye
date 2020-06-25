const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Results {
    name: String
    vicinity: String
  }
  type History {
    user_id: String
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
    user(userId: String): User
  }
`);

module.exports = schema;