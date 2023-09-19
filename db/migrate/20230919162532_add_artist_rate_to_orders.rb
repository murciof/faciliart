class AddArtistRateToOrders < ActiveRecord::Migration[7.0]
  def change
    add_column :orders, :artist_rate, :decimal
  end
end
