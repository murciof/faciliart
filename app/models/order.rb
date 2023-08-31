class Order < ApplicationRecord
  belongs_to :art
  belongs_to :user
  belongs_to :item
  belongs_to :item_size
end
