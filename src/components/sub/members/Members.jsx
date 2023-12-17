import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Members.scss';

export default function Members() {
	const initVal = useRef({
		userid: '',
		email: '',
		pwd1: '',
		pwd2: '',
		edu: '',
		gender: '',
		interest: [],
		comments: ''
	});

	const [Val, setVal] = useState(initVal.current);
	const [Errs, setErrs] = useState({});

	// 실시간으로 이루어짐.
	const handleChange = e => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleCheck = e => {
		const { name } = e.target;
		const inputs = e.target.parentElement.querySelectorAll('input');
		const checkArr = [];

		inputs.forEach(input => input.checked && checkArr.push(input.value));
		setVal({ ...Val, [name]: checkArr });
	};

	// 인증 절차 로직
	const check = value => {
		const errs = {};
		if (value.userid.length < 5) errs.userid = '아이디는 최소 5글자 이상 입력하세요.';
		if (value.comments.length < 10) errs.comments = '코멘트는 최소 10글자 이상 입력하세요.';
		if (!value.gender) errs.gender = '성별을 선택해주세요.';
		if (!value.interest.length) errs.interest = '관심분야를 한 가지 이상 선택하세요.';
		if (!value.edu) errs.edu = '최종 학력을 선택하세요.';

		return errs;
	};

	useEffect(() => {
		console.log(Val);
		setErrs(check(Val));
	}, [Val]);
	return (
		<Layout category={'HOME / MEMBERS'} title={'Join with Us'}>
			<div className='Members'>
				<div className='wrap'>
					<div className='frame'>
						<h1>MELLOW</h1>
						<form>
							<fieldset>
								<legend className='legend'>회원가입 폼</legend>
								<table>
									<tbody>
										{/* userid, email */}
										<tr>
											<td>
												<input type='text' name='userid' placeholder='User ID' value={Val.userid} onChange={handleChange} />
												{Errs.userid && <p>{Errs.userid}</p>}
											</td>
											<td>
												<input type='text' name='email' placeholder='Email' value={Val.email} onChange={handleChange} />
												{Errs.email && <p>{Errs.email}</p>}
											</td>
										</tr>
										{/* pwd1, pwd3 */}
										<tr>
											<td>
												<input type='password' name='pwd1' placeholder='Password' value={Val.pwd1} onChange={handleChange} />
											</td>
											<td>
												<input type='password' name='pwd2' placeholder='Re-Password' value={Val.pwd2} onChange={handleChange} />
											</td>
										</tr>
										{/* edu */}
										<tr>
											<td colSpan='2'>
												<select name='edu' onChange={handleChange}>
													<option value=''>Education</option>
													<option value='elementary-school'>초등학교 졸업</option>
													<option value='middle-school'>중학교 졸업</option>
													<option value='high-school'>고등학교 졸업</option>
													<option value='college'>대학교 졸업</option>
												</select>
												{Errs.edu && <p>{Errs.edu}</p>}
											</td>
										</tr>
										{/* gender */}
										<tr>
											<td colSpan='2'>
												<input type='radio' defaultValue='female' id='female' name='gender' onChange={handleChange} />
												<label htmlFor='female'>Female</label>

												<input type='radio' defaultValue='male' id='male' name='gender' onChange={handleChange} />
												<label htmlFor='male'>Male</label>
												{Errs.gender && <p>{Errs.gender}</p>}
											</td>
										</tr>
										{/* interests */}
										<tr>
											<td colSpan='2'>
												<input type='checkbox' name='interest' id='sports' defaultValue='sports' onChange={handleChange} />
												<label htmlFor='sports'>Sports</label>

												<input type='checkbox' name='interest' id='reading' defaultValue='reading' onChange={handleChange} />
												<label htmlFor='reading'>Reading</label>

												<input type='checkbox' name='interest' id='music' defaultValue='music' onChange={handleChange} />
												<label htmlFor='music'>Music</label>

												<input type='checkbox' name='interest' id='game' defaultValue='game' onChange={handleChange} />
												<label htmlFor='game'>Game</label>
												{Errs.interest && <p>{Errs.interest}</p>}
											</td>
										</tr>
										{/* comments */}
										<tr>
											<td colSpan='2'>
												<textarea
													name='comments'
													cols='30'
													rows='6'
													placeholder='Leave a comment ...'
													value={Val.comments}
													onChange={handleChange}></textarea>
												{Errs.comments && <p>{Errs.comments}</p>}
											</td>
										</tr>
										{/* button */}
										<tr>
											<td colSpan='2'>
												<input type='reset' value='Cancel' className='button' />
												<input type='submit' value='Submit' className='button' />
											</td>
										</tr>
									</tbody>
								</table>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</Layout>
	);
}
