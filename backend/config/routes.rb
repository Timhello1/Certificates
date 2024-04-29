Rails.application.routes.draw do

  resources :users do
    get 'allusers', on: :collection
  end

  resources :certificates
  devise_for :users, defaults: { format: :json }
  devise_for :certificates, defaults: { format: :json }
  
end
