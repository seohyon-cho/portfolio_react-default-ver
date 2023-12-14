import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Community.scss';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { FaRegCheckSquare } from 'react-icons/fa';
import { useCustomText } from '../../../hooks/useText';

export default function Community() {
	const changeText = useCustomText('combined');

	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return [];
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
		//  아래 구문 쓰면 null 어쩌고 오류 뜨고 그리고 갑자기 layout 관련 classList 에 대해서 오류도 생김
		// Post.map(el => (el.enableUpdate = false));
		localStorage.setItem('post', JSON.stringify(Post));
	}, [Post]);

	return (
		<Layout category={'HOME / COMMUNITY'} title={'Community'}>
			<div className='Community'>
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
							/* 하단 if문 안 쓰면 title이랑 date가 null로 잡혀서 오류 뜨는데 어떻게 해결해야할지..  */
							if (!el || !el.title || !el.date) {
								return null;
							}
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
