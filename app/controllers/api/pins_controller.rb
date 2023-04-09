class Api::PinsController < ApplicationController
  wrap_parameters include: Pin.attribute_names + ['photo']

  
end