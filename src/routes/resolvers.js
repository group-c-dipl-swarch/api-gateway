import { generalRequest } from '../utilities';
import { host, endpoints } from './server';

const resolvers = {
	Query: {
		findStation: async (_, { id }) => {
			const [resp] = await generalRequest(
				`${host}/${endpoints.route}/${id}`, 'GET'
			)
			return resp
		}
	},
	Mutation: {
		createDriver: (_, { route }) => {
			return generalRequest(
				`${host}/${endpoints.route}/create`, 'POST', route
			)
		}
	}
};

export default resolvers;
