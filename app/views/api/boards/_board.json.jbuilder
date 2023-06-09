symbols = {
  ' ' => "-",
  "'" => "1",
  '"' => "2",
  '.' => "3",
  ',' => "4",
  ';' => "5",
  ':' => "6",
  '/' => "7",
  '?' => "8",
  '!' => "9",
  '@' => "10",
  '#' => "11",
  '$' => "12",
  '%' => "13",
  '&' => "14",
  '(' => "15",
  ')' => "16",
  '-' => "17"
}

board.pins ? saved_pins = board.pins.sort_by(&:created_at).map{ |pin| pin.id} : saved_pins = []
board_name_split = board.name.split("").map do |char|
  symbols[char] ? symbols[char] : char.downcase
end
board_url = board_name_split.join("")

json.set! board_url do
  json.extract! board, :id, :name, :description, :user_id
  json.set! :saved_pins, saved_pins
  json.set! :count, saved_pins.count
  json.set! :board_url, board_url
end