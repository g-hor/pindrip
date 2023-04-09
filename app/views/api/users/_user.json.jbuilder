# json.extract! user,
#   :id,
#   :email, 
#   :username,
#   :first_name,
#   :last_name,
#   :about,
#   :pronouns,
#   :website

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
end