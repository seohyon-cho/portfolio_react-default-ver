import { useEffect, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useCustomText } from '../../../hooks/useText';
import { FaArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

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
	}, []);

	return (
		<Layout category={'HOME / YOUTUBE'} title={'Our Project'}>
			<div className='Youtube'>
				<section className='thumbnail'>
					{Vids.slice(0, 1).map((data, idx) => {
						return (
							<>
								<article key={data.id} className='info'>
									<span>{customText(data.snippet.publishedAt.split('T')[0], '.')}</span>
									<h2>{shortenText(data.snippet.title, 19)}</h2>
									<p className='descript'>{shortenText(data.snippet.description, 50)}</p>
									<Link to={`/detail/${data.id}`}>
										<div className='hyperlink'>
											<p>READ THE STORY</p>
											<FaArrowRight className='arrow' />
										</div>
									</Link>
								</article>
								<article key={data + idx} className='image'>
									<Link to={`/detail/${data.id}`}>
										<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
									</Link>
								</article>
							</>
						);
					})}
				</section>
				<section className='playList'>
					<div className='headline'>
						<h3>CHECK ALL LATEST RELEASES</h3>
						<ul>
							<li>All</li>
							<li>2023</li>
							<li>2022</li>
							<li>2021</li>
						</ul>
					</div>
					<div className='content'>
						{Vids.map((data, idx) => {
							const [date, time] = data.snippet.publishedAt.split('T');

							return (
								<article key={data.id}>
									<div className='pic'>
										<Link to={`/detail/${data.id}`}>
											<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
										</Link>
									</div>
									<div className='infoBox'>
										<span>{customText(date, '.')}</span>
										<h2>{shortenText(data.snippet.title, 17)}</h2>
										<p className='descript'>{shortenText(data.snippet.description, 25)}</p>
										<Link to={`/detail/${data.id}`}>
											<div className='hyperlink'>
												<p>More Info</p>
												<FaArrowRight className='arrow' />
											</div>
										</Link>
									</div>
								</article>
							);
						})}
					</div>
				</section>
			</div>
		</Layout>
	);
}
