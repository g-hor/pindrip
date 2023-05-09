# == Schema Information
#
# Table name: pins
#
#  id          :bigint           not null, primary key
#  title       :string
#  description :text
#  website     :string
#  user_id     :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  alt_text    :text
#
class Pin < ApplicationRecord
  after_save :save_all_pins

  has_one_attached :photo
  belongs_to :user

  has_many :board_pin_associations,
    foreign_key: :pin_id,
    class_name: :BoardPin,
    dependent: :destroy

  has_many :boards,
    through: :board_pin_associations,
    source: :board

  private
  def save_all_pins
    board = Board.where("user_id = ?", self.user_id).first
    BoardPin.create!(pin_id: self.id, board_id: board.id)
  end

end
