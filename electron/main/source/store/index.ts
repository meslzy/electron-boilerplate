import Store from "electron-store";

const store = new Store();

export const initializeStore = () => {
	return Store.initRenderer();
};

export default store;