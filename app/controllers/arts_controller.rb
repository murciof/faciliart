class ArtsController < ApplicationController
  before_action :set_art, only: %i[show edit update destroy]

  layout 'home', only: [:index]

  GENERATORS = [{ generator: 'line',
                  sliders: [{ element: 'iterations', min: '2', max: '100', value: '50' }] },
                { generator: 'curve',
                  sliders: [{ element: 'iterations', min: '4', max: '100', value: '50' }] },
                { generator: 'polygon',
                  sliders: [{ element: 'iterations', min: '3', max: '100', value: '50' }] },
                { generator: 'circles',
                  sliders: [{ element: 'iterations', min: '1', max: '100', value: '50' },
                            { element: 'diameter', min: '1', max: '50', value: '10' }] }].freeze

  # GET /arts or /arts.json
  def index
    @arts = Art.all.order(created_at: :desc)
    @arts_kaminari = Kaminari.paginate_array(@arts).page(params[:page]).per(100)
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
    return if user_signed_in?

    flash[:notice] = 'User needs to be logged in to save the art'
  end

  # GET /arts/1/edit
  def edit; end

  # POST /arts or /arts.json
  def create
    respond_to do |format|
      if user_signed_in?
        @art = Art.new(art_params)
        @art.user_id = current_user.id
        if @art.save
          format.html do
            flash[:success] = 'Art was successfully created.'
            redirect_to art_url(@art)
          end
          format.json { render :show, status: :created, location: @art }
        else
          full_error = ''
          @art.errors.each do |error|
            full_error += error.full_message.to_s
          end
          format.html do
            flash[:error] = "Validation error: #{full_error}"
            redirect_back(fallback_location: root_path)
          end
          format.json { render json: @art.errors, status: :unprocessable_entity }
        end
      else
        format.html do
          flash[:error] = 'User not logged in'
          redirect_back(fallback_location: root_path)
        end
      end
    end
  end

  # PATCH/PUT /arts/1 or /arts/1.json
  def update
    return unless user_signed_in? && (current_user.id == @art.user_id || current_user.is_admin)

    respond_to do |format|
      if @art.update(art_params)
        format.html { redirect_to art_url(@art), notice: 'Art was successfully updated.' }
        format.json { render :show, status: :ok, location: @art }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @art.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /arts/1 or /arts/1.json
  def destroy
    return unless user_signed_in? && (current_user.id == @art.user_id || current_user.is_admin)

    @art.destroy
    respond_to do |format|
      format.html { redirect_to arts_url, notice: 'Art was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_art
    @art = Art.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def art_params
    params.require(:art).permit(:name, :data)
  end
end
