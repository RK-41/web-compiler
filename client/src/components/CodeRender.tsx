import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const CodeRender = () => {
	const codeCollection = useSelector(
		(state: RootState) => state.compilerSlice.codeCollection
	);
	const combinedCode = `<html><style>${codeCollection.css}</style><body>${codeCollection.html}</body><script>${codeCollection.javascript}</script></html>
  `;

	const iframeCode = `data:text/html;charset=utf-8,${encodeURIComponent(
		combinedCode
	)}`;
	return (
		<div className='bg-white border-2 h-[calc(100dvh-60px)]'>
			<iframe className='w-full h-full' src={iframeCode} title='code render' />
		</div>
	);
};

export default CodeRender;
