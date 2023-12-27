import { useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useCustomText } from '../../../hooks/useText';
import { FaArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import React from 'react';
import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';

export default function Youtube() {
	const customText = useCustomText('combined');
	const shortenText = useCustomText('short');
	const [SelectedYear, setSelectedYear] = useState(null);
	const [Opt, setOpt] = useState('PLIenA9X9sYejBz8kBsdDV-BbZTeDJeTEH');
	const { data: Vids, isSuccess } = useYoutubeQuery(Opt);

	return (
		<Layout category={'HOME / YOUTUBE'} title={'Our Project'}>
			<div className='Youtube'>
				<section className='thumbnail'>
					{isSuccess &&
						Vids.slice(5, 6).map((data, idx) => {
							return (
								<React.Fragment key={data.id}>
									<article className='info'>
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
									<article className='image'>
										<Link to={`/detail/${data.id}`}>
											<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
										</Link>
									</article>
								</React.Fragment>
							);
						})}
				</section>
				<section className='playList'>
					<div className='headline'>
						<h3>CHECK ALL LATEST RELEASES</h3>
						<ul>
							<li
								onClick={() => {
									setOpt('PLIenA9X9sYejBz8kBsdDV-BbZTeDJeTEH');
									setSelectedYear(null);
								}}
								className={SelectedYear === null ? 'on' : ''}>
								All
							</li>
							<li
								onClick={() => {
									setOpt('PLIenA9X9sYejFq450_Ofy4x7tImW-3PUl');
									setSelectedYear(2023);
								}}
								className={SelectedYear === 2023 ? 'on' : ''}>
								2023
							</li>
							<li
								onClick={() => {
									setOpt('PLIenA9X9sYejNn5U9ovCvLIyT9BEkoA_L');
									setSelectedYear(2022);
								}}
								className={SelectedYear === 2022 ? 'on' : ''}>
								2022
							</li>
							<li
								onClick={() => {
									setOpt('PLIenA9X9sYehUWVqjgWzxctrghO8F6mIq');
									setSelectedYear(2021);
								}}
								className={SelectedYear === 2021 ? 'on' : ''}>
								2021
							</li>
						</ul>
					</div>
					<div className='content'>
						{isSuccess &&
							Vids.map((data, idx) => {
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
