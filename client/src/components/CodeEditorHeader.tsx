/* eslint-disable @typescript-eslint/no-unused-vars */
import { Save, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
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

const CodeEditorHeader = () => {
	const codeCollection = useSelector(
		(state: RootState) => state.compilerSlice.codeCollection
	);

	const handleSaveCode = async () => {
		try {
			const response = await axios.post('http://localhost:4000/compiler/save', {
				codeCollection: codeCollection,
			});

			console.log(response.data);
		} catch (error) {
			console.log('Error', error);
			handleError(error);
		}
	};
	const dispatch = useDispatch();
	const currentLanguage = useSelector(
		(state: RootState) => state.compilerSlice.currentLanguage
	);

	return (
		<div className='__code_editor_header h-[50px] text-white p-2 flex justify-between items-center'>
			<div className='__btn_container flex gap-1'>
				<TooltipProvider delayDuration={0}>
					<Tooltip>
						<TooltipTrigger>
							<Button variant='success' size='sm' onClick={handleSaveCode}>
								<Save size={16} />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Save</p>
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger>
							<Button variant='outline' size='sm'>
								<Share2 size={16} />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Share</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
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
