Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post 'api/test', to: 'application#test'
  namespace :api, defaults: { format: :json } do

    resources :users, only: [:create, :index, :update, :destroy] do
      resources :boards, only: [:index]
    end

    # custom route to find user by username instead of id
    get 'users/:username', to: 'users#show', as: 'profile'

    resource :session, only: [:show, :create, :destroy]
    resources :pins, only: [:show, :create, :index, :destroy, :update]
    resources :board_pins, only: [:create, :destroy]
    resources :boards, only: [:show, :create, :update, :destroy]
    resources :follows, only: [:create, :destroy]
  end

  # this is the catch all route:
  get '*path', to: "static_pages#frontend_index"
end
