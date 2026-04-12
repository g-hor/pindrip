import { Modal } from '@context/modal';
import FollowIndexItem from './FollowIndexItem';

type Props = {
	displayUserIds: number[];
	count: number;
	title: string;
	onClose: () => void;
};

const FollowIndex = ({ displayUserIds, count, title, onClose }: Props) => {
	return (
		<Modal onClose={onClose}>
			<div id="follows-container">
				<h3>
					{count} {` ${title}`}
				</h3>

				<div id="follows-index">
					{displayUserIds.map((userId) => (
						<FollowIndexItem userId={userId} onClose={onClose} key={userId} />
					))}
				</div>
			</div>
		</Modal>
	);
};

export default FollowIndex;
