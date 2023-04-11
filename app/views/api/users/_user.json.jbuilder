created_pins = []
user.pins.each do |pin|
  created_pins << pin["id"]
end


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
  json.set! :avatar, url_for(user.avatar) if user.avatar.attached?
  json.set! :created_pins, created_pins
end
