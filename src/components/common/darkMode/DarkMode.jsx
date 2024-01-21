import './DarkMode.scss';
import { darkToggle, darkOn, darkOff } from '../../../redux/darkSlice';
import { useCookie } from '../../../hooks/useCookie';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { useEffect } from 'react';

export default function DarkMode() {
	const dispatch = useDispatch();
	const Dark = useSelector(store => store.dark.isDark);

	const { setCookie, isCookie } = useCookie();

	useEffect(() => {
		console.log(document.cookie);
		if (isCookie('mode')) document.cookie.split('mode=')[1].split(';')[0] === 'On' ? dispatch(darkOn()) : dispatch(darkOff());
	}, [isCookie, dispatch]);

	const changeMode = async () => {
		dispatch(darkToggle());
		setCookie('mode', Dark ? 'Off' : 'On', 60 * 60 * 24);
	};

	return (
		<div className={`DarkMode ${Dark ? 'dark' : ''}`} onClick={changeMode}>
			{Dark ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
		</div>
	);
}
