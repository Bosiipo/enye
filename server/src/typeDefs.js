const { gql } = require("apollo-server");
const typeDefs = gql`
type Location {
    lat: Int
    lng: Int
}
type ViewPort {
    northeast: Location
    southwest: Location
}
type Geometry {
    location: Location
    view_port: ViewPort
}
type OpenNow {
    open_now: Boolean
}
type Photos {
    height: Int
    html_attributions: [String]
    photo_reference: String,
    width: Int
}
type Results {
    geometry: Geometry
    icon: String
    id: ID
    name: String
    opening_hours: OpenNow
    photos: [Photos]
    place_id: String
    reference: String
    types: [String]
    vicinity: String
}
type StorageType {
    id: Int,
    type: String
    radius: String
    results: [Results]
    user_id: Int   
}
type User {
id: Int
email: String
search: [StorageType]
}
type Query {
    users: [User]
  }
`;
module.exports = typeDefs;