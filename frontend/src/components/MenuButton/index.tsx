import { useEffect, useState, useRef } from 'react';
import DropdownMenu from './DropdownMenu';
import './MenuButton.css';

const MenuButton = ({ displayInitial, displayName }) => {
	const [showDrop, setShowDrop] = useState(false);
	const dropdown = useRef<HTMLDivElement | null>(null);

	const clickShow = () => {
		if (showDrop) return;
		setShowDrop(true);
	};

	useEffect(() => {
		if (!showDrop) return;

		const clickHide = (e) => {
			if (dropdown?.current?.contains(e.target)) return;
			setShowDrop(false);
		};

		document.addEventListener('click', clickHide);

		return () => document.removeEventListener('click', clickHide);
	}, [showDrop]);

	return (
		<>
			<div className="right-drop-icon-holder dropdown" onClick={clickShow}>
				<i className="fa-solid fa-chevron-down dropbtn" />
			</div>
			{showDrop && (
				<div ref={dropdown}>
					<DropdownMenu displayName={displayName} displayInitial={displayInitial} setShowDrop={setShowDrop} />
				</div>
			)}
		</>
	);
};

export default MenuButton;
