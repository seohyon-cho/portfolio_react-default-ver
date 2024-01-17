import './Movie.scss';

export default function Movie() {
	const path = process.env.PUBLIC_URL;
	return (
		<div className='Movie'>
			<video src={`${path}/img/visual.mp4`} autoPlay loop muted playsInline></video>
		</div>
	);
}
