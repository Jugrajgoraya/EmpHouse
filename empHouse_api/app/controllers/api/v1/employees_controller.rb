class Api::V1::EmployeesController < ApplicationController

    before_action :find_employee, only: [:show, :update]

    def current
        render json: current_supervisor
    end
    def index
        emps = Employee.all.where(is_supervisor: "false").order(avg_rating: :desc)
        employees = []
        emps.each{ |e| 
            containers = e.containers
            employees.push({e:e, containers: containers})
        }
        render(json: employees)
    end
    def signed_out
        employees = Employee.all.where(is_supervisor: "false",status: "signed_out").order(avg_rating: :desc)
        render(json: employees)
    end
    # -------------> can be part of shift show <------------------
    # def free_employees
    #     employees = Employee.all.where(is_free: true).order(avg_raitng: :desc)
    #     render(json: employees)        
    # end

    def create
        # employee_params = params.require(:employee).permit(:first_name, :last_name, :email, :password, :password_confirmation)
        employee = Employee.new(employee_params)
        if employee.save
            render json: { id: employee.id }
        else
            render(
                json: { errors: employee.errors.messages},
                status: 422 #Unprocessable Entity
            )
        end      
    end
    def show
        cans = @employee.containers
        render(json: {employee: @employee, containers: cans})
    end
    # def update
    #     if @employee.update(employee_params)
    #         render json: {id: @employee.id }
    #     else
    #         render(
    #             json: { errors: @employee.errors.messages },
    #             status: 422
    #         )
    #     end        
    # end
    def update_rating
        employee = Employee.find params[:employee_id]
        new_rating = params[:rating]
        previous_rating = employee.avg_rating
        avg_rating = (previous_rating + new_rating)/2
        if employee.update(avg_rating: avg_rating)
            render(json: {status: 200})
        end
    end

    # to change the status field to 'sign_in' or 'working' accordingly
    # def update_make_free
    #      if @employee.update(status: "free")
    #         render json: {id: @employee.id }
    #     else
    #         render(
    #             json: { errors: @employee.errors.messages },
    #             status: 422
    #         )
    #     end
    # end
#     def update_make_working
#         if @employee.update(status: "working")
#            render json: {id: @employee.id }
#        else
#            render(
#                json: { errors: @employee.errors.messages },
#                status: 422
#            )
#        end
#    end

    private

    def employee_params
        params.require(:employee).permit(:first_name, :last_name, :email, :password, :password_confirmation, :mhe_license)
    end
    def find_employee
        @employee = Employee.find(params[:id])
    end

end
