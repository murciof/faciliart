class AddDataToArts < ActiveRecord::Migration[7.0]
  def change
    add_column :arts, :data, :jsonb
  end
end
