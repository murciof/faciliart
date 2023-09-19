class CreateSettings < ActiveRecord::Migration[7.0]
  def change
    create_table :settings do |t|
      t.decimal :artist_rate, default: 0

      t.timestamps
    end
  end
end
