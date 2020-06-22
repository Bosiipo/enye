const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Location {
        lat: Int
        lng: Int
    }
    type ViewPort {
        northeast: Location
        southwest: Location
    }
    type Photos {
        height: Int
        html_attributions: [String]
        photo_reference: String
        width: Int
    }
    type OpenNow {
        open_now: Boolean
    }
    type Geometry {
        location: Location
        view_port: ViewPort
    }
    type Results {
        geometry: Geometry
        icon: String
        id: String
        name: String
        opening_hours: OpenNow
        photos: [Photos]
        place_id: String
        reference: String
        types: [String]
        vicinity: String
    }
    type Query {
        result(userId: String): [Results]
    }
`);

module.exports = schema;
