import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {  NavController, PopoverController, Platform, ToastController, AlertController } from '@ionic/angular';
import { LoadingService } from './../../loading.service';
import {Http, Headers} from '@angular/http';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';

@Component({
  selector: 'app-entregar',
  templateUrl: './entregar.page.html',
  styleUrls: ['./entregar.page.scss'],
})
export class EntregarPage implements OnInit {

  public apiUrl: string;
    dataAux: any;
    dataAux1: any;
    searchKey: any;
    stLEmpleado: any;
    stLNombre: any;


    private tagId: string;
    private tagMsg: string;
    myListener: any;
    private MinutaID: string;
    constructor(private nav: NavController,
      private modalCtrl: ModalController,
      public loading: LoadingService,
      public http: Http,
      public popoverCtrl: PopoverController,
      private nfc: NFC,
      private ndef: Ndef,
      private platform: Platform,
      private alertController: AlertController,
      private toastCtrl: ToastController) {
        this.stLEmpleado = this.loading.m_Empleado;
        this.stLNombre = this.loading.m_Apellidos + ' ' +this.loading.m_Nombres;
        this.platform.ready().then(() => {
          this.addListenNFC();
        });
       }

      ngOnInit() {
        this.getPuntosRonda();
        //this.getPuntosRondaAsignados(this.loading.m_UbicacionID,'1');
      }

    //  closeModal() {
        //this.myListener.unsubscribe();
      //  this.modalCtrl.dismiss();
      //}


      private getPuntosRonda()
      {

          this.loading.present();
        this.SrBuscaPuntos().then(data => {

                  if(data["Table"] != null) {
                    this.dataAux=data["Table"];

                    //this.stLPuestoNom=this.dataAux[0]["OPE_PTO_NOMBRE"];
                    //console.log(this.dataAux[0]["OPE_PTO_NOMBRE"]);
                    console.log(data);
                  }
            });
            this.loading.dismiss();
      }

      private SrBuscaPuntos() {
            this.apiUrl = 'http://wsoberon.azurewebsites.net/WSIdentificacion.asmx/getPuntosLlavesEntregaSUP';
            console.log(this.apiUrl);
            //this.apiUrl = 'http://192.168.0.5:14757/WSIdentificacion.asmx/Identificacion?stRFoto='+stRFotoAux;
            //let creds = JSON.stringify({stRFoto: this.stRFoto});
            //postData.append('stRFoto' , stRFotoAux);
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

            //let params = 'stRUbicacionID=' + stRPuesto;
            //let params = 'stRUbicacionID=' + stRUbicacion + '&stRTipoPuntos=' + stRTipoPuntos +'&stREmpleado=' + this.loading.m_Empleado;
            let params='stREmpleado=' + this.stLEmpleado;
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
          duration: 2000
        });
        toast.present();

      }
      addListenNFC() {
        console.log('entra a addListenNFC');


        //this.MinutaID=stRMinutaID;

        this.myListener = this.nfc.addNdefListener(() => {
          this.presentToast('NFC Detectado Satisfactoriamente');
          //console.log('successfully attached ndef listener');
        }, (err) => {
          this.presentToast('error al Detectar el NFC del Dispositivo');
          //console.log('error attaching ndef listener', err);
        }).subscribe((event) => {
          this.tagId=this.nfc.bytesToHexString(event.tag.id);
          //this.presentToast('ID' + this.tagId);
          if(this.tagId!=null)
          {

            this.SetWS();

            //this.presentToast('Validar TAG en BD: ' +  this.tagId);
            //this.presentpregunta();
            //this.SetValidaTAG();
          }

        });


      }

      private SetWS()
     {

         this.loading.present();
         this.SrInsertaWS().then(data1 => {
         if(data1["Table"] != null) {
           this.dataAux1=data1["Table"];
           if(this.dataAux1[0].RESP=="0")
           {
             //this.presentAlertConfirmEstado();
             this.presentToast("Precinto Entregado Exitosamente");
             this.getPuntosRonda();
           }
           else{
             this.presentToast("Error: El Precinto NO pudo ser Entregado");
             //this.getPuntosRonda();
           }
         }
         else{
           this.presentToast("Error: El Precinto NO pudo ser Entregado");
           //this.getPuntosRonda();
         }
       });
       this.loading.dismiss();
     }


     private SrInsertaWS() {
       this.apiUrl =  this.loading.m_UrlWS + '/setEstadoLlaves';
       //console.log(this.apiUrl);
       let headers = new Headers();
       headers.append('Content-Type', 'application/x-www-form-urlencoded');
       let params = 'stRTagID=' + this.tagId + '&inREstado=4' + '&stRValidacion=0' + '&stRUsuario=' + this.loading.m_Apellidos + ' ' +this.loading.m_Nombres +'&stREmpleado=' + this.stLEmpleado +'&stRPuntoID=' + ""+'&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
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
      private getItems(stREvent)
      {
        console.log(this.searchKey);

      }

      private getATMBusqueda()
      {
          this.loading.present();
        this.SrBuscaPuntosBusqueda(this.searchKey).then(data => {

                  if(data["Table"] != null) {
                    this.dataAux=data["Table"];

                    //this.stLPuestoNom=this.dataAux[0]["OPE_PTO_NOMBRE"];
                    //console.log(this.dataAux[0]["OPE_PTO_NOMBRE"]);
                    console.log(data);
                  }
            });
            this.loading.dismiss();
      }


      private SrBuscaPuntosBusqueda(stRBusqueda) {
            this.apiUrl = 'http://wsoberon.azurewebsites.net/WSIdentificacion.asmx/getPuntosLlavesBusqEntregaSUP';
            console.log(this.apiUrl);
            //this.apiUrl = 'http://192.168.0.5:14757/WSIdentificacion.asmx/Identificacion?stRFoto='+stRFotoAux;
            //let creds = JSON.stringify({stRFoto: this.stRFoto});
            //postData.append('stRFoto' , stRFotoAux);
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

            //let params = 'stRUbicacionID=' + stRPuesto;
            //let params = 'stRUbicacionID=' + stRUbicacion + '&stRTipoPuntos=' + stRTipoPuntos +'&stREmpleado=' + this.loading.m_Empleado;
            let params='stRNombre=' + stRBusqueda + '&stREmpleado=' + this.stLEmpleado;
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
