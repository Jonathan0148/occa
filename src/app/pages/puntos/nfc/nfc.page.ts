import { OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { TranslateProvider } from '../../../providers';
import { Platform, ModalController } from '@ionic/angular';
import { NavParams, NavController, ToastController, AlertController } from '@ionic/angular';
import { LoadingService } from '../../../loading.service';
import {Http, Headers} from '@angular/http';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-nfc',
  templateUrl: './nfc.page.html',
  styleUrls: ['./nfc.page.scss'],
})
export class NfcPage implements OnInit {
  private stLIdPunto: string="";
  private stLConfiguracion: string="";
  private stLNomPunto: string="";
  private stLTitulo: string="";
  private stLTituloAux: string="";

  private tagId: string;
  private tagMsg: string;
  private dataNov: any;
  private myListener: any;
  private stLUrl: string;
  private dataAux: any;
  private lat: any;
  private lng: any;
  private stbase64ImageAux="assets/img/Tag_Escan.png";

  constructor(private translate: TranslateProvider,
    private nav: NavController,
    private modalCtrl: ModalController,
    private loading: LoadingService,
    private navParams: NavParams,
    private alertController: AlertController,
    private platform: Platform,
    private http: Http,
    private nfc: NFC,
    private ndef: Ndef,
    private geolocation: Geolocation) {
      this.stLIdPunto = navParams.get("stRIdPunto");
      this.stLConfiguracion = navParams.get("stRConfiguracion");
      this.stLNomPunto= navParams.get("stRNomPunto");
      if(this.stLConfiguracion=="ASIG")
      {
          this.stLTitulo="Asignación de TAG";
          this.stLTituloAux="Asignar TAG";
      }
      else if(this.stLConfiguracion=="INSTAL")
      {
          this.stLTitulo="Instalación de TAG";
          this.stLTituloAux="Instalar TAG";
      }

      this.platform.ready().then(() => {
        //this.presentToast('Ingresa');
         this.getCurrentPosition();
         this.addListenNFC();

      });
  }

  private getCurrentPosition(){

  //let options = {timeout: 5000, enableHighAccuracy: true};
  this.geolocation.getCurrentPosition()
  .then(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
  });
}

