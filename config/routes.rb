Rails.application.routes.draw do
  devise_for :users
  resources :comments
  resources :users
  root "arts#index"
  resources :arts
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
