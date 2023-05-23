created_pins = []
user.pins.each do |pin|
  created_pins << pin.id
end

created_boards = user.boards.map{ |board| board.id } if user.boards

followers = Follow.where(following_id: user.id)
followed_users = Follow.where(follower_id: user.id)

json.set! user.username do
  json.extract! user,
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
  json.set! :avatar, user.avatar.attached? ? user.avatar.url : nil
  json.set! :created_pins, created_pins
  json.set! :created_boards, created_boards
  json.set! :followers, followers
  json.set! :followed_users, followed_users
end
