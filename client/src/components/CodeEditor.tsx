/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { tags as t } from '@lezer/highlight';
import { draculaInit } from '@uiw/codemirror-theme-dracula';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateCodeCollection } from '@/redux/slices/compilerSlice';

const CodeEditor = () => {
	const currentLanguage = useSelector(
		(state: RootState) => state.compilerSlice.currentLanguage
	);
	const codeCollection = useSelector(
		(state: RootState) => state.compilerSlice.codeCollection
	);

	const dispatch = useDispatch();

	const onChange = useCallback((value: string) => {
		// console.log('val: ', value);

		dispatch(updateCodeCollection(value));
	}, []);

	return (
		<CodeMirror
			value={codeCollection[currentLanguage]}
			height='calc(100vh - 60px - 50px)'
			extensions={[loadLanguage(currentLanguage)!]}
			onChange={onChange}
			theme={draculaInit({
				settings: {
					caret: '#c6c6c6',
					fontFamily: 'monospace',
				},
				styles: [{ tag: t.comment, color: '#6272a4' }],
			})}
		/>
	);
};

export default CodeEditor;
