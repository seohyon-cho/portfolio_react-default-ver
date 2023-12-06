import { useEffect, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useCustomText } from '../../../hooks/useText';
import { FaArrowRight } from 'react-icons/fa6';

export default function Youtube() {
	const customText = useCustomText('combined');
	const shortenText = useCustomText('short');
	const [Vids, setVids] = useState([]);

	const fetchYoutube = async () => {
		const api_key = 'AIzaSyDwxSLXdnfN8bTNC5fnycohdatm0Qk4dLM';
		const pid = 'PLIenA9X9sYejBz8kBsdDV-BbZTeDJeTEH';
		const num = '10';
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

		try {
			const data = await fetch(baseURL);
			const json = await data.json();
			setVids(json.items);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchYoutube();
		console.log(Vids);
	}, []);

	return (
		<Layout category={'HOME / YOUTUBE'} title={'Our Project'}>
			<section className='thumbnail'>
				<article className='info'>INFO</article>
				<article className='image'>
					<img src={Vids[5]?.snippet.thumbnails.standard.url} alt={Vids[5]?.snippet.title} />
				</article>
			</section>
			<section className='playList'>
				<div className='headline'></div>
				<div className='content'>
					{Vids.map((data, idx) => {
						const [date, time] = data.snippet.publishedAt.split('T');

						return (
							<article key={data.id}>
								<div className='pic'>
									<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
								</div>
								<div className='infoBox'>
									<span>{customText(date, '.')}</span>
									<h2>{shortenText(data.snippet.title, 17)}</h2>
									<p className='descript'>{shortenText(data.snippet.description, 25)}</p>
									<div className='hyperlink'>
										<p>More Info</p>
										<FaArrowRight className='arrow' />
									</div>
								</div>
							</article>
						);
					})}
				</div>
			</section>
		</Layout>
	);
}
