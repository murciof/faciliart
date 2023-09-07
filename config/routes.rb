Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }
  root 'arts#index'
  resources :comments, except: [:new]
  resources :arts do
    resources :comments, only: [:create]
    resources :orders, only: [:create]
  end
  resources :orders, only: [:show]
  resources :users, only: [:show]
  scope 'admin' do
    resources :users, except: [:show]
    resources :items, except: [:show]
    resources :item_sizes
    resources :orders, except: %i[new show]
  end

  get '/search', to: 'search#search'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
