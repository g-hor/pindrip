class Api::SessionsController < ApplicationController
  # before_action :ensure_logged_in, only: :show
  # before_action :ensure_logged_out, only: [:create, :destroy]

  def show
    if logged_in?
      @user = current_user
      render 'api/sessions/show'
    else
      render json: { user: nil }
    end
  end

  def create
    @user = User.find_by_credentials(params[:email], params[:password])

    if @user
      login!(@user)
      render 'api/sessions/show'
    else
      render json: { errors: ["Hmm... We weren't able to find a match."] }, status: :unauthorized
    end
  end

  def destroy
    logout! if current_user
    render json: { message: 'You have successfully logged out!' }
  end
end
