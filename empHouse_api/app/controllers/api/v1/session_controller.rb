class Api::V1::SessionController < ApplicationController

    def create
        employee = Employee.find_by(email: params[:email])

        if employee&.authenticate(params[:password])
            if employee.is_supervisor
                session[:supervisor_id] = employee.id
                render json: { id: employee.id, employee_name: employee.first_name }
            else
                render(
                    json: { status: 404 },
                    status: 404
                )
            end
        else
            render(
                json: { status: 404 },
                status: 404
            )
        end
    end
    def destroy
        session[:supervisor_id] = nil
        render json: {status: 200}
    end

end
