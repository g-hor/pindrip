class Api::BoardPinsController < ApplicationController

  def create
    new_pin_save = BoardPin.new(board_pin_params)
    @board = Board.find_by(id: board_pin_params[:board_id])
    @pin = Pin.find_by(id: board_pin_params[:pin_id])

    if @board && @pin && new_pin_save.save
      render 'api/boards/show'
    else
      render json: { errors: ["Something went wrong"] }, status: 422
    end
  end

  def destroy
    @pin_save = BoardPin.find_by(
      pin_id: board_pin_params[:pin_id],
      board_id: board_pin_params[:board_id]
    )
    @board = Board.find_by(id: board_pin_params[:board_id])
    
    if @pin_save.destroy
      render 'api/boards/show'
    else
      render json: { errors: ["Something went wrong"] }, status: 422
    end
  end

  private
  def board_pin_params
    params.require(:board_pin).permit(:pin_id, :board_id)
  end

end