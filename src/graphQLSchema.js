import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import { 
	tripMutations,
	tripQueries,
	tripTypeDef
} from './trips/typeDefs';

import { 
	driverMutations,
	driverQueries,
	driverTypeDef
} from './buses/typeDefs';

import driverResolvers from './buses/resolvers';
import tripResolvers from './trips/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		tripTypeDef,
		driverTypeDef
	],
	[
		tripQueries,
		driverQueries
	],
	[
		tripMutations,
		driverMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		driverResolvers,
		tripResolvers
	)
});
