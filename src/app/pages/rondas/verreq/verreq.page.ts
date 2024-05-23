import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams, NavController } from '@ionic/angular';
import { LoadingService } from '../../../loading.service';
import {Http, Headers} from '@angular/http';
import { AccionPage } from './../../rondas/accion/accion.page';
import { ReqdetallePage } from './../../rondas/reqdetalle/reqdetalle.page';
import { Platform, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-Verreq',
  templateUrl: './Verreq.page.html',
  styleUrls: ['./Verreq.page.scss'],
})
export class VerreqPage implements OnInit {
  public apiUrl: string;
  dataAux: any;
  stRPto: string;

  stRATM: string;
  dataNov: any;
  stRNombre: string;
  stRNOAccion: string;
  accionvisible: boolean;

  constructor(private nav: NavController,
    private modalCtrl: ModalController,
    public loading: LoadingService,
    public http: Http,
    private toastCtrl: ToastController,
    public alertController: AlertController,
    public navParams: NavParams) {
      this.stRPto = navParams.get("stRPto");
      this.stRATM = navParams.get("stRATM");
      this.stRNombre = navParams.get("stRNombre");

      this.stRNOAccion= navParams.get("stRNOAccion");
      if(this.stRNOAccion=="1")
      {
        this.accionvisible=false;
      }
      else{
        this.accionvisible=true;
      }
    }

  ngOnInit() {
    this.getRequerimientos();
  }

  async presentToast(stRMensaje) {
       const toast = await this.toastCtrl.create({
         message: stRMensaje,
         duration: 4000
       });
       toast.present();
     }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  private getRequerimientos()
  {
      this.loading.present();
    this.SrBuscaRequerimientos().then(data => {

              if(data["Table"] != null) {
                this.dataAux=data["Table"];

              }
              this.loading.dismiss();
        });

  }
  private SrBuscaRequerimientos() {
        this.apiUrl = this.loading.m_UrlWS + '/GetVerReq';
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let params = 'stRPunto=' + this.stRPto +'&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
        console.log(params);

        return new Promise(resolve => {

            this.http.post(this.apiUrl,params,{headers: headers}).subscribe(data => {
                if(data.json()!=null){
                  resolve(data.json());

                }
                else
                    resolve(false);

            });
            });

  }


  async presentreqdetalle(stRIDMinuta: string) {
    const modal = await this.modalCtrl.create({
      component: ReqdetallePage,
      componentProps: { stRPto: this.stRPto, stRIDMinuta: stRIDMinuta}
    });
    return await modal.present();
  }


  async presentReqAccion(stRIDMinuta) {
    const modal = await this.modalCtrl.create({
      component: AccionPage,
      componentProps: { stRPto: this.stRPto, stRIDMinuta: stRIDMinuta, stRATM: this.stRATM, stRNombre: this.stRNombre  }
    });
    modal.onDidDismiss()
     .then((data) => {
       //console.log("foto");

       if(data.data=="1")
       {

        this.getRequerimientos();
       }

       //this.getEmpleados();
       //this.getPuntosRondaAsignados('1','1');
       //const user = data['data']; // Here's your selected user!
   });
    return await modal.present();
  }



  private getRevisaTAGAccion(stRIDMinuta)
  {
    /*
      this.loading.present();
      this.SrRevisaTAG().then(data => {

      if(data["Table"] != null) {
        this.dataNov=data["Table"];

        console.log(data["Table"][0].RESP);
        if(data["Table"][0].RESP=='1')
        {
      */
          this.presentReqAccion(stRIDMinuta);
      /*
        }
        else{
          this.presentToast('NO se ha Registrado TAG. Por favor registrelo');
        }

      }
      this.loading.dismiss();
      });
      */

  }
  private SrRevisaTAG() {
        this.apiUrl =this.loading.m_UrlWS + '/GetRegistraTAG';
        console.log(this.apiUrl);
        //this.apiUrl = 'http://192.168.0.5:14757/WSIdentificacion.asmx/Identificacion?stRFoto='+stRFotoAux;
        //let creds = JSON.stringify({stRFoto: this.stRFoto});
        //postData.append('stRFoto' , stRFotoAux);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let params = 'stRPTO=' + this.stRPto +'&stREmpleado=' + this.loading.m_Empleado +'&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
        //let params='';
        return new Promise(resolve => {
            //this.http.post('http://192.168.3.8:1368/icwebmobile/consulta_puestos.php', creds, {headers: headers})
            this.http.post(this.apiUrl,params,{headers: headers}).subscribe(data => {
                if(data.json()!=null){
                  //console.log(data.json());

                   resolve(data.json());



                }
                else
                    resolve(false);

            });
            });

  }

  async presentAlertConfirm() {
     const alert = await this.alertController.create({
       header: 'Confirmar',
       message: '¿Está Seguro(a) de Cerrar la Visita en el ATM: ' + this.stRATM + ' - ' + this.stRNombre +'?',
       buttons: [
         {
           text: 'Cancelar',
           role: 'cancel',
           cssClass: 'secondary',
           handler: (blah) => {
             console.log('Confirm Cancel: blah');
           }
         }, {
           text: 'Guardar',
           handler: () => {
             this.SetCierraVisita();
           }
         }
       ]
     });
     await alert.present();
  }



  private SetCierraVisita()
  {
      this.loading.present();
      this.SrCierraVisita().then(data => {

      if(data["Table"] != null) {
        this.dataNov=data["Table"];

        console.log(data["Table"][0].RESP);
        if(data["Table"][0].RESP=='OK')
        {
          this.presentToast('Visita Cerrada Satisfactoriamente');
          this.closeModal();
        }
        else{
          this.presentToast('Error al Guardar Registro');
        }
      }
      this.loading.dismiss();
      });

  }
  private SrCierraVisita() {
        this.apiUrl = this.loading.m_UrlWS +'/setCierreVisita';
        console.log(this.apiUrl);
        //this.apiUrl = 'http://192.168.0.5:14757/WSIdentificacion.asmx/Identificacion?stRFoto='+stRFotoAux;
        //let creds = JSON.stringify({stRFoto: this.stRFoto});
        //postData.append('stRFoto' , stRFotoAux);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let params = 'stRPunto=' + this.stRPto +'&stREmpleado=' + this.loading.m_Empleado +'&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
        //let params='';
        return new Promise(resolve => {
            //this.http.post('http://192.168.3.8:1368/icwebmobile/consulta_puestos.php', creds, {headers: headers})
            this.http.post(this.apiUrl,params,{headers: headers}).subscribe(data => {
                if(data.json()!=null){
                  //console.log(data.json());

                   resolve(data.json());



                }
                else
                    resolve(false);

            });
            });

  }



}
