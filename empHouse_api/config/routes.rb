Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :containers, only: [:index,:create, :show, :update, :destroy] do
        patch "update_status_working", to: 'containers#update_status_working'
        patch "update_status_done", to: 'containers#update_status_done'        
      end
      resources :shifts, only: [:index, :create, :show, :update] do
        get :current, on: :collection
        patch "finalize", to: 'shifts#finalize'       
      end
      resources :employees, only: [:index, :create, :show, :update] do
        patch "update_make_free", to: 'employees#update_make_free'
        patch "update_make_working", to: 'employees#update_make_working' 
      end
      resource :session, only: [:create, :destroy]
    end
  end 

  
end
