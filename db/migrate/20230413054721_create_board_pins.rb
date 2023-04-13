class CreateBoardPins < ActiveRecord::Migration[7.0]
  def change
    create_table :board_pins do |t|
      t.references :board, foreign_key: true, index: true, null: false
      t.references :pin, foreign_key: true, index: true, null: false

      t.timestamps
    end
  end
end
