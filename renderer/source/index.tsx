import React from 'react';
import ReactDOM from 'react-dom/client';

import App from "./app";

import "./style/index.scss";

const container = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(container).render(
	<React.StrictMode>
		<App/>
	</React.StrictMode>
);
