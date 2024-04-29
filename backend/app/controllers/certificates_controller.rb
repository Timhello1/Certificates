class CertificatesController < ApplicationController

  before_action :set_certificate, only: [:show, :update, :destroy]

  def index
    @certificates = Certificate.paginate(page: params[:page], per_page: params[:per_page])
    render json: @certificates
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @certificate.destroy
  end

  # GET /users/1
  # GET /users/1.json
  def show
    render json: @certificate
  end

  # POST /users
  # POST /users.json
  def create
    @certificate = Certificate.new(certificate_params)

    if @certificate.save
      render :show, status: :created, location: @certificate
    else
      render json: @certificate.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    if @certificate.update(certificate_params)
      render :show, status: :ok, location: @certificate
    else
      render json: @certificate.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_certificate
      @certificate = Certificate.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def certificate_params
      params.require(:certificate).permit(:name, :description, :user_id)
    end
end


