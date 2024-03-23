import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CompilerSliceStateType {
	codeCollection: { html: string; css: string; javascript: string };
	currentLanguage: 'html' | 'css' | 'javascript';
}

const initialState: CompilerSliceStateType = {
	codeCollection: {
		html: `<!-- HTML Code -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple Counter</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Simple Counter</h1>
  <div id="counter">0</div>
  <button id="increment">Increment</button>
  <button id="decrement">Decrement</button>
  <button id="reset">Reset</button>
  <script src="script.js"></script>
</body>
</html>`,
		css: `/* CSS Code */
body {
  font-family: sans-serif;
  text-align: center;
  padding: 50px 0;
}

#counter {
  font-size: 48px;
  margin: 20px;
}

button {
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

#increment, #decrement {
  background-color: #4CAF50;
  color: white;
}

#reset {
  background-color: #f44336;
  color: white;
}

button:hover {
  opacity: 0.8;
}`,
		javascript: `// JavaScript Code
const counterEl = document.getElementById('counter');
let count = 0;

const incrementBtn = document.getElementById('increment');
incrementBtn.addEventListener('click', () => {
  count++;
  counterEl.textContent = count;
});

const decrementBtn = document.getElementById('decrement');
decrementBtn.addEventListener('click', () => {
  if (count > 0) {
    count--;
  }
  counterEl.textContent = count;
});

const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', () => {
  count = 0;
  counterEl.textContent = count;
});`,
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
