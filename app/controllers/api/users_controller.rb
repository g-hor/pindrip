class Api::UsersController < ApplicationController
  # def show
  #   if current_user
  #     @user = current_user
  #     render 'api/users/show'
  #   end
  # end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render 'api/users/show'
    else
      render json: { errors: @user.errors.full_messages }, status: 422
    end
  end

  # def update

  # end

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
