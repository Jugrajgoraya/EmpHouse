class Api::V1::EmployeesController < ApplicationController

    before_action :find_employee, only: [:show, :update]

    def index
        employees = Employee.all.order(avg_rating: :desc)
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
            if employee.is_supervisor
                session[:supervisor_id] = employee.id 
            end
            render json: { id: employee.id }
        else
            render(
                json: { errors: employee.errors.messages},
                status: 422 #Unprocessable Entity
            )
        end      
    end
    def show
        
        render(json: @employee)
    end
    def update
        if @employee.update(employee_params)
            render json: {id: @employee.id }
        else
            render(
                json: { errors: @employee.errors.messages },
                status: 422
            )
        end        
    end
    def update_rating
        employee = Employee.find params[:id]
        new_rating = params[:rating]
        previous_rating = employee.avg_rating
        avg_rating = (previous_rating + new_rating)/2
        employee.update(avg_rating: avg_rating)
    end

    # to change the is_free field to 'true' or 'false' accordingly
    def update_make_free
         if @employee.update(is_free: true)
            render json: {id: @employee.id }
        else
            render(
                json: { errors: @employee.errors.messages },
                status: 422
            )
        end
    end
    def update_make_working
        if @employee.update(is_free: false)
           render json: {id: @employee.id }
       else
           render(
               json: { errors: @employee.errors.messages },
               status: 422
           )
       end
   end

    private

    def employee_params
        params.require(:employee).permit(:first_name, :last_name, :email, :password, :password_confirmation, :mhe_license)
    end
    def find_employee
        @employee = Employee.find(params[:id])
    end

end
