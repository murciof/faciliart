class ArtsController < ApplicationController
  before_action :set_art, only: %i[show edit update destroy]

  GENERATORS = [{ generator: 'line',
                  sliders: [{ element: 'points', min: '2', max: '100', value: '50' },
                            { element: 'stroke', min: '1', max: '10', value: '1',
                              step: '1' }] },
                { generator: 'curve',
                  sliders: [{ element: 'points', min: '4', max: '100', value: '50' },
                            { element: 'stroke', min: '1', max: '10', value: '1',
                              step: '1' }] },
                { generator: 'polygon',
                  sliders: [{ element: 'points', min: '3', max: '100', value: '50' },
                            { element: 'stroke', min: '1', max: '10', value: '1',
                              step: '1' }] }].freeze

  # GET /arts or /arts.json
  def index
    @arts = Art.all
  end

  # GET /arts/1 or /arts/1.json
  def show
    @comments = Comment.all.where(art_id: @art.id)
    @comment = Comment.new
    @orders = Order.all.where(art_id: @art.id)
    @order = Order.new
  end

  # GET /arts/new
  def new
    @art = Art.new
  end

  # GET /arts/1/edit
  def edit; end

  # POST /arts or /arts.json
  def create
    if user_signed_in?
      @art = Art.new(art_params)
      @art.user_id = current_user.id
      respond_to do |format|
        if @art.save
          format.html { redirect_to art_url(@art), notice: 'Art was successfully created.' }
          format.json { render :show, status: :created, location: @art }
        else
          format.html { render :new, status: :unprocessable_entity }
          format.json { render json: @art.errors, status: :unprocessable_entity }
        end
      end
    else
      flash[:alert] = 'User needs to be logged in'
    end
  end

  # PATCH/PUT /arts/1 or /arts/1.json
  def update
    if user_signed_in? && current_user.id == @art.user_id
      respond_to do |format|
        if @art.update(art_params)
          format.html { redirect_to art_url(@art), notice: 'Art was successfully updated.' }
          format.json { render :show, status: :ok, location: @art }
        else
          format.html { render :edit, status: :unprocessable_entity }
          format.json { render json: @art.errors, status: :unprocessable_entity }
        end
      end
    else
      flash[:alert] = 'User not authorized'
    end
  end

  # DELETE /arts/1 or /arts/1.json
  def destroy
    if user_signed_in? && current_user.id == @art.user_id
      @art.destroy
      respond_to do |format|
        format.html { redirect_to arts_url, notice: 'Art was successfully destroyed.' }
        format.json { head :no_content }
      end
    else
      flash[:alert] = 'User not authorized'
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_art
    @art = Art.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def art_params
    params.require(:art).permit(:name, :generator_type, :data)
  end
end
