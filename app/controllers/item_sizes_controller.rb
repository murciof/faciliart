class ItemSizesController < ApplicationController
  before_action :set_item_size, only: %i[show edit update destroy]

  layout 'admin'

  # GET /item_sizes or /item_sizes.json
  def index
    @item_sizes = ItemSize.all
  end

  # GET /item_sizes/1 or /item_sizes/1.json
  def show; end

  # GET /item_sizes/new
  def new
    @item_size = ItemSize.new
  end

  # GET /item_sizes/1/edit
  def edit; end

  # POST /item_sizes or /item_sizes.json
  def create
    return unless user_signed_in? && current_user.is_admin

    @item_size = ItemSize.new(item_size_params)

    respond_to do |format|
      if @item_size.save
        format.html { redirect_to item_size_url(@item_size), notice: 'Item size was successfully created.' }
        format.json { render :show, status: :created, location: @item_size }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @item_size.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /item_sizes/1 or /item_sizes/1.json
  def update
    return unless user_signed_in? && current_user.is_admin

    respond_to do |format|
      if @item_size.update(item_size_params)
        format.html { redirect_to item_size_url(@item_size), notice: 'Item size was successfully updated.' }
        format.json { render :show, status: :ok, location: @item_size }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @item_size.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /item_sizes/1 or /item_sizes/1.json
  def destroy
    return unless user_signed_in? && current_user.is_admin

    @item_size.destroy

    respond_to do |format|
      format.html { redirect_to item_sizes_url, notice: 'Item size was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_item_size
    @item_size = ItemSize.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def item_size_params
    params.require(:item_size).permit(:item_id, :size, :price)
  end
end
