import './MainWrap.scss';
import CookiePopup from '../common/cookiePopup/CookiePopup';
import Movie from './movie/Movie';
import Banner from './banner/Banner';
import ShopInfo from './shopInfo/ShopInfo';
import Keyword from './keyword/Keyword';
import Subscribe from './subscribe/Subscribe';
import Btns from './btns/Btns';
import { useScroll } from '../../hooks/useScroll';
import { useEffect } from 'react';
import Header from '../common/header/Header';

export default function MainWrap() {
	const { scrollTo } = useScroll();

	useEffect(() => {
		scrollTo(0);
	}, [scrollTo]);

	return (
		<>
			<Header type={'main'} />
			<CookiePopup />
			<Movie />
			<ShopInfo />
			<Banner />
			<Keyword />
			<Subscribe />
			<Btns />
		</>
	);
}
