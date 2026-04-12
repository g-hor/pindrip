type Props = { avatarUrl: string };

const Avatar = ({ avatarUrl }: Props) => {
	return <img src={avatarUrl} alt="This avatar is full of drip!" className="avatar" />;
};

export default Avatar;
