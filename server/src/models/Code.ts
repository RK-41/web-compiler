import mongoose from 'mongoose';

interface ICodeSchema {
	codeCollection: {
		html: string;
		css: string;
		javascript: string;
	};
}

const CodeSchema = new mongoose.Schema<ICodeSchema>({
	codeCollection: {
		html: String,
		css: String,
		javascript: String,
	},
});

export const Code = mongoose.model('Code', CodeSchema);
