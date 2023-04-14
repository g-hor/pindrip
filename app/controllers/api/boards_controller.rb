class Api::BoardsController < ApplicationController
  wrap_parameters include: Board.attribute_names

  def index
    @boards = Board.where(user_id: params[:user_id])
    render 'api/boards/index'
  end

  def show
    @board = Board.find(params[:id])
    render "api/boards/show"
  end

  def create
    @board = Board.new(board_params)
    @board.user_id = current_user.id

    if @board.save
      render 'api/boards/show'
    else
      render json: { errors: ['Please enter a name'] }, status: 422
    end
  end

  def update
    
  end

  def destroy

  end

  private

  def board_params
    params.require(:board).permit(:name, :description)
  end
end