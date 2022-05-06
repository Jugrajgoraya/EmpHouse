class ContainerAssignment < ApplicationRecord

    # Supervisor assigned container to employees
    # validates :employee, uniqueness: true
    
    belongs_to :container
    belongs_to :employee
    
end
