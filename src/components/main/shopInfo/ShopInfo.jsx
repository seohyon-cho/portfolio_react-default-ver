import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useOfficeQuery } from '../../../hooks/useOfficeQuery';
import './ShopInfo.scss';
import 'swiper/css';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import { useRef } from 'react';

export default function ShopInfo() {
	const { data, isSuccess } = useOfficeQuery();
	const swiperRef = useRef(null);

	const swiperOption = useRef({
		modules: [Pagination, Autoplay],
		pagination: { clickable: false, renderBullet: (index, className) => `<span class=${className}>${index + 1}</span>` },
		autoplay: { delay: 3000, disableOnInteraction: false },
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
