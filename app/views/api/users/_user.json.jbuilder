created_pins = []
user.pins.each do |pin|
  created_pins << pin.id
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
  json.set! :avatar, user.avatar.attached? ? user.avatar.url : nil
  json.set! :created_pins, created_pins
end
