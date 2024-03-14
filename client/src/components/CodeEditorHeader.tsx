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

const CodeEditorHeader = () => {
	return (
		<div className='__code_editor_header h-[50px]text-white p-2 flex justify-between items-center'>
			<div className='__btn_container flex gap-1'>
				<TooltipProvider delayDuration={0}>
					<Tooltip>
						<TooltipTrigger>
							<Button variant='success'>
								<Save size={16} />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Save</p>
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger>
							<Button variant='outline'>
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
				<Select defaultValue='html'>
					<SelectTrigger className='w-[120px] focus:ring-0'>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
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
