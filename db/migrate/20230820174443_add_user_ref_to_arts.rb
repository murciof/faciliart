class AddUserRefToArts < ActiveRecord::Migration[7.0]
  def change
    add_reference :arts, :user, null: false, foreign_key: true
  end
end
