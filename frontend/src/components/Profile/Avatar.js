

const Avatar = ({ user }) => {

  return (
    <img 
      src={user.avatar} 
      alt={user.firstName + `'s avatar`}
      className="avatar"
      />
  )
}

export default Avatar;