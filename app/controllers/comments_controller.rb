class CommentsController < ApplicationController
  before_action :set_comment, only: %i[show edit update destroy]

  layout 'admin'

  # GET /comments or /comments.json
  def index
    @comments = Comment.all
  end

  # GET /comments/1 or /comments/1.json
  def show; end

  # GET /comments/new
  def new
    @comment = Comment.new
  end

  # GET /comments/1/edit
  def edit; end

  # POST /comments or /comments.json
  def create
    respond_to do |format|
      if user_signed_in?

        @comment = Comment.new(comment_params)
        @comment.user_id = current_user.id
        @comment.art_id = params[:art_id]
        @art = Art.all.find(params[:art_id])

        if @comment.save && user_signed_in?
          format.html do
            flash[:success] = 'Comment was successfully created.'
            redirect_to art_url(@art)
          end
          format.json { render :show, status: :created, location: @comment }
        else
          format.html { render :new, status: :unprocessable_entity }
          format.json { render json: @comment.errors, status: :unprocessable_entity }
        end
      else
        format.html do
          flash[:error] = 'User not logged in'
          redirect_back(fallback_location: root_path)
        end
      end
    end
  end

  # PATCH/PUT /comments/1 or /comments/1.json
  def update
    if user_signed_in? && current_user.id == @comment.user_id
      respond_to do |format|
        if @comment.update(comment_params)
          format.html { redirect_to comment_url(@comment), notice: 'Comment was successfully updated.' }
          format.json { render :show, status: :ok, location: @comment }
        else
          format.html { render :edit, status: :unprocessable_entity }
          format.json { render json: @comment.errors, status: :unprocessable_entity }
        end
      end
    else
      flash[:alert] = 'User not authorized'
    end
  end

  # DELETE /comments/1 or /comments/1.json
  def destroy
    respond_to do |format|
      if user_signed_in? && current_user.id == @comment.user_id
        @comment.destroy
        format.html do
          flash[:success] = 'Comment was successfully deleted.'
          redirect_back(fallback_location: root_path)
        end
        format.json { head :no_content }
      else
        format.html do
          flash[:error] = 'User not authorized'
          redirect_back(fallback_location: root_path)
        end
      end
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_comment
    @comment = Comment.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def comment_params
    params.require(:comment).permit(:content, :user_id, :art_id)
  end
end
