@user.pins ? created_pins = @user.pins.map{ |pin| pin.id } : created_pins = []
@user.boards ? created_boards = @user.boards.map{ |board| board.id } : created_boards = []


followers = 
  Follow
    .where(following_id: @user.id)
    .map { |follow| follow.follower_id }
    .map { |id| User.find_by(id: id).username }
followed_users = 
  Follow
    .where(follower_id: @user.id)
    .map { |follow| follow.following_id }
    .map { |id| User.find_by(id: id).username }
follower_count = followers.length
following_count = followed_users.length

json.extract! @user,
  :id,
  :email, 
  :username,
  :first_name,
  :last_name,
  :about,
  :pronouns,
  :website,
  :gender,
  :country

json.avatar @user.avatar.attached? ? @user.avatar.url : nil
json.created_pins created_pins
json.created_boards created_boards
json.followers followers
json.followed_users followed_users
json.follower_count follower_count
json.following_count following_count