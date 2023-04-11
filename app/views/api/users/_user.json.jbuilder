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
end
