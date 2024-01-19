import './MainWrap.scss';
import CookiePopup from '../common/cookiePopup/CookiePopup';
import Movie from './movie/Movie';
import Banner from './banner/Banner';
import Keyword from './keyword/Keyword';
import ShopInfo from './shopInfo/ShopInfo';

export default function MainWrap() {
	return (
		<>
			<CookiePopup />
			<Movie />
			<ShopInfo />
			<Banner />
			<Keyword />
		</>
	);
}
