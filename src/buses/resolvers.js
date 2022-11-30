import { generalRequest } from '../utilities';
import { host, endpoints } from './server';

const resolvers = {
	Query: {
		findDriver: async (_, { id }) => {
			const [resp] = await generalRequest(
				`${host}/${endpoints.driver}/${id}`, 'GET'
			)
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

export default resolvers;
