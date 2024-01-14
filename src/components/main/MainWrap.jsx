import './MainWrap.scss';
import CookiePopup from '../common/cookiePopup/CookiePopup';
import Movie from './movie/Movie';
import Pics from './pics/Pics';
import Banner from './banner/Banner';

export default function MainWrap() {
	return (
		<>
			<CookiePopup />
			<div className='MainWrap'>
				<Movie />
				<Pics />
				<Banner />
			</div>
		</>
	);
}
