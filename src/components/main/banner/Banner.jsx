import './Banner.scss';
import { Fragment, useEffect, useRef, useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { useCustomText } from '../../../hooks/useText';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../redux/actionType';

export default function Banner() {
	const shortenText = useCustomText('short');
	const dispatch = useDispatch();
	const Vids = useSelector(store => store.youtubeReducer.youtube);

	const swiperRef = useRef(null);

	const [Index, setIndex] = useState(0);

	const swiperOption = useRef({
		modules: [Autoplay],
		loop: true,
		slidesPerView: 1,
		centeredSlides: true,
		autoplay: { delay: 2000, disableOnInteraction: false },
		direction: 'vertical',
		speed: 1500,
		onSwiper: swiper => (swiperRef.current = swiper),
		onSlideChange: swiper => {
			setIndex(swiper.realIndex);
		}
	});

	useEffect(() => {
		dispatch({ type: types.YOUTUBE.start, opt: { type: 'All' } });
	}, [dispatch]);

	return (
		<div className='bannerWrap myScroll'>
			<div className='title'>
				<h2>
					NEW <br />
					CONTENTS
				</h2>
			</div>
			<figure className='Banner'>
				<article className='slide'>
					<Swiper {...swiperOption.current}>
						{Vids?.map((el, idx) => {
							if (idx >= 3) return null;
							return (
								<SwiperSlide key={el.id}>
									<div className='pic'>
										<img src={el.snippet.thumbnails.standard.url} alt={el.snippet.title} />
									</div>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</article>

				<ul className='pagination'>
					{Vids?.map((el, idx) => {
						if (idx >= 3) return null;
						return (
							<Link to={`/detail/${el.id}`} key={el.id}>
								<li className={idx === Index ? 'on' : ''} onMouseEnter={() => swiperRef.current.slideToLoop(idx, 800)}>
									<h2>{shortenText(el.snippet.title, 40)}</h2>
									<p>{shortenText(el.snippet.description, 50)}</p>
								</li>
							</Link>
						);
					})}
				</ul>
			</figure>
		</div>
	);
}
