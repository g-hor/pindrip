class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  def index
    @users = User.all
    render 'api/users/index'
  end

  def show
    @user = User.find_by(username: params[:username].downcase)

    if @user
      render 'api/users/show'
    else
      render json: {errors: ["I'm a teapot xd"]}
    end
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render 'api/sessions/show'
    else
      render json: { errors: @user.errors.full_messages }, status: 422
    end
  end

  def update
    @user = User.find_by(username: params[:username])
    
    if @user.update(user_params)
      render 'api/sessions/show'
    else
      render json: { errors: @user.errors.full_messages }, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :id,
      :email, 
      :username, 
      :password, 
      :first_name, 
      :last_name, 
      :about, 
      :pronouns,
      :website,
      :country,
      :gender
      )
  end

end
