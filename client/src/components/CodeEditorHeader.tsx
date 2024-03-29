/* eslint-disable @typescript-eslint/no-unused-vars */
import { Code, Copy, Loader2, Save, Share2 } from 'lucide-react';
import { Button } from './ui/button';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { useDispatch, useSelector } from 'react-redux';
import {
	CompilerSliceStateType,
	updateCurrentLanguage,
} from '@/redux/slices/compilerSlice';
import { RootState } from '@/redux/store';
import { handleError } from '@/utils/handleError';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const CodeEditorHeader = () => {
	const [saveLoading, setSaveLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	const codeCollection = useSelector(
		(state: RootState) => state.compilerSlice.codeCollection
	);

	const handleSaveCode = async () => {
		setSaveLoading(true);

		try {
			const response = await axios.post('http://localhost:4000/compiler/save', {
				codeCollection: codeCollection,
			});

			// console.log(response.data);
			navigate(`/compiler/${response.data.url}`, { replace: true });
			toast('Code successfully saved.');
		} catch (error) {
			// console.log('Error', error);
			toast(`${error.message}: Unable to save code.`);
			handleError(error);
		} finally {
			setSaveLoading(false);
		}
	};
	const dispatch = useDispatch();
	const currentLanguage = useSelector(
		(state: RootState) => state.compilerSlice.currentLanguage
	);

	return (
		<div className='__code_editor_header h-[50px] text-white p-2 flex justify-between items-center'>
			<div className='__btn_container flex gap-1'>
				<Button variant='success' size='sm' onClick={handleSaveCode}>
					{saveLoading ? (
						<div className='flex gap-1'>
							<Loader2 className='animate-spin' size={16} /> Saving
						</div>
					) : (
						<div className='flex gap-1'>
							<Save size={16} />
							Save
						</div>
					)}
				</Button>

				<Dialog>
					<DialogTrigger className='inline-flex items-center justify-center gap-1 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:text-accent-foreground h-8 rounded-md px-3 text-xs'>
						<Share2 size={16} />
						Share
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle className='flex gap-1 justify-center items-center'>
								<Code /> Copy the URL
							</DialogTitle>
							<DialogDescription className='__url flex gap-1 items-center w-full'>
								<Input
									type='text'
									disabled
									className='w-full px-2 py-2 rounded bg-slate-900 text-white select-none'
									value={window.location.href}
								/>
								<Button
									variant='outline'
									onClick={() => {
										window.navigator.clipboard.writeText(window.location.href);
										toast('URL copied to the clipboard.');
									}}
								>
									<Copy size={14} />
								</Button>
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</div>

			<div className='__tab_switcher'>
				<Select
					defaultValue={currentLanguage}
					onValueChange={(value) =>
						dispatch(
							updateCurrentLanguage(
								value as CompilerSliceStateType['currentLanguage']
							)
						)
					}
				>
					<SelectTrigger className='w-[120px] h-[40px] focus:ring-0 text-[14px]'>
						<SelectValue />
					</SelectTrigger>
					<SelectContent className='w-[120px]'>
						<SelectItem value='html'>HTML</SelectItem>
						<SelectItem value='css'>CSS</SelectItem>
						<SelectItem value='javascript'>JavaScript</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};

export default CodeEditorHeader;
