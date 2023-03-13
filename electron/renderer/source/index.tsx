import React from "react";

import { createRoot } from "react-dom/client";

import Mantine from "./styles/mantine";

import App from "./app";

const container = document.getElementById("app");
const root = createRoot(container!);

root.render(
	<Mantine>
		<App/>
	</Mantine>
);