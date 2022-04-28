class ShiftContainer < ApplicationRecord

    # Supervisor added containers to the shifts

    belongs_to :shift
    belongs_to :container
    
end
