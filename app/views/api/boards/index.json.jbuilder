@boards.each do |board|
  json.partial! 'api/boards/board', board: board
end