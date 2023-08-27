class AddArtRefToComments < ActiveRecord::Migration[7.0]
  def change
    add_reference :comments, :art, null: false, foreign_key: true
  end
end
