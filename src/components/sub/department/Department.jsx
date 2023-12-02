import { useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';
import Category1 from './memberCategory/Category1';
import Category2 from './memberCategory/Category2';
import Category3 from './memberCategory/Category3';

export default function Department() {
	const [SelectedCategory, setSelectedCategory] = useState('Category1');

	const handleButtonClick = (category) => {
		setSelectedCategory(category);
	};

	return (
		<Layout>
			<section className='topCont'>
				<div className='imgBox'>
					<div className='person1'>
						<div className='img'>
							<img src={process.env.PUBLIC_URL + '/img/member2.jpg'} alt='member2' />
						</div>
						<p className='caption1'>person1</p>
					</div>
					<div className='person2'>
						<div className='img'>
							<img src={process.env.PUBLIC_URL + '/img/member1.jpg'} alt='member1' />
						</div>
						<p className='caption2'>person2</p>
					</div>
				</div>
				<div className='textBox'>test</div>
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
						<div className='textBox'></div>
					</section>
					<section className='memberIntro'>{SelectedCategory === 'Category1' && <Category1 />}</section>
					<section className='memberIntro'>{SelectedCategory === 'Category2' && <Category2 />}</section>
					<section className='memberIntro'>{SelectedCategory === 'Category3' && <Category3 />}</section>
				</div>
			</section>
		</Layout>
	);
}
