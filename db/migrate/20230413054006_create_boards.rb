class CreateBoards < ActiveRecord::Migration[7.0]
  def change
    create_table :boards do |t|
      t.string :name, null: false
      t.text :description
      t.references :user, foreign_key: true, index: true, null: false

      t.timestamps
    end
  end
end
