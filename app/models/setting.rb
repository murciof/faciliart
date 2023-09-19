class Setting < ApplicationRecord
  validates :artist_rate, presence: true, numericality: { greater_than: 0, less_than: 100 }
end
