class ItemSize < ApplicationRecord
  belongs_to :item

  has_many :orders, dependent: :destroy
end
