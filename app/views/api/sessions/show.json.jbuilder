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

  