class ChangeBoards < ActiveRecord::Migration[7.0]
  def change
    add_index :boards, [:user_id, :name], unique: true
  end
end
