class Api::PinsController < ApplicationController
  wrap_parameters include: Board.attribute_names
  before_action :ensure_creator

  def index
    @boards = Board.where(user_id: params[:user_id])
    render "api/boards/index"
  end

  def show
    @board = Board.find(params[:id])
    render "api/boards/show"
  end

  def create
    @board = Board.new(board_params)

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

  def ensure_creator
    current_user.id == @board.user_id
  end
end