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
#
class Pin < ApplicationRecord
  validates :website,
    format: { with: URI:MailTo::EMAIL_REGEXP },
    allow_nil: true

  has_one_attached :photo
  belongs_to :user



end
