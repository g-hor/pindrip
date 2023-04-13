class Board < ApplicationRecord

  belongs_to :user

  has_many :board_pin_associations,
    foreign_key: :board_id,
    class_name: :BoardPin,
    dependent: :destroy

  has_many :pins,
    through: :board_pin_associations,
    source: :pin

end
