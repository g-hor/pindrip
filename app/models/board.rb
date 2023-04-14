class Board < ApplicationRecord
  # symbols = [' ', "'", '"', '.', ',', ';', ':', '/', '?', '!', '@', '#', '$', '%', '%', '&', '(', ')', '-']
  # lower_letters = *("a".."z")
  # upper_letters = *("A".."Z")
  # nums = *("0".."9")
  # accepted_chars = symbols + lower_letters + upper_letters + nums

  belongs_to :user

  has_many :board_pin_associations,
    foreign_key: :board_id,
    class_name: :BoardPin,
    dependent: :destroy

  has_many :pins,
    through: :board_pin_associations,
    source: :pin

end
