class Api::UsersController < ApplicationController
  before_action :ensure_logged_in, only: [:show]
  before_action :ensure_logged_out, only: [:create, :update]

  def show
    if current_user
      @user = current_user
    end

  end

  def create

  end

  def update

  end

  private

  def user_params
    params.require(:user).permit(
      :email, 
      :username, 
      :password, 
      :first_name, 
      :last_name, 
      :about, 
      :pronouns,
      :website
      )
  end

end
