class ShiftAssignment < ApplicationRecord

    # Supervisor assigned a shift to an employee

    belongs_to :employee
    belongs_to :shift
end
