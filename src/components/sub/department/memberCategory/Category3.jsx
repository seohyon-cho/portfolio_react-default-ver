import { useEffect, useRef, useState } from 'react';
import './Category.scss';

export default function Category1() {
	const [MemberTit, setMemberTit] = useState('');
	const [MemberData, setMemberData] = useState([]);

	const path = useRef(process.env.PUBLIC_URL);

	const fetchDepartment = () => {
		fetch(`${path.current}/DB/photographer.json`)
			.then((data) => data.json())
			.then((json) => {
				setMemberTit(Object.keys(json)[0]);
				setMemberData(Object.values(json)[0]);
			});
	};

	useEffect(() => {
		fetchDepartment();
	}, []);

	return (
		<section className='Category'>
			{MemberData.map((member, idx) => {
				return (
					<article key={member + idx}>
						<div className='pic'>
							<img src={`${path.current}/img/${member.pic}`} alt={member.name} />
						</div>
						<h3>{member.name}</h3>
						<p>{member.position}</p>
					</article>
				);
			})}
		</section>
	);
}
