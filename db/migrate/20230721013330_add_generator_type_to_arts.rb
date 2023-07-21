class AddGeneratorTypeToArts < ActiveRecord::Migration[7.0]
  def change
    add_column :arts, :generator_type, :string
  end
end
