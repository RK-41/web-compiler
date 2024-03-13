import { Button } from './components/ui/button';

export default function App() {
	return (
		<div>
			<h1 className='text-3xl font-bold underline'>Hello world!</h1>

			<Button variant={'destructive'} size={'icon'}>
				button
			</Button>
		</div>
	);
}