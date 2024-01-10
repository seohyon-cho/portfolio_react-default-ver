import './MainWrap.scss';
import CookiePopup from '../common/cookiePopup/CookiePopup';
import Visual from './visual/Visual';
import Movie from './movie/Movie';
import Pics from './pics/Pics';
import Banner from './banner/Banner';

export default function MainWrap() {
	return (
		<>
			<CookiePopup />
			<Movie />
			<Visual />
			<Pics />
			<Banner />
		</>
	);
}
