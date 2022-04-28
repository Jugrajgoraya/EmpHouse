class Container < ApplicationRecord

    has_many :container_assignments 
    has_many :employees, through: :container_assignments
    has_many :shift_containers
    has_many :shifts, through: :shift_containers

end
