import { generalRequest } from '../utilities';
import { host, endpoints } from './server';

const resolvers = {
	Query: {
		findTrip: (_, { id }) => {
			return generalRequest(
				`${host}/${endpoints.trip}/${id}`, 'GET'
			)
		}
	},
	Mutation: {
		createTrip: async (_, { trip, position }) => {
			const { tripId } = await generalRequest(
				`${host}/${endpoints.trip}`, 'POST', trip				
			)
			await generalRequest(
				`${host}/${endpoints.trip}/${tripId}/updatePosition`, 
				'POST', 
				{ location: position }		
			)
			return tripId
		}
	}
};

export default resolvers;
