created_pins = @user.pins.map{ |pin| pin.id } if @user.pins
created_boards = @user.boards.map{ |board| board.id } if @user.boards

followers = Follow.where(following_id: @user.id).map { |follow| follow.follower_id }
followed_users = Follow.where(follower_id: @user.id).map { |follow| follow.following_id }
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