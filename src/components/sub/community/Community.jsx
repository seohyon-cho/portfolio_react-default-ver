import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Community.scss';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { FaRegCheckSquare } from 'react-icons/fa';
import { useCustomText } from '../../../hooks/useText';
import postData from './dummyPosts.json';

export default function Community() {
	const path = useRef(process.env.PUBLIC_URL);
	const changeText = useCustomText('combined');

	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return postData.dummyPosts;
	};

	const [Post, setPost] = useState(getLocalData);
	const refTit = useRef(null);
	const refUser = useRef(null);
	const refCon = useRef(null);
	const refEditTit = useRef(null);
	const refEditCon = useRef(null);
	const refEditUser = useRef(null);
	const editMode = useRef(false);

	const resetPost = e => {
		refTit.current.value = '';
		refUser.current.value = '';
		refCon.current.value = '';
	};

	const createPost = e => {
		if (!refTit.current.value.trim() || !refUser.current.value.trim() || !refCon.current.value.trim()) {
			return alert('주어진 항목을 모두 입력해주세요.');
		}
		const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;
		setPost([{ title: refTit.current.value, username: refUser.current.value, content: refCon.current.value, date: new Date(korTime) }, ...Post]);
		resetPost();
	};

	const deletePost = delIndex => {
		if (!window.confirm('해당 게시글을 삭제하시겠습니까?')) return;
		setPost(Post.filter((_, idx) => delIndex !== idx));
	};

	const enableUpdate = editIndex => {
		if (editMode.current) return;
		editMode.current = true;
		setPost(
			Post.map((el, idx) => {
				if (editIndex === idx) el.enableUpdate = true;
				return el;
			})
		);
	};

	const disableUpdate = editIndex => {
		editMode.current = false;
		setPost(
			Post.map((el, idx) => {
				if (editIndex === idx) el.enableUpdate = false;
				return el;
			})
		);
	};

	const updatePost = updateIndex => {
		if (!refEditTit.current.value.trim() || !refEditCon.current.value.trim()) {
			return alert('수정할 게시글의 제목과 본문을 모두 입력하세요!');
		}
		editMode.current = false;

		setPost(
			Post.map((el, idx) => {
				if (updateIndex === idx) {
					el.title = refEditTit.current.value;
					el.username = refEditUser.current.value;
					el.content = refEditCon.current.value;
					el.enableUpdate = false;
				}
				return el;
			})
		);
	};

	useEffect(() => {
		Post.map(el => (el.enableUpdate = false));
		localStorage.setItem('post', JSON.stringify(Post));
	}, [Post]);

	return (
		<Layout category={'HOME / COMMUNITY'} title={'Community'}>
			<div className='Community'>
				<div className='visual'>
					<div className='pic'>
						<video src={`${path.current}/img/ocean2.mp4`} loop autoPlay muted playsInline></video>
					</div>
					<div className='info'>
						<h1>What People Say About Us</h1>
						<p>
							We are a full service creative studio specializing in photography, product styling, and creative direction. Discover the world in a new
							way!
						</p>
					</div>
					<ul className='numinfo'>
						<li>
							<h4>2014</h4>
							<p>caption</p>
						</li>
						<li>
							<h4>8900+</h4>
							<p>caption</p>
						</li>
						<li>
							<h4>3100+</h4>
							<p>caption</p>
						</li>
					</ul>
				</div>
				<div className='wrap'>
					<div className='inputSpace'>
						<div className='inputBox'>
							<input type='text' placeholder='title' name='tit' ref={refTit} />
							<input type='text' placeholder='user name' name='username' ref={refUser} />
							<textarea name='con' cols='30' rows='5' placeholder='write here . . .' ref={refCon}></textarea>

							<nav>
								<button className='del' onClick={resetPost}>
									undo
								</button>
								<button className='sub' onClick={createPost}>
									submit
								</button>
							</nav>
						</div>
					</div>
					<div className='showSpace'>
						{Post.map((el, idx) => {
							const date = JSON.stringify(el.date);
							const strDate = changeText(date?.split('T')[0].slice(1), '.');

							if (el.enableUpdate) {
								return (
									<article key={el + idx}>
										<h1>
											<input type='text' defaultValue={el.title} ref={refEditTit} />
										</h1>
										<p className='time'>{strDate}</p>
										<p className='txt'>
											<textarea cols='30' rows='10' defaultValue={el.content} ref={refEditCon}></textarea>
										</p>
										<div className='profile'>
											<IoPersonCircleOutline className='icon' />
											<p className='name'>
												<input type='text' defaultValue={el.username} ref={refEditUser} />
											</p>
										</div>
										<nav>
											{/* 수정모드일 때 해당 버튼 클릭 시 다시 출력모드 변경 */}
											<button onClick={() => disableUpdate(idx)}>
												<AiOutlineCloseSquare />
											</button>
											<button onClick={() => updatePost(idx)}>
												<FaRegCheckSquare />
											</button>
										</nav>
									</article>
								);
							} else {
								return (
									<article key={el + idx}>
										<h1>{el.title}</h1>
										<p className='time'>{strDate}</p>
										<p className='txt'>{el.content}</p>
										<div className='profile'>
											<IoPersonCircleOutline className='icon' />
											<p className='name'>{el.username}</p>
										</div>
										<nav>
											<button onClick={() => enableUpdate(idx)}>
												<FiEdit />
											</button>
											<button onClick={() => deletePost(idx)}>
												<FiTrash />
											</button>
										</nav>
									</article>
								);
							}
						})}
					</div>
				</div>
			</div>
		</Layout>
	);
}
