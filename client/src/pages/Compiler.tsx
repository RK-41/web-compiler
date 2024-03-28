import CodeEditor from '@/components/CodeEditor';
import CodeEditorHeader from '@/components/CodeEditorHeader';
import CodeRender from '@/components/CodeRender';
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable';
import { updateCurrentCodeCollection } from '@/redux/slices/compilerSlice';
import { handleError } from '@/utils/handleError';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const Compiler = () => {
	const { urlId } = useParams();
	const dispatch = useDispatch();

	const loadCode = async () => {
		try {
			const response = await axios.post('http://localhost:4000/compiler/load', {
				urlId: urlId,
			});

			console.log(response.data);
			dispatch(updateCurrentCodeCollection(response.data.codeCollection));
		} catch (error) {
			handleError(error);
		}
	};

	useEffect(() => {
		if (urlId) {
			loadCode();
		}
	});
	return (
		<ResizablePanelGroup direction='horizontal' className=''>
			<ResizablePanel
				className='h-[calc(100dvh-60px)] min-w-[350px]'
				defaultSize={50}
			>
				<CodeEditorHeader />
				<CodeEditor />
			</ResizablePanel>

			<ResizableHandle />

			<ResizablePanel
				className='h-[calc(100dvh-60px)] min-w-[350px]'
				defaultSize={50}
			>
				<CodeRender />
			</ResizablePanel>
		</ResizablePanelGroup>
	);
};

export default Compiler;
