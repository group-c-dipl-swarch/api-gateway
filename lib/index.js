'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Koa = _interopDefault(require('koa'));
var KoaRouter = _interopDefault(require('koa-router'));
var koaLogger = _interopDefault(require('koa-logger'));
var koaBody = _interopDefault(require('koa-bodyparser'));
var koaCors = _interopDefault(require('@koa/cors'));
var apolloServerKoa = require('apollo-server-koa');
var merge = _interopDefault(require('lodash.merge'));
var GraphQLJSON = _interopDefault(require('graphql-type-json'));
var graphqlTools = require('graphql-tools');
var request = _interopDefault(require('request-promise-native'));
var graphql = require('graphql');

/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */
async function generalRequest(url, method, body, fullResponse = false) {
	const parameters = {
		method,
		uri: encodeURI(url),
		body,
		json: true,
		resolveWithFullResponse: fullResponse
	};
	if (process.env.SHOW_URLS) {
		// eslint-disable-next-line
		console.log(url);
	}

	try {
		return await request(parameters);
	} catch (err) {
		return err;
	}
}

/**
 * Adds parameters to a given route
 * @param {string} url
 * @param {object} parameters
 * @return {string} - url with the added parameters
 */


/**
 * Generates a GET request with a list of query params
 * @param {string} url
 * @param {string} path
 * @param {object} parameters - key values to add to the url path
 * @return {Promise.<*>}
 */


/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
function mergeSchemas(typeDefs, queries, mutations) {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

function formatErr(error) {
	const data = graphql.formatError(error);
	const { originalError } = error;
	if (originalError && originalError.error) {
		const { path } = data;
		const { error: { id: message, code, description } } = originalError;
		return { message, code, description, path };
	}
	return data;
}

const tripTypeDef = `
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
`;

const tripQueries = `
	findTrip(id: String): Trip!
`;

const tripMutations = `
	createTrip(trip: TripInput!, position: PositionInput!): String!
`;

const driverTypeDef = `
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
`;

const driverQueries = `
	findDriver(id: Int!) : Driver!
`;

const driverMutations = `
	createDriver(driver: DriverInput!): String!
`;

const stationTypeDef = `
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
`;

const stationQueries = `
	findStation(id: Int!) : Station!
`;

const stationMutations = `
	createStation(station: StationInput!): String!
`;

const routeTypeDef = `
	input RouteInput {
    name: String!
    } 
	type Route {
		id: Int!
    name: String!
	} 
`;

const routeQueries = `
	findRoute(id: Int!) : Route!
`;

const routeMutations = `
	createRoute(station: RouteInput!): String!
`;

const host = 'https://buses-be-4vez5qq7ra-uc.a.run.app';
const endpoints = {
  driver: 'driver'
};

const resolvers = {
	Query: {
		findDriver: async (_, { id }) => {
			const [resp] = await generalRequest(
				`${host}/${endpoints.driver}/${id}`, 'GET'
			);
			return resp
		}
	},
	Mutation: {
		createDriver: (_, { driver }) => {
			return generalRequest(
				`${host}/${endpoints.driver}/create`, 'POST', driver
			)
		}
	}
};

const host$1 = 'http://35.202.27.167:3000';
const endpoints$1 = {
  trip: 'trip'
};

const resolvers$1 = {
	Query: {
		findTrip: (_, { id }) => {
			return generalRequest(
				`${host$1}/${endpoints$1.trip}/${id}`, 'GET'
			)
		}
	},
	Mutation: {
		createTrip: async (_, { trip, position }) => {
			const { tripId } = await generalRequest(
				`${host$1}/${endpoints$1.trip}`, 'POST', trip				
			);
			await generalRequest(
				`${host$1}/${endpoints$1.trip}/${tripId}/updatePosition`, 
				'POST', 
				{ location: position }		
			);
			return tripId
		}
	}
};

const host$2 = 'https://us-central1-fluted-factor-365803.cloudfunctions.net/get-stations/';
const endpoints$2 = {
  station: 'station'
};

const resolvers$2 = {
	Query: {
		findStation: async (_, { id }) => {
			const [resp] = await generalRequest(
				`${host$2}/${endpoints$2.station}/${id}`, 'GET'
			);
			return resp
		}
	},
	Mutation: {
		createDriver: (_, { station }) => {
			return generalRequest(
				`${host$2}/${endpoints$2.station}/create`, 'POST', station
			)
		}
	}
};

const host$3 = 'https://us-central1-fluted-factor-365803.cloudfunctions.net/get-routes';
const endpoints$3 = {
  route: 'route'
};

const resolvers$3 = {
	Query: {
		findStation: async (_, { id }) => {
			const [resp] = await generalRequest(
				`${host$3}/${endpoints$3.route}/${id}`, 'GET'
			);
			return resp
		}
	},
	Mutation: {
		createDriver: (_, { route }) => {
			return generalRequest(
				`${host$3}/${endpoints$3.route}/create`, 'POST', route
			)
		}
	}
};

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		tripTypeDef,
		driverTypeDef,
		stationTypeDef,
		routeTypeDef
	],
	[
		tripQueries,
		driverQueries,
		stationQueries,
		routeQueries
	],
	[
		tripMutations,
		driverMutations,
		stationMutations,
		routeMutations
	]
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers,
		resolvers$1,
		resolvers$2,
		resolvers$3
	)
});

const app = new Koa();
const router = new KoaRouter();
const PORT = process.env.PORT || 5000;

app.use(koaLogger());
app.use(koaCors());

// read token from header
app.use(async (ctx, next) => {
	if (ctx.header.authorization) {
		const token = ctx.header.authorization.match(/Bearer ([A-Za-z0-9]+)/);
		if (token && token[1]) {
			ctx.state.token = token[1];
		}
	}
	await next();
});

// GraphQL
const graphql$1 = apolloServerKoa.graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	context: { token: ctx.state.token },
	formatError: formatErr
}));
router.post('/graphql', koaBody(), graphql$1);
router.get('/graphql', graphql$1);

// test route
router.get('/graphiql', apolloServerKoa.graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
