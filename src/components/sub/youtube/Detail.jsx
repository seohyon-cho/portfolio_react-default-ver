import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './Detail.scss';
import Layout from '../../common/layout/Layout';
import { GrUndo } from 'react-icons/gr';
import { useCustomText } from '../../../hooks/useText';
import { RiDoubleQuotesL, RiDoubleQuotesR } from 'react-icons/ri';

export default function Detail() {
	const shortenText = useCustomText('short');
	const { id } = useParams();
	const [YoutubeData, setYoutubeData] = useState(null);
	const fetchSingleData = async () => {
		const api_key = 'AIzaSyDwxSLXdnfN8bTNC5fnycohdatm0Qk4dLM';
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${id}`;

		try {
			const data = await fetch(baseURL);
			const json = await data.json();
			setYoutubeData(json.items[0].snippet);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchSingleData();
	}, []);

	return (
		<Layout title={'Detail'}>
			{YoutubeData && (
				<div className='Detail'>
					<Link to='/youtube'>
						<div className='undoButton'>
							<p>Back</p>
							<GrUndo />
						</div>
					</Link>
					<h3>{YoutubeData.title}</h3>
					<div className='videoBox'>
						<iframe src={`https://www.youtube.com/embed/${YoutubeData?.resourceId.videoId}`} title={YoutubeData.title}></iframe>
					</div>
					<span>
						<RiDoubleQuotesL />
					</span>
					<p>{shortenText(YoutubeData.description, 1000)}</p>
					<span>
						<RiDoubleQuotesR />
					</span>
				</div>
			)}
		</Layout>
	);
}
