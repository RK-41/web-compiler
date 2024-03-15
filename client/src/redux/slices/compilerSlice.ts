import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CompilerSliceStateType {
	codeCollection: { html: string; css: string; javascript: string };
	currentLanguage: 'html' | 'css' | 'javascript';
}

const initialState: CompilerSliceStateType = {
	codeCollection: {
		html: '<!-- HTML Code -->',
		css: '/* CSS Code */',
		javascript: '// JavaScript Code',
	},
	currentLanguage: 'html',
};

const compilerSlice = createSlice({
	name: 'compilerSlice',
	initialState,
	reducers: {
		updateCurrentLanguage: (
			state,
			action: PayloadAction<CompilerSliceStateType['currentLanguage']>
		) => {
			state.currentLanguage = action.payload;
		},

		updateCodeCollection: (state, action: PayloadAction<string>) => {
			state.codeCollection[state.currentLanguage] = action.payload;
		},
	},
});

export default compilerSlice.reducer;
export const { updateCurrentLanguage, updateCodeCollection } =
	compilerSlice.actions;
