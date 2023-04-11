json.set! pin.id do
  json.extract! pin, :id, :title, :description, :alt_text, :website
  json.set! :photo, url_for(pin.photo) if pin.photo.attached?
end