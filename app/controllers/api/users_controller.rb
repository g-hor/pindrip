class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password'] + ['avatar']

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
    # FOR UPDATING PASSWORD
    if user_params[:old_pw] && user_params[:new_pw]
      @user = User.find_by_credentials(user_params[:email], user_params[:old_pw])
      
      if @user.update(password: user_params[:new_pw])
        render 'api/sessions/show'
      else
        render json: { errors: @user.errors.full_messages }, status: 422
      end
    else
      @user = User.find_by(username: params[:username])
      
      if @user.update(user_params)
        render 'api/sessions/show'
      else
        render json: { errors: @user.errors.full_messages }, status: 422
      end
    end
  end

  def destroy
    @user = User.find_by_credentials(user_params[:email], user_params[:new_pw])
    if @user
      @user.destroy!
    else
      render json: { errors: ['Your password was incorrect'] }, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :id,
      :email, 
      :username, 
      :password, 
      :old_pw,
      :new_pw,
      :first_name, 
      :last_name, 
      :about, 
      :pronouns,
      :website,
      :country,
      :gender,
      :avatar
      )
  end

end
