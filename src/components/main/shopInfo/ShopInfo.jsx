import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './ShopInfo.scss';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOffice } from '../../../redux/officeSlice';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

export default function ShopInfo() {
	const dispatch = useDispatch();
	const OfficeData = useSelector(store => store.office.data);
	const swiperRef = useRef(null);

	const swiperOption = useRef({
		modules: [Pagination, Autoplay],
		pagination: { clickable: false, renderBullet: (index, className) => `<span class=${className}>${index + 1}</span>` },
		autoplay: { delay: 3000, disableOnInteraction: false },
		onSwiper: swiper => (swiperRef.current = swiper),
		loop: true
	});

	useEffect(() => {
		dispatch(fetchOffice());
	}, [dispatch]);

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
					{OfficeData?.map((info, idx) => {
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
