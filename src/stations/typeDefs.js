export const stationTypeDef = `
    type LocationStation {
        latitude:String!
        longitude:String!
    }
    input LocationStationInput {
        latitude:String!
        longitude:String!
    }
	input StationInput {
    name: String!,
    location: LocationStationInput
    } 
	type Station {
		id: Int!
    name: String!
    location: LocationStation
	} 
`

export const stationQueries = `
	findStation(id: Int!) : Station!
`

export const stationMutations = `
	createStation(station: StationInput!): String!
`