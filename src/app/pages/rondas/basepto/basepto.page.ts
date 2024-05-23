import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams, NavController } from '@ionic/angular';
import { LoadingService } from './../../../loading.service';
import {Http, Headers} from '@angular/http';
//import { PreguntaPage } from './../../modal/pregunta/pregunta.page';
//import { BitacoraPage } from './../../modal/bitacora/bitacora.page';
import { NoaccesoPage } from './../../rondas/noacceso/noacceso.page';
//import { SinnovedadPage } from './../../modal/sinnovedad/sinnovedad.page';
import { Platform, AlertController, ToastController } from '@ionic/angular';
import { VerreqPage } from './../../rondas/verreq/verreq.page';
import { VisitagPage } from './../../rondas/visitag/visitag.page';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { MdetallePage } from './../../minutas/mdetalle/mdetalle.page';
//import { VisitagPage } from './../../modal/visitag/visitag.page';


@Component({
  selector: 'app-basepto',
  templateUrl: './basepto.page.html',
  styleUrls: ['./basepto.page.scss'],
})
export class BaseptoPage implements OnInit {
  public apiUrl: string;
  public stRPto: string;
  public stRNombre: string;
  public stRTAGID:string;
  public stRATM: string;
  private tagId: string;
  private tagMsg: string;
  myListener: any;
  dataNov: any;
  dataAux: any;
  constructor(private nav: NavController,
    private modalCtrl: ModalController,
    public loading: LoadingService,
    public http: Http,
    private nfc: NFC,
    private ndef: Ndef,
    private platform: Platform,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    public alertController: AlertController,
    ) {
      this.stRPto = navParams.get("stRPto");
      this.stRNombre = navParams.get("stRNombre");
      this.stRATM = navParams.get("stRATM");
      this.platform.ready().then(() => {
        //this.presentToast('Ingresa');

         //this.addListenNFC();

      });

    }

    async PresentDetalle() {
      //console.log(stREmpleado);
      const modal = await this.modalCtrl.create({
      component: MdetallePage,
      componentProps: { stRPto: this.stRPto, stRATM: this.stRATM, stRNombre: this.stRNombre}
      });
      modal.onDidDismiss()
      .then((data) => {
        //this.getEmpleados();

    });
     return await modal.present();
    }


    addListenNFC() {
      console.log('entra a addListenNFC');

      this.myListener = this.nfc.addNdefListener(() => {
        this.presentToast('NFC Detectado Satisfactoriamente');
        //console.log('successfully attached ndef listener');
      }, (err) => {
        this.presentToast('error al Detectar el NFC del Dispositivo');
        //console.log('error attaching ndef listener', err);



      }).subscribe((event) => {
        //let payload = event.tag.ndefMessage[0].payload;
        //let tagContent = this.nfc.bytesToString(payload).substring(3);
        //this.presentToast('Ingresa evento: ' + tagContent);
        //console.log('received ndef message. the tag contains: ', event.tag);
        //console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));

        this.tagId=this.nfc.bytesToHexString(event.tag.id);
        //this.presentToast('ID' + this.tagId);
        if(this.tagId!=null)
        {
          //this.presentpregunta();
          this.SetValidaTAG();


        }
        //this.tagMsg="Porteria";
        //let message = this.ndef.textRecord('Almacen');
        /*

        this.nfc.write([message])
                .then(() => {
                  this.presentToast('Write');
                  //console.log("written");
                })
                .catch(err => {
                  this.presentToast('error Escritura');
                });
                */

      });


    }


    private SetValidaTAG()
      {
        this.loading.present();
        this.SrValidaTAGID().then(data => {
        if(data["Table"] != null && data["Table"] != "") {
          this.dataAux=data["Table"];
          this.SetRegistraTAG();

        }
        else{
          this.presentToast("Error: el TAG no Corresponde al ATM");
        }
        this.loading.dismiss();
      });

    }


    private SrValidaTAGID() {
      this.apiUrl = 'http://wsoberon.azurewebsites.net/WSIdentificacion.asmx/getValidaTAGID';
      //console.log(this.apiUrl);
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let params = 'stRTAGID=' + this.tagId +'&stRSigla=' + this.loading.m_Sigla + '&stRPunto=' + this.stRPto;
      //let params='';
      return new Promise(resolve => {
        //this.http.post('http://192.168.3.8:1368/icwebmobile/consulta_puestos.php', creds, {headers: headers})
        this.http.post(this.apiUrl,params,{headers: headers}).subscribe(data => {
        if(data.json()!=null){
          resolve(data.json());
        }
        else
          resolve(false);
        });
      });
    }



