json.user do
  json.extract! @user, :id, :email, :username
end