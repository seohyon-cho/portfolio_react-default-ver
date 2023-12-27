import './Detail.scss';
import Layout from '../../common/layout/Layout';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useCustomText } from '../../../hooks/useText';
import { useYoutubeQueryById } from '../../../hooks/useYoutubeQuery';
import { GrUndo } from 'react-icons/gr';
import { RiDoubleQuotesL, RiDoubleQuotesR } from 'react-icons/ri';

export default function Detail() {
	const customText = useCustomText('combined');
	const shortenText = useCustomText('short');
	const { id } = useParams();
	const { data: YoutubeData, isSuccess } = useYoutubeQueryById(id);

	return (
		<Layout title={'Detail'}>
			{isSuccess && YoutubeData && (
				<div className='Detail'>
					<Link to='/youtube'>
						<div className='undoButton'>
							<p>Back</p>
							<GrUndo />
						</div>
					</Link>
					<p className='date'>{customText(YoutubeData.publishedAt.split('T')[0], '.')}</p>
					<h3>{YoutubeData.title}</h3>
					<div className='videoBox'>
						<iframe src={`https://www.youtube.com/embed/${YoutubeData?.resourceId.videoId}`} title={YoutubeData.title}></iframe>
					</div>
					<span>
						<RiDoubleQuotesL />
					</span>
					<p className='descript'>{shortenText(YoutubeData.description, 1000)}</p>
					<span>
						<RiDoubleQuotesR />
					</span>
				</div>
			)}
		</Layout>
	);
}
