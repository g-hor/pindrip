class ChangeUsers < ActiveRecord::Migration[7.0]
  def change
    change_column_null :users, :username, false
    change_column_null :users, :first_name, false
  end
end
