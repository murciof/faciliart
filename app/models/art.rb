class Art < ApplicationRecord
  belongs_to :user
  has_many :orders, dependent: :destroy
  has_many :comments, dependent: :destroy

  validates :data, presence: true
end
