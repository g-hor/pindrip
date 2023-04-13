created_pins = @user.pins.map{|pin| pin.id } if @user.pins

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