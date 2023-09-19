class SettingsController < ApplicationController
  before_action :set_setting, only: %i[show edit update destroy]

  layout 'admin'

  # GET /settings or /settings.json
  def index
    @settings = Setting.all
  end

  # GET /settings/1 or /settings/1.json
  def show; end

  # GET /settings/new
  def new
    @setting = Setting.new
  end

  # GET /settings/1/edit
  def edit; end

  # POST /settings or /settings.json
  def create
    return unless user_signed_in? && current_user.is_admin?

    @settings = Setting.all
    @setting = Setting.new(setting_params)

    respond_to do |format|
      if @settings.empty?
        if @setting.save
          format.html do
            flash[:success] = 'Setting created'
            redirect_to(root_path)
          end
          format.json { render :show, status: :created, location: @setting }
        else
          full_error = ''
          @setting.errors.each do |error|
            full_error += error.full_message.to_s
          end
          format.html do
            flash[:error] = "Validation error: #{full_error}"
            redirect_back(fallback_location: root_path)
          end
          format.json { render json: @setting.errors, status: :unprocessable_entity }
        end
      else
        format.html do
          flash[:error] = 'The platform only needs one setting'
          redirect_back(fallback_location: root_path)
        end
      end
    end
  end

  # PATCH/PUT /settings/1 or /settings/1.json
  def update
    return unless user_signed_in? && current_user.is_admin?

    respond_to do |format|
      if @setting.update(setting_params)
        format.html do
          flash[:success] = 'Setting updated'
          redirect_back(fallback_location: root_path)
        end
        format.json { render :show, status: :ok, location: @setting }
      else
        full_error = ''
        @setting.errors.each do |error|
          full_error += error.full_message.to_s
        end
        format.html do
          flash[:error] = "Validation error: #{full_error}"
          redirect_back(fallback_location: root_path)
        end
        format.json { render json: @setting.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /settings/1 or /settings/1.json
  def destroy
    return unless user_signed_in? && current_user.is_admin?

    @setting.destroy

    respond_to do |format|
      format.html { redirect_to settings_url, notice: 'Setting was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_setting
    @setting = Setting.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def setting_params
    params.require(:setting).permit(:artist_rate)
  end
end
