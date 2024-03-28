import mongoose from 'mongoose';

export const dbConnect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI!, {
			dbName: 'web-compiler',
		});

		console.log('🍃 DB Connection established');
	} catch (error) {
		console.log('💥 Error connecting DB');
	}
};
