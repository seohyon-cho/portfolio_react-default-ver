import { useState } from 'react';
import './Visual.scss';
import 'swiper/css';
import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css/pagination';

function Btns() {
	const swiper = useSwiper();
	return (
		<nav className='swiperController'>
			<button onClick={() => swiper.autoplay.stop()}>stop</button>
			<button onClick={() => swiper.autoplay.start()}>start</button>
		</nav>
	);
}

export default function Visual() {
	const [Opt, setOpt] = useState('PLIenA9X9sYejBz8kBsdDV-BbZTeDJeTEH');
	const { data: Vids, isSuccess } = useYoutubeQuery(Opt);

	return (
		<figure className='Visual'>
			<Swiper
				modules={[Pagination, Autoplay]}
				pagination={{
					clickbable: true,
					renderBullet: (index, className) => {
						return `<span class=${className}>${index + 1}</span>`;
					}
				}}
				autoplay={{
					delay: 3000,
					disableOnInteraction: true
				}}
				loop={true}>
				{isSuccess &&
					Vids.map((vid, idx) => {
						if (idx >= 5) return null;
						return (
							<SwiperSlide key={vid.id}>
								<div className='inner'>
									<h3>{vid.snippet.title}</h3>
								</div>
							</SwiperSlide>
						);
					})}
				<Btns />
			</Swiper>
		</figure>
	);
}
