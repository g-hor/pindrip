class Follow < ApplicationRecord
  validates :follower_id, uniqueness: { scope: :following_id }

  belongs_to :follower,
    primary_key: :id,
    foreign_key: :follower_id,
    class_name: "User"

end
