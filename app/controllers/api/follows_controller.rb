class Api::FollowsController < ApplicationController

  def create
    @follow = Follow.new(follow_params)

    if @follow.save
      @user = current_user
      render 'api/users/show'
    end
  end

  def destroy
    @follow = Follow.find_by(
      follower_id: follow_params[:follower_id],
      following_id: follow_params[:following_id]
      )

    if @follow
      @follow.destroy!
    else
      render json: { errors: ['This follow does not exist'] }, status: 422
    end
  end


  private

  def follow_params 
    params.require(:follow).permit(:follower_id, :following_id)
  end

end
