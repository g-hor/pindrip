class Api::PinsController < ApplicationController
  wrap_parameters include: Pin.attribute_names + ['photo']

  def index
    @pins = Pin.all
    render 'api/pins/index'
  end

  def show
    @pin = Pin.find_by(id: params[:id])

    if @pin
      render 'api/pins/show'
    else
      render json: { errors: ["Sorry, it looks like this pin doesn't exist yet."] }, status: 422
    end
  end

  def create
    @pin = Pin.new(pin_params)
    @pin.user_id = current_user.id

    if @pin.save
      render 'api/pins/show'
    else
      render json: { errors: @pin.errors.full_messages }, status: 422
    end
  end

  def update
    @pin = Pin.find_by(id: params[:id])

    if @pin.update(pin_params)
      render 'api/pins/show'
    else
      render json: { errors: @user.errors.full_messages }, status: 422
    end
  end

  def destroy
    @pin = Pin.find_by(id: params[:id])
    if @pin
      @pin.destroy!
    else
      render json: { errors: ['This pin does not exist!'] }, status: 422
    end
  end

  private

  def pin_params
    params.require(:pin).permit(:title, :description, :website, :alt_text, :photo)
  end

end