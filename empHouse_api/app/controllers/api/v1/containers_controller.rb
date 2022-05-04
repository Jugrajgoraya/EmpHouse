class Api::V1::ContainersController < ApplicationController

    before_action :find_container, only: [:show, :update]

    def index
        containers = Container.all.order(due_date: :asc)
        render(json: containers)
    end
    def due
        containers = Container.all.where(status: "due").order(due_date: :asc)
        render(json: containers)
    end
    def done
        containers = Container.all.where(status: "done").order(due_date: :asc)
        render(json: containers)
    end
    # -------------> can be part of shift show <------------------
    # def added_containers
    #     containers = Container.all.where(status: "added").order(due_date: :asc)
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

    def add_employees
        container = Container.find params[:container_id]
        employee = Employee.find params[:empId]
        workingEmployees = []
        if container.employees.push(employee)
            employee.update(status: "added")
            addedEmployees = Employee.all.where(status:"added")
            render(json: {addedEmployees: addedEmployees})
        else
            render(json: { errors: container.errors.messages},
                status: 422
            )
        end     
    end
    # def update
    #     if @container.update(container_params)
    #         render json: {id: @container.id }
    #     else
    #         render(
    #             json: { errors: @container.errors.messages },
    #             status: 422
    #         )
    #     end        
    # end

    # to change the status field to 'working' or 'done' accordingly
    def start_container
        container = Container.find params[:container_id]
        if container.employees.count > 0
            if container.update(status: "working", started_at: Time.now.strftime("%I:%M%p"))
    
                container.employee_ids.each{ |eID| 
                    Employee.find(eID).update(status: "working")
                }
                render( json: container)
           else
               render(
                   json: { errors: container.errors.messages },
                   status: 422
               )
           end
        else
            render(json: {status: 500,msg: "no employee assigned to container" })
        end
   end
    def finish_container
        container = Container.find params[:container_id]
        if container.status === "working" && container.started_at != nil
            if container.update(status: "done", end_at: Time.now.strftime("%I:%M%p"))
                container.employee_ids.each{ |eID| 
                    Employee.find(eID).update(status: "signed_in")
                }
                render( json: container)
            else
                render(
                    json: { errors: container.errors.messages },
                    status: 422
                )
            end
        else
            render(json: {status: 500,msg: "container is not started" })
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
