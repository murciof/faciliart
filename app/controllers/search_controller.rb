class SearchController < ApplicationController
  def search
    @users = User.all.where('NAME ILIKE ?', '%' + params[:search] + '%')
    @arts = Art.all.where('NAME ILIKE ?', '%' + params[:search] + '%')
    respond_to do |format|
      format.html { render :index }
    end
  end
end
