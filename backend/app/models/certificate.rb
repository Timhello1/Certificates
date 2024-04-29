class Certificate < ApplicationRecord
    belongs_to :user

    # Validations
    validates :name, presence: true
    validates :description, presence: true
    validates :user_id, presence: true
end
