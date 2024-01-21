import './DarkMode.scss';
import { useCookie } from '../../../hooks/useCookie';
import { useGlobalData } from '../../../hooks/useGlobalData';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { useEffect } from 'react';

export default function DarkMode() {
	const { Mode, setMode } = useGlobalData();
	const { setCookie, isCookie } = useCookie();

	useEffect(() => {
		if (isCookie('mode')) setMode(document.cookie.split('mode=')[1].split(';')[0]);
	}, [isCookie, setMode]);

	const changeMode = () => {
		setMode(Mode === 'light' ? 'dark' : 'light');
		setCookie('mode', Mode === 'light' ? 'dark' : 'light', 60 * 60 * 24);
	};

	return (
		<div className={`DarkMode ${Mode === 'dark' ? 'dark' : 'light'}`} onClick={changeMode}>
			{Mode === 'dark' ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
		</div>
	);
}
