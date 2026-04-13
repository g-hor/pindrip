import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { splashImages1, splashImages2, splashImages3 } from './images';
import { getCurrentUser } from '../../store/session';
import './Splash.css';

const SplashPage = () => {
	const navigate = useNavigate();
	const currentUser = useSelector(getCurrentUser);

	const cols = useRef([]);

	// Helper function to assign refs
	const setColRef = (el, index) => {
		cols.current[index] = el;
	};

	// Ensure user is brought to homepage if already authenticated
	useEffect(() => {
		if (currentUser) navigate('/home');
	}, [navigate, currentUser]);

	useEffect(() => {
		const addClass = (delay, className, indices) =>
			setTimeout(() => {
				indices.forEach((i) => cols.current[i]?.classList.add(className));
			}, delay);

		const removeClass = (delay, className, indices) =>
			setTimeout(() => {
				indices.forEach((i) => cols.current[i]?.classList.remove(className));
			}, delay);

		// Index groups for image sets
		const group1 = [0, 1, 2, 3, 4, 5, 6];
		const group2 = [7, 8, 9, 10, 11, 12, 13];
		const group3 = [14, 15, 16, 17, 18, 19, 20];

		// Initial sequence
		addClass(0, 'drip-col', group1);
		addClass(5225, 'opaque-drip', group1);

		removeClass(6000, 'opaque-drip', group2);
		addClass(10500, 'opaque-drip', group2);

		removeClass(11225, 'opaque-drip', group3);
		addClass(16500, 'opaque-drip', group3);

		// Add/remove classes at an interval
		const interval = setInterval(() => {
			removeClass(775, 'opaque-drip', group1);
			addClass(5225, 'opaque-drip', group1);

			removeClass(6000, 'opaque-drip', group2);
			addClass(10500, 'opaque-drip', group2);

			removeClass(11225, 'opaque-drip', group3);
			addClass(16500, 'opaque-drip', group3);
		}, 16500);

		// Cleanup for all the intervals attached
		return () => clearInterval(interval);
	}, []);

	// Helper function to render columns of images
	const renderColumns = (images, offset = 0) =>
		Array.from({ length: 7 }).map((_, i) => (
			<div
				key={i}
				className={`splash-grid-col col-${i + 1} ${offset > 0 ? 'drip-col opaque-drip' : ''}`}
				ref={(el) => setColRef(el, i + offset)}
			>
				{images.slice(i * 3, i * 3 + 4).map((img, idx) => (
					<img src={img} alt="" key={idx} />
				))}
			</div>
		));

	return (
		<div id="splash-bg-container">
			<div id="splash-page-gradient" />

			<div id="splash-text-container">
				<div id="splash-top-text">Get your next</div>
				<div id="splash-bottom-text">drip inspiration</div>
			</div>

			{/* FIRST */}
			<div id="splash-grid-container">{renderColumns(splashImages1, 0)}</div>

			{/* SECOND */}
			<div id="splash-grid-container">{renderColumns(splashImages2, 7)}</div>

			{/* THIRD */}
			<div id="splash-grid-container">{renderColumns(splashImages3, 14)}</div>
		</div>
	);
};

export default SplashPage;
