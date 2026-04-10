json.set! pin.id do
  json.extract! pin, :id, :title, :description, :alt_text, :website
  json.set! :creator, pin.user_id
  json.set! :photo, url_for(pin.photo) if pin.photo.attached?
end