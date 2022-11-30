export const tripTypeDef = `
	type Position {
		_latitude: Float!
		_longitude: Float!
	}
	input PositionInput {
		latitude: Float!
		longitude: Float!
	}
	type Location {
		position: Position!
		updatedAt: String
	}
	type Trip {	
		id: String!
		routeId: String!
		driverId: String!
		status: String!
		startedAt: String!
		lastPosition: Location
	}
	input TripInput {
		routeId: String!
		driverId: String!
		status: String!
}
`

export const tripQueries = `
	findTrip(id: String): Trip!
`

export const tripMutations = `
	createTrip(trip: TripInput!, position: PositionInput!): String!
`