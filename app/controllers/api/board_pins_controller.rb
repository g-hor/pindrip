class Api::BoardPinsController < ApplicationController

  def create
    new_pin_save = BoardPin.new(board_pin_params)
    @board = Board.find_by(id: board_pin_params[:board_id])
    @pin = Pin.find_by(id: board_pin_params[:pin_id])

    # rework this to add all saved pins to "All Pins"
    # all_pins = Board.find_by(name: "All Pins", user_id: @board.user_id)
    # BoardPin.create!(board_id: all_pins.id, pin_id: @pin.id)

    if @board && @pin && new_pin_save.save
      render 'api/boards/show'
    else
      render json: { errors: ["Something went wrong"] }, status: 422
    end
  end

  def destroy
    @pin_save = BoardPin.find_by(id: params[:id])
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