import { generalRequest } from '../utilities';
import { host, endpoints } from './server';

const resolvers = {
	Query: {
		findStation: async (_, { id }) => {
			const [resp] = await generalRequest(
				`${host}/${endpoints.station}/${id}`, 'GET'
			)
			return resp
		}
	},
	Mutation: {
		createDriver: (_, { station }) => {
			return generalRequest(
				`${host}/${endpoints.station}/create`, 'POST', station
			)
		}
	}
};

export default resolvers;
