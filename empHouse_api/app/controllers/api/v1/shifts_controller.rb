class Api::V1::ShiftsController < ApplicationController

    def current
        shifts = Shift.all.where(status:"working")
        render(json: shifts)
    end
    def create
        shift = Shift.new shift_regular_params
        shift.supervisor = current_supervisor.first_name
        if shift.save
            render json: { id: shift.id }
        else
            render(
                json: { errors: shift.errors.messages},
                status: 422
            )
        end 

    end
    def employees
        shift = Shift.find params[:shift_id]
        employeeObjects = []
        shift.employee_ids.each{ |eID| 
            e = Employee.find eID
            containers = shift.containers.where(container_assignments:ContainerAssignment.find_by(employee_id:eID))
            employeeObjects.push({e:e, containers:containers})
        }
        render(json: {shift: shift, employeeObjects: employeeObjects})
    end
    def show
        shift = Shift.find params[:id]
        employeeObjects = []
        containers = []
        shift.employee_ids.each{ |eID| 
            e = Employee.find eID
            cans = shift.containers.where(container_assignments:ContainerAssignment.find_by(employee_id:eID))
            employeeObjects.push({e:e, containers:cans})
        }
        shift.container_ids.each{ |cID| 
            c = Container.find cID
            containers.push({c:c, employees:c.employees})
        }

        render( json: {shift: shift, employeeObjects: employeeObjects, containers: containers})
    end

    def index
        shifts = Shift.all.order(created_at: :desc)
        render(json: shifts)
    end

    def add_employees
        shift = Shift.find params[:shift_id]
        employee = Employee.find params[:newEmpId]
        employeeObjects = []
        if shift.employees.push(employee) 
            employee.update(status: "signed_in")
            shift.employee_ids.each{ |eID| 
                e = Employee.find eID
                cans = shift.containers.where(container_assignments:ContainerAssignment.find_by(employee_id:eID))
                employeeObjects.push({e:e, containers:cans})
            }
            render(json: {employeeObjects: employeeObjects})
        else
            render(json: { errors: shift.errors.messages},
                status: 422
            )           
        end
    end
    def remove_employees
        shift = Shift.find params[:shift_id]
        employee = Employee.find params[:empId]
        employeeObjects = []
        if shift.employees.delete(employee) 
            employee.update(status: "signed_out")

            shift.employee_ids.each{ |eID| 
                e = Employee.find eID
                cans = shift.containers.where(container_assignments:ContainerAssignment.find_by(employee_id:eID))
                employeeObjects.push({e:e, containers:cans})
            }
            render(json: {employeeObjects: employeeObjects})
        else
            render(json: { errors: shift.errors.messages},
                status: 422
            )           
        end
    end
    def add_containers
        shift = Shift.find params[:shift_id]
        container = Container.find params[:newCanId]
        containers = []
        if shift.containers.push(container)
            container.update(status: "added")
            shift.container_ids.each{ |eID| 
                c = Container.find eID
                containers.push({c:c, employees:c.employees})
            }
            render(json: {containers: containers})
        else
            render(json: { errors: shift.errors.messages},
                status: 422
            )
        end
    end
    def remove_containers
        shift = Shift.find params[:shift_id]
        container = Container.find params[:canId]
        containers = []
        if shift.containers.delete(container)
            container.update(status: "due")
            shift.container_ids.each{ |eID| 
                c = Container.find eID
                containers.push({c:c, employees:c.employees})
            }
            render(json: {containers: containers})
        else
            render(json: { errors: shift.errors.messages},
                status: 422
            )
        end
    end
    def finalize
        shift = Shift.find params[:shift_id]
        if shift.status != "finalized"
            if shift.update(status: "finalized", comments: params[:comments])
                shift.employee_ids.each{ |eID|
                    e = Employee.find(eID)
                    e.update(status: "signed_out")
                }
                shift.container_ids.each{|cID|
                    c = Container.find(cID)
                    if c.status === "added"
                        c.update(status: "due")
                    end
                }
                render(json: shift.id)
            else
                render( json: {status: 500})
            end
        else
            render(json: {status: 500, msg: "already finalized"})
        end
    end

    private

    def shift_regular_params
        params.require(:shift).permit(:date, :sub_time, :location)
    end
    def shift_container_ids
        params.require(:shift).permit(:container_ids)
    end
    def shift_employee_ids
        params.require(:shift).permit(:employee_ids)
    end
end
