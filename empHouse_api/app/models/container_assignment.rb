class ContainerAssignment < ApplicationRecord

    # Supervisor assigned container to employees

    belongs_to :container
    belongs_to :employee
    
end
