class Api::V1::ContainersController < ApplicationController

    before_action :find_container, only: [:show, :update]

    def index
        containers = Container.all.order(due_date: :asc)
        render(json: containers)
    end

    # -------------> can be part of shift show <------------------
    # def done_containers
    #     containers = Container.all.where(status: "done").order(due_date: :asc)
    #     render(json: containers)        
    # end
    # def working_containers
    #     containers = Container.all.where(status: "working").order(due_date: :asc)
    #     render(json: containers)        
    # end

    def create
        container = Container.new(container_params)
        
        if container.save
            render json: { id: container.id }
        else
            render(
                json: { errors: container.errors.messages},
                status: 422 #Unprocessable Entity
            )
        end      
    end

    def show
        render(json: @container)
    end

    def update
        if @container.update(container_params)
            render json: {id: @container.id }
        else
            render(
                json: { errors: @container.errors.messages },
                status: 422
            )
        end        
    end

    # to change the status field to 'working' or 'done' accordingly
    def update_status_working
        if @container.update(status: "working", started_at: Date.now())

            @container.employee_ids.each{ |eID| 
                Employee.find(eID).update(is_free: false)
            }
            shift = Shift.find params[:shift_id]
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
       else
           render(
               json: { errors: @container.errors.messages },
               status: 422
           )
       end
   end
    def update_status_done
         if @container.update(status: "done", end_at: Date.now())

            @container.employee_ids.each{ |eID| 
                Employee.find(eID).update(is_free: true)
            }
            shift = Shift.find params[:shift_id]
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
        else
            render(
                json: { errors: @container.errors.messages },
                status: 422
            )
        end
    end

#     -------------> rare chance when we have to change the container status to due <-------------
#     def update_make_due
#         if @container.update(is_free: false)
#            render json: {id: @container.id }
#        else
#            render(
#                json: { errors: @container.errors.messages },
#                status: 422
#            )
#        end
#    end

    private

    def container_params
        params.require(:container).permit(:number,:customer, :weight, :size, :boxes, :due_date)
    end
    def find_container
        @container = Container.find(params[:id])
    end
end
