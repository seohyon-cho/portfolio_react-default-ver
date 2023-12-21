import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../../redux/actionType';
import './Modal.scss';
import { AnimatePresence, motion } from 'framer-motion';

export default function Modal({ children }) {
	const dispatch = useDispatch();
	const Open = useSelector(store => store.modalReducer.modal);
	return (
		<AnimatePresence>
			{Open && (
				<motion.aside
					className='Modal'
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 2, transition: { delay: 0.5 } }}
					transition={{ duration: 0.5 }}>
					<motion.div
						className='con'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, transition: { delay: 0 } }}
						transition={{ duration: 0.5, delay: 0.5 }}>
						{children}
					</motion.div>
					<span onClick={() => dispatch({ type: types.MODAL.start, payload: false })}>close</span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}
