import './DarkMode.scss';
import { useCookie } from '../../../hooks/useCookie';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { useEffect } from 'react';
import * as types from '../../../redux/actionType';

export default function DarkMode() {
	const dispatch = useDispatch();
	const { setCookie, isCookie } = useCookie();
	const { darkReducer } = useSelector(store => store);
	const Dark = darkReducer.dark; // 기본 false

	useEffect(() => {
		console.log(document.cookie);
		if (isCookie('mode'))
			document.cookie.split('mode=')[1].split(';')[0] === 'On'
				? dispatch({ type: types.DARK.start, payload: true })
				: dispatch({ type: types.DARK.start, payload: false });
		return;
	}, []);

	const changeMode = async () => {
		dispatch({ type: types.DARK.start, payload: !Dark });
		setCookie('mode', Dark ? 'Off' : 'On', 60 * 60 * 24);
	};

	return (
		<div className={`DarkMode ${Dark ? 'dark' : ''}`} onClick={changeMode}>
			{Dark ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
		</div>
	);
}