addListenNFC() {
  //console.log('entra a addListenNFC');
    this.loading.presentTxt('Oberón detecta NFC Satisfactoriamente ...');
    this.myListener = this.nfc.addNdefListener(() => {

      this.loading.dismiss();
    }, (err) => {
      alert('error Oberón NO puede detectar el NFC del Dispositivo. Por favor Habilítelo...');
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
      this.tagId=this.loading.m_Sigla + this.tagId;
      //alert(this.loading.m_Sigla + ' - ' + this.tagId);
      this.GetPuntosEstado();
      //this.presentpregunta();
      //this.SetValidaTAG();
    }
  });
  this.loading.dismiss();
}

  ngOnInit() {
    //console.log ("SIGLA " + this.loading.m_Sigla);

  }
  closeModal() {
    this.myListener.unsubscribe();
    this.modalCtrl.dismiss();
  }

  private SrProcesarTAG(){
    if(this.tagId==null)
    {
      alert("Por Favor Escanee el TAG antes de procesar")
    }
    else{
      if(this.stLConfiguracion=="ASIG")
      {
        this.presentAlertConfirm("ASIGNAR", "ASIGNAR")
      }
      else if(this.stLConfiguracion=="INSTAL")
      {
        this.presentAlertConfirm("INSTALAR", "INSTALAR")
      }

    }
  }
  private GetPuntosEstado()
  {
    //this.GetFunciones('-1','-1');
    this.loading.presentTxt('Oberón Obteniendo Estado del Punto...');
    this.SrBuscaPuntosEstado().then(data => {
    //console.log(data["Table"]);
      if(data["Table"] != null) {
        this.dataAux=data["Table"][0];
        if(this.stLConfiguracion=="ASIG")
        {
          if(this.dataAux.ESTADO=="0")
          {
              this.stbase64ImageAux="assets/img/Tag_SA.png";
          }
          else{
            this.stbase64ImageAux="assets/img/Tag_Red.png";
            this.tagId=null;
          }
        }
        else if(this.stLConfiguracion=="INSTAL")
        {
            if(this.dataAux.ESTADO=="2")
            {
                this.stbase64ImageAux="assets/img/Tag_ASIG.png";
            }
            else{
              this.stbase64ImageAux="assets/img/Tag_Red.png";
              this.tagId=null;
            }

        }
      }
    });
    this.loading.dismiss();
  }
  private SrBuscaPuntosEstado(){

    this.stLUrl = this.loading.m_UrlWS +'/GetEstadoTag';
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let params = 'stR_Tag_ID=' + this.tagId + '&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
    //console.log(params);
    return new Promise(resolve => {
    this.http.post(this.stLUrl,params,{headers: headers}).subscribe(data => {
      if(data.json()!=null){
        //console.log(data.json());


         resolve(data.json());
      }
      else
      {
        //this.loading.dismiss();
        resolve(false);
      }
      });
    });

  }

  private SrProcesaIngreso(stRInstalado: string, stRAsignado: string)
  {
    //this.GetFunciones('-1','-1');
    this.SrActualizaTAG(stRInstalado, stRAsignado).then(data => {
    //console.log(data["Table"]);
      if(data["Table"] != null) {
        this.dataAux=data["Table"][0];
        if(this.dataAux.PUN_IDREG>0)
        {
            if(stRInstalado=="0")
            {
              this.presentAlertConfirmFinal("TAG Asignado al Punto " + this.stLNomPunto + " Satisfactoriamente","1")

            }
            else if(stRInstalado=="1")
            {
              this.presentAlertConfirmFinal("TAG Instalado en el Punto " + this.stLNomPunto + " Satisfactoriamente","1")
            }
        }
        else{

          if(stRInstalado=="0")
          {
            this.presentAlertConfirmFinal("ERROR: En la asignación de TAG al punto " + this.stLNomPunto + ". Por favor intente nuevamente","0")
          }
          else if(stRInstalado=="1")
          {
            this.presentAlertConfirmFinal("ERROR: En la instalación del TAG en el punto " + this.stLNomPunto + ". Por favor intente nuevamente","0")
          }

        }
      }
    });
  }

  async presentAlertConfirmFinal(stRMensaje: string, stRSalir: string) {
  const alert = await this.alertController.create({
    header: 'Oberón - Alerta',
    message: stRMensaje,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Aceptar',
        handler: () => {
          if(stRSalir=="1")
          {
              this.closeModal();
          }
        }
      }
    ]
  });

  await alert.present();
}

  private SrActualizaTAG(stRInstalado: string, stRAsignado: string ){
    this.loading.presentTxt('Oberón Actualizando TAG en el Punto...');
    this.stLUrl = this.loading.m_UrlWS +'/PutPuntos';
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let params = 'stRPunto_ID=' + this.stLIdPunto +'&stRNombre=' + this.stLNomPunto + '&stRTag_ID=' + this.tagId + '&stRInstalado='+ stRInstalado + '&stRAsignado='+ stRAsignado +'&stREmpleado_ID=' + this.loading.m_Empleado +'&stRLatitud=' + this.lat +'&stRLongitud=' + this.lng +'&stRCliente=' + this.loading.m_ClienteID + '&stRUbicacion='+ this.loading.m_UbicacionID +'&stREstado=1&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
    //console.log(params);
    return new Promise(resolve => {
    this.http.post(this.stLUrl,params,{headers: headers}).subscribe(data => {
      if(data.json()!=null){
        //console.log(data.json());
        this.loading.dismiss();

         resolve(data.json());
      }
      else
      {
        this.loading.dismiss();
        resolve(false);
      }
      });
    });

  }

  async presentAlertConfirm(stRMensaje: string, stRFuncion: string) {
    let btnAsignar="";
    if(stRFuncion=="ASIGNAR")
    {
      btnAsignar="Asignar"
    }
    else if(stRFuncion=="INSTALAR")
    {
      btnAsignar="Instalar"
    }
     const alert = await this.alertController.create({
       header: 'Confirmar',
       message: '¿Está Seguro(a) de ' + stRMensaje +' el TAG en el Punto: ' + this.stLNomPunto + '?',
       buttons: [
         {
           text: 'Cancelar',
           role: 'cancel',
           cssClass: 'secondary',
           handler: (blah) => {
             console.log('Confirm Cancel: blah');
           }
         }, {
           text: btnAsignar,
           handler: () => {
             if(stRFuncion=="ASIGNAR")
             {

                this.SrWriteNFC();
             }
             else if(stRFuncion=="INSTALAR")
             {
                this.SrProcesaIngreso("1","1");
             }

           }
         }
       ]
     });
     await alert.present();
  }


  private SrWriteNFC(){

    let message = this.ndef.textRecord(this.stLNomPunto);
//this.nfc.share([message]).then(this.presentToast('Funciona Escritura')).catch(this.presentToast('NO Funciona Escritura')); NO

    this.nfc.write([message])
    .then(() => {
          //this.loading.presentTxt('Oberon ha Cargado la Información Satisfactoriamente');
          //console.log("written");
          //this.SrIngresar();
          this.SrProcesaIngreso("0","1");

        })
        .catch(err => {
          alert('Error Cargando la Información en el TAG. Por favor Intentelo de Nuevo');
        });
  }

}
