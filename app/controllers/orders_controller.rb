class OrdersController < ApplicationController
  before_action :set_order, only: %i[show edit update destroy]

  layout 'admin'

  # GET /orders or /orders.json
  def index
    @orders = Order.all
  end

  # GET /orders/1 or /orders/1.json
  def show; end

  # GET /orders/new
  def new
    @order = Order.new
  end

  # GET /orders/1/edit
  def edit; end

  # POST /orders or /orders.json
  def create
    respond_to do |format|
      if user_signed_in?
        @order = Order.new(order_params)
        @order.art_id = params[:art_id]
        @order.user_id = (current_user.id if user_signed_in?)
        if ItemSize.where(id: @order.item_size_id, item_id: @order.item_id).exists?
          if @order.save
            format.html do
              flash[:success] = 'Order was successfully created.'
              redirect_back(fallback_location: root_path)
            end
            format.json { render :show, status: :created, location: @order }
          else
            format.html { render :new, status: :unprocessable_entity }
            format.json { render json: @order.errors, status: :unprocessable_entity }
          end
        else
          format.html do
            flash[:error] = 'An order must have a size'
            redirect_back(fallback_location: root_path)
          end
        end
      else
        format.html do
          flash[:error] = 'User not logged in'
          redirect_back(fallback_location: root_path)
        end
      end
    end
  end

  # PATCH/PUT /orders/1 or /orders/1.json
  def update
    respond_to do |format|
      if @order.update(order_params)
        format.html { redirect_to order_url(@order), notice: 'Order was successfully updated.' }
        format.json { render :show, status: :ok, location: @order }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @order.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /orders/1 or /orders/1.json
  def destroy
    return unless user_signed_in? && (current_user.id == @order.user_id || current_user.is_admin)

    @order.destroy
    respond_to do |format|
      format.html { redirect_to orders_url, notice: 'Order was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_order
    @order = Order.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def order_params
    params.require(:order).permit(:art_id, :user_id, :item_id, :item_size_id)
  end
end
