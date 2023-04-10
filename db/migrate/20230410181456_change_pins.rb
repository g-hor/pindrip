class ChangePins < ActiveRecord::Migration[7.0]
  def change
    add_column :pins, :alt_text, :text
  end
end
