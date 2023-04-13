saved_pins = board.pins.map{ |pin| pin.id}

json.set! board.name do
  json.extract! board, :id, :name, :description
  json.set! :saved_pins, saved_pins
  json.set! :count, saved_pins.count
end