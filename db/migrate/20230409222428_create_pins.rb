class CreatePins < ActiveRecord::Migration[7.0]
  def change
    create_table :pins do |t|
      t.string :title
      t.text :description
      t.string :website
      t.references :user, foreign_key: true, index: true, unique: true, null: false

      t.timestamps
    end
  end
end
