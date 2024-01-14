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
		const isEmailSubmitted = isCookie('emailPopupClosed');
		if (isChecked || isEmailSubmitted) setCookie('today', 'done', 60 * 60 * 24);
		setClose(true);
	};

	return (
		<>
			{!Close && (
				<>
					<div className='mask'></div>
					<aside className='CookiePopup'>
						<div className='frame'>
							<span className='close' onClick={handleClose}>
								<IoMdClose />
							</span>
							<div className='content'>
								<h1>WELCOME MESSAGE</h1>
								<p>Please, accept these sweeties to continue enjoying our site!</p>
								<span>Subscribe to our Newsletter for fresh updates!</span>
								<form
									onSubmit={e => {
										e.preventDefault();
										setCookie('emailPopupClosed', 'true', 60 * 60 * 24);
										handleClose();
									}}>
									<input type='email' placeholder='Enter Your Email' required />
									<button type='submit'>SUBMIT</button>
								</form>
							</div>

							<nav>
								<input type='checkbox' ref={checkEl} />
								<span>Don't show for 24 hours</span>
							</nav>
						</div>
					</aside>
				</>
			)}
		</>
	);
}
