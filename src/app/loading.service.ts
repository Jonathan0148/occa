import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public m_Empleado: string;
  public m_Puesto: string;
  public m_Apellidos: string;
  public m_Nombres: string;
  public m_UbicacionID: string;
  public m_Ubicacion: string;
  public m_Cliente: string;
  public m_ClienteID: string;
  public m_Cargo: string;
  public m_CargoID: string;
  public m_Sigla: string;
  public m_Cliente_Com: string;
  public m_ModuloID: string;
  public m_NomPto: string;
  

  public m_IDModulo: string="TGSI_OCCA_APP";
  public m_UsuarioApp: string="OBOCCA";
  public m_PasswordApp: string="iy/18sMdQ6mX2LGeDGfayvx0iRj1KEC2NwvuUKRqvMc=";
  public m_CodigoWSApp: string ="TGSI_OCCA_APP";
  public m_IMEI: string="";
  public m_UrlWS: string="http://wsthmobileoccadev.azurewebsites.net/supervisor/WsSupervision.asmx";
  public m_CiudadOP: string;
  public m_TipoTAG: string;

  isLoading = false;

  constructor(public loadingController: LoadingController) { }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      //duration: 5000,
      message: 'Oberón Procesando...',
      translucent: true,
      spinner: 'dots'
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async presentTxt(stRMensaje: string) {
    this.isLoading = true;
    return await this.loadingController.create({
      //duration: 5000,
      message: stRMensaje,
      translucent: true,
      spinner: 'dots'
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }
  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }
}
