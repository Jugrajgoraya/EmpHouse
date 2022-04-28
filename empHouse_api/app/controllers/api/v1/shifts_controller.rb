class Api::V1::ShiftsController < ApplicationController

    def current
        shifts = Shift.all.where(status:"working")
        render(json: shifts)
    end
    def create
        shift = Shift.new shift_regular_params
        shift.supervisor = current_supervisor
        shift.container_ids = shift_container_ids
        shift.employee_ids = shift_employee_ids

        if shift.save
            render json: { id: shift.id }
        else
            render(
                json: { errors: shift.errors.messages},
                status: 422 #Unprocessable Entity
            )
        end 

    end
    def show
        shift = Shift.find params[:id]
        employees = []
        containers = []
        shift.employee_ids.each{ |eID| 
            e = Employee.find eID
            employees.push(e)
        }
        shift.container_ids.each{ |cID| 
            c = Container.find cID
            containers.push(c)
        }

        render( json: {shift: shift, employees: employees, containers: containers})
    end

    def index
        shifts = Shift.all.order(created_at: :desc)
        render(json: shifts)
    end

    def add_employees
        
    end
    def add_containers
        
    end
    def finalize
        shift = Shift.find params[:id]

        shift.shift_assignments.where(employee_id:1).update(rating:3)

        

        shift.update(status: "finalized")
        render(json: shift)
    end

    private

    def shift_regular_params
        params.require(:shift).permit(:date, :sub_time, :location,:comments)
    end
    def shift_container_ids
        params.require(:shift).permit(:container_ids)
    end
    def shift_employee_ids
        params.require(:shift).permit(:employee_ids)
    end
end
