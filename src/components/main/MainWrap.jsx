import { useRef } from 'react';
import './MainWrap.scss';
import CookiePopup from '../common/cookiePopup/CookiePopup';

export default function MainWrap() {
	const path = useRef(process.env.PUBLIC_URL);
	return (
		<>
			<CookiePopup />
			<div className='MainWrap'>
				<div className='image'>
					<video src={`${path.current}/img/ocean.mp4`} loop autoPlay muted></video>
				</div>
			</div>
		</>
	);
}
