import { useRef } from 'react';
import './MainWrap.scss';

export default function MainWrap() {
	const path = useRef(process.env.PUBLIC_URL);
	return (
		<div className='MainWrap'>
			<div className='image'>
				{/* <img src={`${path.current}/img/background_layout.jpg`} alt='member2' /> */}
				<video src={`${path.current}/img/ocean.mp4`} loop autoPlay muted></video>
			</div>
		</div>
	);
}
