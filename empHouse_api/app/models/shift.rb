class Shift < ApplicationRecord

    validates :date, presence: true
    validates :location, presence: true
    validates :sub_time, presence: true

    has_many :shift_assignments
    has_many :employees, through: :shift_assignments
    has_many :shift_containers
    has_many :containers, through: :shift_containers 

end
