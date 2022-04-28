class ApplicationController < ActionController::Base

    skip_before_action :verify_authenticity_token

    def authenticate_user!
       unless !current_user.present?
            render(json:{status: 401})
       end
    end

    def current_supervisor
        @current_supervisor ||= Employee.find_by_id session[:supervisor_id]
    end
    helper_method :current_user

end
