import { useCallback, useEffect, useRef, useState } from 'react';
import './ThemeControl.scss';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { useCookie } from '../../../hooks/useCookie';

export default function ThemeControl() {
	const [ThemeShow, setThemeShow] = useState(false);
	const inputEl = useRef(null);
	const { setCookie, isCookie } = useCookie();
	const getThemeColor = useCallback(() => {
		isCookie('theme')
			? document.body.style.setProperty('--pointColor', document.cookie.split('theme=')[1].split(';')[0])
			: document.body.style.setProperty('--pointColor', getComputedStyle(document.body).getPropertyValue('--pointColor'));
		// inputEl.current.value = document.body.style.getPropertyValue('--pointColor');
	}, [isCookie]);

	const changeThemeColor = () => {
		const color = inputEl.current.value;
		document.body.style.setProperty('--pointColor', color);
		setCookie('theme', color, 60 * 60 * 24);
		inputEl.current.value = color;
	};

	useEffect(() => {
		getThemeColor();
	}, [getThemeColor]);

	return (
		<>
			<IoColorPaletteOutline className='palette' onClick={() => setThemeShow(!ThemeShow)} />
			{ThemeShow && (
				<nav className='ThemeControl'>
					<input type='color' id='color' ref={inputEl} onChange={changeThemeColor} />
					<label htmlFor='color'>COLOR</label>
					<p>Set your Own Color Theme</p>
				</nav>
			)}
		</>
	);
}
