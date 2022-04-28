class Employee < ApplicationRecord

    has_secure_password

    has_many :container_assignments
    has_many :containers, through: :container_assignments
    has_many :shift_assignments
    has_many :shifts, through: :shift_assignments


    def full_name
        self.first_name + " " + self.last_name
    end

end
