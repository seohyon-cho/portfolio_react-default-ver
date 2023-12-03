import Department from './components/sub/department/Department';
import './globalStyles/Variables.scss';
import './globalStyles/Reset.scss';
import { useMedia } from './hooks/useMedia';

function App() {
	return (
		<div className={`wrap ${useMedia()}`}>
			<Department />
		</div>
	);
}

export default App;
