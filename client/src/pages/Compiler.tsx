import CodeEditor from '@/components/CodeEditor';
import CodeEditorHeader from '@/components/CodeEditorHeader';
import CodeRender from '@/components/CodeRender';
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable';

const Compiler = () => {
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
