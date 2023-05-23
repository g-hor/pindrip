class CreateFollows < ActiveRecord::Migration[7.0]
  def change
    create_table :follows do |t|
      t.references :follower, foreign_key: { to_table: :users }, index: true, null: false
      t.references :following, foreign_key: { to_table: :users }, index: true, null: false

      t.timestamps
    end
  end
end
