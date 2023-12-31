import { useState } from 'react';
import './Visual.scss';
import 'swiper/css';
import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Visual() {
	const [Opt, setOpt] = useState('PLIenA9X9sYejBz8kBsdDV-BbZTeDJeTEH');
	const { data: Vids, isSuccess } = useYoutubeQuery(Opt);

	return (
		<figure className='Visual'>
			<Swiper>
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
			</Swiper>
		</figure>
	);
}
