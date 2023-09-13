class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :art

  validates :content, :user_id, :art_id, presence: true
end
