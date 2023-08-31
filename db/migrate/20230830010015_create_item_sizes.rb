class CreateItemSizes < ActiveRecord::Migration[7.0]
  def change
    create_table :item_sizes do |t|
      t.references :item, null: false, foreign_key: true
      t.string :size
      t.decimal :price

      t.timestamps
    end
  end
end
