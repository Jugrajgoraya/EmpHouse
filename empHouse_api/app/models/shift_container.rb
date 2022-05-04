class ShiftContainer < ApplicationRecord

    # Supervisor added containers to the shifts
    validates :container, uniqueness: true

    belongs_to :shift
    belongs_to :container
    
end
