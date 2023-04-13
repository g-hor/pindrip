json.set! board.name do
  json.extract! board, :id, :name, :description
  json.set! saved_pins, board.pins
end