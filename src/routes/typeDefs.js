export const routeTypeDef = `
	input RouteInput {
    name: String!
    } 
	type Route {
		id: Int!
    name: String!
	} 
`

export const routeQueries = `
	findRoute(id: Int!) : Route!
`

export const routeMutations = `
	createRoute(station: RouteInput!): String!
`