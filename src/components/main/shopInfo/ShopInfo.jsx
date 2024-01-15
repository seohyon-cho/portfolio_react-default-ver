import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useOfficeQuery } from '../../../hooks/useOfficeQuery';
import './ShopInfo.scss';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import { useRef } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

export default function ShopInfo() {
	const { data, isSuccess } = useOfficeQuery();
	const swiperRef = useRef(null);

	const swiperOption = useRef({
		modules: [Pagination, Autoplay],
		pagination: { clickable: false, renderBullet: (index, className) => `<span class=${className}>${index + 1}</span>` },
		autoplay: { delay: 3000, disableOnInteraction: false },
		onSwiper: swiper => (swiperRef.current = swiper),
		loop: true
	});

	return (
		<figure className='ShopInfo'>
			<article className='text'>
				<h2>Office Locate</h2>
				<p>If you visit, our consultant will warmly welcome you and provide customized consulting.</p>
				<Link to='/contact'>
					<div className='linkButton'>Find a place</div>
				</Link>
			</article>
			<article className='slide'>
				<nav>
					<button className='prev' onClick={() => swiperRef.current.slidePrev(400)}>
						<BsChevronLeft />
					</button>
					<button className='next' onClick={() => swiperRef.current.slideNext(400)}>
						<BsChevronRight />
					</button>
				</nav>
				<Swiper {...swiperOption.current}>
					{isSuccess &&
						data.map((info, idx) => {
							return (
								<SwiperSlide key={info + idx}>
									<div className='inner'>
										<div className='picBox'>
											<img src={info.pic} alt={info.name} />
										</div>
										<div className='txtBox'>
											<p>{info.name}</p>
										</div>
									</div>
								</SwiperSlide>
							);
						})}
				</Swiper>
			</article>
		</figure>
	);
}
