class Item < ApplicationRecord
  has_many :item_sizes, dependent: :destroy
end
