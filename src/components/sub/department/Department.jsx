import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';
import Category1 from './memberCategory/Category1';
import Category2 from './memberCategory/Category2';
import Category3 from './memberCategory/Category3';

export default function Department() {
	const path = useRef(process.env.PUBLIC_URL);
	const [SelectedCategory, setSelectedCategory] = useState('Category1');
	const [HistoryTit, setHistoryTit] = useState('');

	const [HistoryData, setHistoryData] = useState([]);

	const fetchHistory = () => {
		fetch(`${path.current}/DB/history.json`)
			.then((data) => data.json())
			.then((json) => {
				setHistoryTit(Object.keys(json)[0]);
				setHistoryData(Object.values(json)[0]);
			});
	};

	const handleButtonClick = (category) => {
		setSelectedCategory(category);
	};

	useEffect(() => {
		fetchHistory();
	}, []);

	return (
		<Layout>
			<section className='topCont'>
				<div className='imgBox'>
					<div className='person1'>
						<div className='img'>
							<img src={`${path.current}/img/member1.jpg`} alt='member2' />
						</div>
						<div className='comment'>
							<p className='caption1'>person1</p>
							<p className='caption2'>person1-1</p>
						</div>
					</div>
					<div className='person2'>
						<div className='img'>
							<img src={`${path.current}/img/member2.jpg`} alt='member1' />
						</div>
						<div className='comment'>
							<p className='caption1'>person2</p>
							<p className='caption2'>person2-1</p>
						</div>
					</div>
				</div>
				<div className='textBox'>
					<h2>{HistoryTit}</h2>
					<div className='con'>
						{HistoryData.map((history, idx) => {
							return (
								<article key={history + idx}>
									<h3>{Object.keys(history)[0]}</h3>
									<ul>
										{Object.values(history)[0].map((list, idx) => {
											return <li key={list + idx}>{list}</li>;
										})}
									</ul>
								</article>
							);
						})}
					</div>
				</div>
			</section>
			<section className='bottomCont'>
				<ul className='memberCategory'>
					<li>
						<h2
							style={{ color: SelectedCategory === 'Category1' ? 'rgba(var(--baseColor-code), 0.8)' : 'rgba(var(--baseColor-code), 0.4)' }}
							onClick={() => {
								handleButtonClick('Category1');
							}}
						>
							#Designers
						</h2>
					</li>
					<li>
						<h2
							style={{ color: SelectedCategory === 'Category2' ? 'rgba(var(--baseColor-code), 0.8)' : 'rgba(var(--baseColor-code), 0.4)' }}
							onClick={() => handleButtonClick('Category2')}
						>
							#Cinematographer
						</h2>
					</li>
					<li>
						<h2
							style={{ color: SelectedCategory === 'Category3' ? 'rgba(var(--baseColor-code), 0.8)' : 'rgba(var(--baseColor-code), 0.4)' }}
							onClick={() => handleButtonClick('Category3')}
						>
							#Photographer
						</h2>
					</li>
				</ul>
				<div className='content'>
					<section className='textPart'>
						<div className='textBox'>
							<p>CREATIVE TECHNOLOGY</p>
							<h3>We set up teams to shape your identity, push your idea & manage the work-flow from pre- to post production.</h3>
						</div>
					</section>
					<section className='memberIntro'>{SelectedCategory === 'Category1' && <Category1 />}</section>
					<section className='memberIntro'>{SelectedCategory === 'Category2' && <Category2 />}</section>
					<section className='memberIntro'>{SelectedCategory === 'Category3' && <Category3 />}</section>
				</div>
			</section>
		</Layout>
	);
}
