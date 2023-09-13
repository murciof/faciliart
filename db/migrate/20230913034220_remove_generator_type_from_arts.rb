class RemoveGeneratorTypeFromArts < ActiveRecord::Migration[7.0]
  def change
    remove_column :arts, :generator_type, :string
  end
end
