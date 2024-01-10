import './MainWrap.scss';
import CookiePopup from '../common/cookiePopup/CookiePopup';
import Visual from './visual/Visual';
import Movie from './movie/Movie';

export default function MainWrap() {
	return (
		<>
			<CookiePopup />
			<Movie />
			<Visual />
		</>
	);
}
