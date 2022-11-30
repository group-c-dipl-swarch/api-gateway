export const driverTypeDef = `
	input DriverInput {
    nid: String!,
    name: String!,
    phone: String!,
    profile_photo_path: String
	}
	type Driver {
		id: Int!
    nid: String!
    name: String!
    phone: String!
    profile_photo_path: String
	} 
`

export const driverQueries = `
	findDriver(id: Int!) : Driver!
`

export const driverMutations = `
	createDriver(driver: DriverInput!): String!
`