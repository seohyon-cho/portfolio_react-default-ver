import { createContext, useContext, useState } from 'react';

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
	const [MenuOpen, setMenuOpen] = useState(false);
	const [ModalOpen, setModalOpen] = useState(false);
	const [Mode, setMode] = useState('light');
	return <GlobalContext.Provider value={{ MenuOpen, setMenuOpen, ModalOpen, setModalOpen, Mode, setMode }}>{children}</GlobalContext.Provider>;
}

export function useGlobalData() {
	const globalData = useContext(GlobalContext);
	return globalData;
}
