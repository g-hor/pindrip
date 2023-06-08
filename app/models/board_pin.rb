class BoardPin < ApplicationRecord

  belongs_to :board
  belongs_to :pin

  validates :board_id, uniqueness: { scope: :pin_id }

end