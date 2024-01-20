import { useRef } from 'react';
import './Keyword.scss';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';

export default function Keyword() {
	const keywordList = ['creative', 'action', 'teams', 'identity', 'technology', 'project', 'performance', 'service'];

	const swiperOption = useRef({
		modules: [Autoplay],
		loop: true,
		slidesPerView: 4,
		spaceBetween: 0,
		centeredSlides: true,
		autoplay: { delay: 0, disableOnInteraction: false },
		allowTouchMove: false,
		speed: 4000,
		breakpoints: {
			320: {
				slidesPerView: 3
			},
			640: {
				slidesPerView: 3
			},
			1000: {
				slidesPerView: 4
			}
		}
	});

	return (
		<div className='Keyword'>
			<div className='wordtitle'>
				<h2>Our Keywords</h2>
				<p>We set up teams to shape your identity, Push your idea!</p>
			</div>
			<div className='wordSlide'>
				<Swiper {...swiperOption.current} dir='rtl'>
					{keywordList.map((el, idx) => {
						return (
							<SwiperSlide key={el + idx}>
								<div className='word'>{el}</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
				<Swiper {...swiperOption.current} dir='ltr'>
					{keywordList.map((el, idx) => {
						return (
							<SwiperSlide key={el + idx}>
								<div className='word'>{el}</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
				<Swiper {...swiperOption.current} dir='rtl'>
					{keywordList.map((el, idx) => {
						return (
							<SwiperSlide key={el + idx}>
								<div className='word'>{el}</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
		</div>
	);
}
