import './MainWrap.scss';
import CookiePopup from '../common/cookiePopup/CookiePopup';
import Visual from './visual/Visual';
import Movie from './movie/Movie';
import Pics from './pics/Pics';
import Banner from './banner/Banner';
import ShopInfo from './shopInfo/ShopInfo';

export default function MainWrap() {
	return (
		<>
			<CookiePopup />
			<Movie />
			<ShopInfo />
			<Banner />
			<Visual />
			<Pics />
		</>
	);
}
