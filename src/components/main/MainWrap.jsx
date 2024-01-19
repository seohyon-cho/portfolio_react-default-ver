import './MainWrap.scss';
import CookiePopup from '../common/cookiePopup/CookiePopup';
import Movie from './movie/Movie';
import Banner from './banner/Banner';
import Keyword from './keyword/Keyword';

export default function MainWrap() {
	return (
		<>
			<CookiePopup />
			<div className='MainWrap'>
				<Movie />
				<Banner />
				<Keyword />
			</div>
		</>
	);
}
