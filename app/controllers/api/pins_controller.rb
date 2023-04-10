class Api::PinsController < ApplicationController
  wrap_parameters include: Pin.attribute_names + ['photo']

  def show
    @pin = Pin.find_by(id: params[:id])

    if @pin
      render 'api/pins/show'
    else
      render json: { errors: ["Sorry, it looks like this pin doesn't exist yet."]}
    end
  end

  def create
    @pin = Pin.new(pin_params)
    @pin.user_id = params[:user_id]

    if @pin.save
      render 'api/pins/show'
    else
      render json: { errors: @pin.errors.full_messages }, status: 422
    end
  end

  def update

  end

  def destroy

  end

  private

  def pin_params
    params.require(:pin).permit(:title, :description, :website, :photo)
  end

end