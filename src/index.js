import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { GlobalProvider } from './hooks/useGlobalData';

ReactDOM.render(
	<BrowserRouter>
		<GlobalProvider>
			<App />
		</GlobalProvider>
	</BrowserRouter>,
	document.getElementById('root')
);
