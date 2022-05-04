Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :containers, only: [:index,:create, :show, :destroy] do
        get "due", on: :collection
        get "done", on: :collection 
        patch "add_employees", to: 'containers#add_employees'
        patch "start_container", to: 'containers#start_container'
        patch "finish_container", to: 'containers#finish_container'        
      end
      resources :shifts, only: [:index, :create, :show] do
        get :current, on: :collection
        get "employees", to: "shifts#employees", as: "employees"
        patch "add_containers", to: 'shifts#add_containers', as: "add_containers"
        patch "add_employees", to: 'shifts#add_employees', as: "add_employees"
        patch "remove_containers", to: 'shifts#remove_containers', as: "remove_containers"
        patch "remove_employees", to: 'shifts#remove_employees', as: "remove_employees"
        patch "finalize", to: 'shifts#finalize'
      end
      resources :employees, only: [:index, :create, :show] do
        get :current, on: :collection
        get :signed_out, on: :collection
        patch "update_rating", to: 'employees#update_rating'
        patch "update_make_free", to: 'employees#update_make_free'
        patch "update_make_working", to: 'employees#update_make_working' 
      end
      resource :session, only: [:create, :destroy]
    end
  end 

  
end
