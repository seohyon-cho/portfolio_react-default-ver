import './MainWrap.scss';
import CookiePopup from '../common/cookiePopup/CookiePopup';
import Visual from './visual/Visual';
import Movie from './movie/Movie';
import Banner from './banner/Banner';
import ShopInfo from './shopInfo/ShopInfo';
import Keyword from './keyword/Keyword';

export default function MainWrap() {
	return (
		<>
			<CookiePopup />
			<Movie />
			<ShopInfo />
			<Banner />
			<Keyword />
			<Visual />
		</>
	);
}
