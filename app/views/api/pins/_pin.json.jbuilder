maker = User.find_by(id: pin.user_id)
creator = maker.username

json.set! pin.id do
  json.extract! pin, :id, :title, :description, :alt_text, :website
  json.set! :creator, creator
  json.set! :photo, url_for(pin.photo) if pin.photo.attached?
end