Rails.application.routes.draw do
  resources :orders
  resources :item_sizes
  resources :items
  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }
  resources :comments
  resources :users
  root 'arts#index'
  resources :arts do
    resources :comments, only: [:create]
    resources :orders, only: [:create]
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