    private SetRegistraTAG()
    {

        this.SrIngresaRegistraTAG().then(data => {

        if(data["Table"] != null) {
          this.dataNov=data["Table"];

          console.log(data["Table"][0].RESP);
          if(data["Table"][0].RESP=='OK')
          {
            this.presentToast("El TAG se Registro Correctamente en el ATM. Puede iniciar Operación");
            //this.closeModal();
          }
          else{
            this.presentToast('Error al Registrar TAG');
          }
        }

        });

    }
    private SrIngresaRegistraTAG() {
          this.apiUrl = 'http://wsoberon.azurewebsites.net/WSIdentificacion.asmx/setRegistraTAG';
          console.log(this.apiUrl);
          //this.apiUrl = 'http://192.168.0.5:14757/WSIdentificacion.asmx/Identificacion?stRFoto='+stRFotoAux;
          //let creds = JSON.stringify({stRFoto: this.stRFoto});
          //postData.append('stRFoto' , stRFotoAux);
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');

          let params = 'stRPunto=' + this.stRPto +'&stREmpleado=' + this.loading.m_Empleado + '&stRTAG=' + this.tagId;
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

    async presentToast(stRMensaje) {
         const toast = await this.toastCtrl.create({
           message: stRMensaje,
           duration: 4000
         });
         toast.present();
       }


/*
    async presentbitacora() {
      const modal = await this.modalCtrl.create({
        component: BitacoraPage,
        componentProps: { stRPto: this.stRPto, stRATM: this.stRATM, stRNombre: this.stRNombre}
      });
      return await modal.present();
    }
*/
    async presentvisitatag() {
      const modal = await this.modalCtrl.create({
        component: VisitagPage,
        componentProps: { stRPto: this.stRPto}
      });
      modal.onDidDismiss()
     .then((data) => {
       //this.getEmpleados();
       //this.addListenNFC();
   });
   //this.myListener.unsubscribe();
    return await modal.present();
  }

    async presentnoacceso() {
      const modal = await this.modalCtrl.create({
        component: NoaccesoPage,
        componentProps: { stRPto: this.stRPto, stRATM: this.stRATM, stRNombre: this.stRNombre}
      });
      return await modal.present();
    }

    async presentverreq() {
      const modal = await this.modalCtrl.create({
        component: VerreqPage,
        componentProps: { stRPto: this.stRPto, stRATM: this.stRATM, stRNombre: this.stRNombre}
      });
      return await modal.present();
    }
  /*
    async presentSinnovedad() {
      const modal = await this.modalCtrl.create({
        component: SinnovedadPage,
        componentProps: { stRPto: this.stRPto, stRATM: this.stRATM, stRNombre: this.stRNombre}
      });
      return await modal.present();
    }


    async presentPregunta(stRPtoAux) {
      //console.log(stRPtoAux);
      const modal = await this.modalCtrl.create({
        component: PreguntaPage,
        componentProps: { stRPtoAux: stRPtoAux, stRPtoNom: this.stRNombre,  stRTAGID: this.stRTAGID }
      });
      modal.onDidDismiss()
       .then((data) => {

     });

      return await modal.present();
    }
    */

  closeModal() {
      //this.myListener.unsubscribe();
      this.modalCtrl.dismiss();
    }

  ngOnInit() {
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
        this.apiUrl = 'http://wsoberon.azurewebsites.net/WSIdentificacion.asmx/setCierreVisita';
        console.log(this.apiUrl);
        //this.apiUrl = 'http://192.168.0.5:14757/WSIdentificacion.asmx/Identificacion?stRFoto='+stRFotoAux;
        //let creds = JSON.stringify({stRFoto: this.stRFoto});
        //postData.append('stRFoto' , stRFotoAux);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let params = 'stRPunto=' + this.stRPto +'&stREmpleado=' + this.loading.m_Empleado;
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



  private getRevisaRequerimientos()
  {
      this.loading.present();
      this.SrRevisaRequerimientos().then(data => {

      if(data["Table"] != null) {
        this.dataNov=data["Table"];

        console.log(data["Table"][0].RESP);
        if(data["Table"][0].RESP=='0')
        {

          //this.presentSinnovedad();
        }
        else{
          this.presentToast('NO se puede reportar ATM SIN Novedad. Existen Requerimientos Abiertos');
        }
      }
      this.loading.dismiss();
      });

  }
  private SrRevisaRequerimientos() {
        this.apiUrl = 'http://wsoberon.azurewebsites.net/WSIdentificacion.asmx/getExistReq';
        console.log(this.apiUrl);
        //this.apiUrl = 'http://192.168.0.5:14757/WSIdentificacion.asmx/Identificacion?stRFoto='+stRFotoAux;
        //let creds = JSON.stringify({stRFoto: this.stRFoto});
        //postData.append('stRFoto' , stRFotoAux);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let params = 'stRPTO=' + this.stRPto ;
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


  private getRevisaATMSINNOVEDAD()
  {
      this.loading.present();
      this.SrRevisaTAG().then(data => {

      if(data["Table"] != null) {
        this.dataNov=data["Table"];

        console.log(data["Table"][0].RESP);
        if(data["Table"][0].RESP=='1')
        {
          //this.presentToast('Visita Cerrada Satisfactoriamente');
          //this.closeModal();
          this.getRevisaRequerimientos();
        }
        else{
          this.presentToast('NO se ha Registrado TAG. Por favor registrelo');
        }
      }
        this.loading.dismiss();
      });


  }

  private getRevisaTAGMinuta()
  {
      this.loading.present();
      this.SrRevisaTAG().then(data => {

      if(data["Table"] != null) {
        this.dataNov=data["Table"];

        console.log(data["Table"][0].RESP);
        if(data["Table"][0].RESP=='1')
        {

          //this.presentbitacora();
        }
        else{
          this.presentToast('NO se ha Registrado TAG. Por favor registrelo');
        }
      }
      this.loading.dismiss();
      });

  }
  private SrRevisaTAG() {
        this.apiUrl = 'http://wsoberon.azurewebsites.net/WSIdentificacion.asmx/getRegistraTAG';
        console.log(this.apiUrl);
        //this.apiUrl = 'http://192.168.0.5:14757/WSIdentificacion.asmx/Identificacion?stRFoto='+stRFotoAux;
        //let creds = JSON.stringify({stRFoto: this.stRFoto});
        //postData.append('stRFoto' , stRFotoAux);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let params = 'stRPTO=' + this.stRPto +'&stREmpleado=' + this.loading.m_Empleado;
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
