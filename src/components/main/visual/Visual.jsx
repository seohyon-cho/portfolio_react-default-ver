import { useEffect, useRef, useState } from 'react';
import './Visual.scss';
import 'swiper/css';
import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css/pagination';
import { useCustomText } from '../../../hooks/useText';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function Visual() {
	const [Opt, setOpt] = useState('PLIenA9X9sYejBz8kBsdDV-BbZTeDJeTEH');
	const { data: Vids, isSuccess } = useYoutubeQuery(Opt);
	const shortenText = useCustomText('short');
	const swiperRef = useRef(null);

	const swiperOption = useRef({
		modules: [Pagination, Autoplay],
		pagination: { clickable: true, renderBullet: (index, className) => `<span class=${className}>${index + 1}</span>` },
		autoplay: { delay: 2000, disableOnInteraction: true },
		loop: true
	});

	return (
		<figure className='Visual'>
			<Swiper {...swiperOption.current}>
				{isSuccess &&
					Vids.map((vid, idx) => {
						if (idx >= 5) return null;
						return (
							<SwiperSlide key={vid.id}>
								<div className='inner'>
									<div className='picBox'>
										<p>
											<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
										</p>
										<p>
											<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
										</p>
									</div>
									<div className='txtBox'>
										<h2>{shortenText(vid.snippet.title, 50)}</h2>
										<Link to={`/detail/${vid.id}`} onMouseEnter={swiperRef.current?.autoplay?.stop} onMouseLeave={swiperRef.current?.autoplay?.start}>
											View Detail
										</Link>
									</div>
								</div>
							</SwiperSlide>
						);
					})}
				<Btns swiperRef={swiperRef} />
			</Swiper>
		</figure>
	);
}

function Btns({ swiperRef }) {
	swiperRef.current = useSwiper();

	useEffect(() => {
		swiperRef.current.init(0);
		swiperRef.current.slideNext(300);
	}, [swiperRef]);

	return (
		<nav className='swiperController'>
			<button
				onClick={() => {
					swiperRef.current.slideNext(300);
					swiperRef.current.autoplay.start();
				}}>
				start
			</button>
			<button onClick={() => swiperRef.current.autoplay.stop()}>stop</button>
		</nav>
	);
}
