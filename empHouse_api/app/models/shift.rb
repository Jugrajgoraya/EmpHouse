class Shift < ApplicationRecord

    has_many :shift_assignments
    has_many :employees, through: :shift_assignments
    has_many :shift_containers
    has_many :containers, through: :shift_containers 

end
