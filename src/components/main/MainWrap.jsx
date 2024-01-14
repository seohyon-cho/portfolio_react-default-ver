import './MainWrap.scss';
import Movie from './movie/Movie';
import Pics from './pics/Pics';
import Banner from './banner/Banner';

export default function MainWrap() {
	return (
		<div className='MainWrap'>
			<Movie />
			<Pics />
			<Banner />
		</div>
	);
}
