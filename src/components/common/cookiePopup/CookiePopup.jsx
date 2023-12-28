import { useRef, useState } from 'react';
import { useCookie } from '../../../hooks/useCookie';
import './CookiePopup.scss';
import { IoMdClose } from 'react-icons/io';

export default function CookiePopup() {
	const { setCookie, isCookie } = useCookie();
	const checkEl = useRef(null);
	const [Close, setClose] = useState(isCookie('today=done'));
	const handleClose = () => {
		const isChecked = checkEl.current.checked;
		if (isChecked) setCookie('today', 'done', 60 * 60 * 24);
		setClose(true);
	};

	return (
		<>
			{!Close && (
				<aside className='CookiePopup'>
					<div className='frame'>
						<span className='close' onClick={handleClose}>
							<IoMdClose />
						</span>
						<div className='content'>
							<h1>WELCOME MESSAGE</h1>
							<p>Please, accept these sweeties to continue enjoying our site!</p>
						</div>

						<nav>
							<input type='checkbox' ref={checkEl} />
							<span>Don't show for 24hours</span>
						</nav>
					</div>
				</aside>
			)}
		</>
	);
}
