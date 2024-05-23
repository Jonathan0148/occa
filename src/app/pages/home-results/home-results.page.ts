import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import {
  NavController,
  AlertController,
  MenuController,
  LoadingController,
  ToastController,
  PopoverController,
  ModalController, Platform } from '@ionic/angular';

  import { Flashlight } from '@ionic-native/flashlight/ngx';

import { PropertyService } from '../../providers';
import { SearchFilterPage } from '../../pages/modal/search-filter/search-filter.page';
import { NotificationsComponent } from './../../components/notifications/notifications.component';
import { LoadingService } from './../../loading.service';
import {Http, Headers} from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { InAppBrowser, InAppBrowserOptions  } from  '@ionic-native/in-app-browser/ngx';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

declare var window;
@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(100px,0,0)` }), { optional: true }),
        query(':enter', stagger('200ms', [animate('400ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class HomeResultsPage {
  private apiUrl: string;
  locations: any;
  properties: Array<any>;
  searchKey = '';
  label = '';
  yourLocation = '463 Beacon Street Guest House';
  inLLinterna: number=0;
  ClrFondo: string ="";
  ClrFondoPan: string ="red";
  stLNomCliente: string="";
  stLNomUbicacion: string="";

  private datList: any;
  private datListAux: any;
  private stLUrl: string;
  private dataNov: any;
  private dataAux: any;
  private lat: any;
  private lng: any;
  private cont:number = 0;
  private stLColorRonda: string="";
  private stLEstadoRonda: string="";

  private stLColorNotifica: string="";
  private inLContadorNotifica: number=0;

  private stLEstadoTurno: string="";
  private stLPuesto: string="";
  private ColorAsistencia: string;

  inLIDAux: string='';

  options : InAppBrowserOptions = {
      location : 'yes',//Or 'no'
      hidden : 'no', //Or  'yes'
      clearcache : 'yes',
      clearsessioncache : 'yes',
      zoom : 'yes',//Android only ,shows browser zoom controls
      hardwareback : 'yes',
      mediaPlaybackRequiresUserAction : 'no',
      shouldPauseOnSuspend : 'no', //Android only
      closebuttoncaption : 'Close', //iOS only
      disallowoverscroll : 'no', //iOS only
      toolbar : 'yes', //iOS only
      enableViewportScale : 'no', //iOS only
      allowInlineMediaPlayback : 'no',//iOS only
      presentationstyle : 'pagesheet',//iOS only
      fullscreen : 'yes',//Windows only
  };

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private http: Http,
    private service: PropertyService,
    private router: Router,
    private flash : Flashlight,
    private loading: LoadingService,
    private geolocation: Geolocation,
    private callNumber: CallNumber,
    private localNotifications: LocalNotifications,
    private backgroundMode: BackgroundMode,
    private tts: TextToSpeech,
    public plt:Platform,
    private theInAppBrowser: InAppBrowser,


  ) {
      this.stLNomCliente=this.loading.m_Cliente;
      this.stLNomUbicacion=this.loading.m_Cliente_Com;
      this.locations=[];

      //console.log("Lista");
      //console.log(this.datListAux);


      this.GetCurrentPosition();
      this.SrProcesaInicioAsistencia();
      //this.SrEnviarDatosServidor(6);
      this.GetContadorNotifi();
      this.StartBackgroundTracking();
      //this.GetSubEstadoRonda();
      //this.SrRevisarVarios_SegundoPlano(300);
      //this.SrSegundo_plano_Notifica(60);

  }
  StartBackgroundTracking(){
    window.app.backgroundGeolocation.start();
  }

  StopBackgroundTracking(){
    window.app.backgroundGeolocation.stop();
  }
  Getlocations(){
    //this.locations=(JSON.parse(localStorage.getItem("location"))==null)?[]:JSON.parse(localStorage.getItem("location"));
  }
  ClearLocations(){
    //localStorage.removeItem("location");
  }
  GetCurrentPosition(){
    this.geolocation.getCurrentPosition()
      .then(position => {

        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        //console.log (this.lat);
        //console.log (this.lng);
        //this.latLng = new GoogleMapsLatLng(lat, lng)

        //this.loadMap();
    });
}
SrSegundo_plano_Notifica(nMinutos:number){

   this.plt.ready().then(() => {

        this.backgroundMode.enable();

        // Empezamos a enviar dato de acuerdo al parametro nMinutos

        setInterval(() => {

              this.GetContadorNotifi();

            //this.loading.dismiss();

           console.log(this.cont);

           this.cont++;

        },nMinutos*1000);
      });
   }
SrRevisarVarios_SegundoPlano(nMinutos:number){

   this.plt.ready().then(() => {

        this.backgroundMode.enable();

        // Empezamos a enviar dato de acuerdo al parametro nMinutos

        setInterval(() => {

              //this.GetSubEstadoRonda();

            //this.loading.dismiss();

           console.log(this.cont);

           this.cont++;

        },nMinutos*1000);
      });
   }

SrEnviarDatosServidor(nMinutos:number){

   this.plt.ready().then(() => {

        this.backgroundMode.enable();

        // Empezamos a enviar dato de acuerdo al parametro nMinutos

        setInterval(() => {

          //this.loading.present();
          //Aqui ejecutamos el servicio
          this.SrBuscaPanicos().then(data => {

                  if(data["Table1"] != null) {
                    this.dataAux=data["Table1"];
                    console.log(this.dataAux[0]);
                    if(this.dataAux[0].RESP=="OK")
                    {

                      this.tts.speak({
                        text: 'Alerta OBERÓN: Reporta Pánico en: ' +  this.dataAux[0].PANICO_DESCRIPCION,
                        rate: 1,
                        locale: 'es-CO'
                      })
                      .then(() => console.log('Success'))
                      .catch((reason: any) => console.log(reason));
                        if(this.inLIDAux!=this.dataAux[0].IOT_PAN_ID_REG)
                        {
                          this.presentAlertConfirm('Información de Pánico', 'Pánico Reportado en: ' + this.dataAux[0].PANICO_DESCRIPCION, this.dataAux[0].IOT_PAN_ID_REG);
                        }
                        this.registerNotification(this.dataAux[0].IOT_PAN_ID_REG, this.dataAux[0].PANICO_DESCRIPCION);
                        this.inLIDAux=this.dataAux[0].IOT_PAN_ID_REG;
                        //console.log(this.dataAux[0].IOT_PAN_ID_REG);
                        //console.log(this.dataAux[0].PANICO_DESCRIPCION);
                        //console.log(this.cont);
                    }
                }

            });
            //this.loading.dismiss();

           console.log(this.cont);

           this.cont++;

        },nMinutos*1000);

   });
 }
 async presentAlertConfirm(title: string,
            message: string, id: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: [
        //{
          //text: 'Cancel',
          //role: 'cancel',
          //cssClass: 'secondary',
          //handler: (blah) => {
          //  console.log('Confirm Cancel: blah');
          //}
        //},
        {
          text: 'Aceptar',
          handler: () => {
            this.loading.present();
            //Aqui ejecutamos el servicio
            this.SrDetenerPanicos(id).then(data => {

              if(data["Table1"] != null) {
              }
            }
          );
          this.loading.dismiss();


          }
        }
      ]
    });
    await alert.present();
   }

 private SrBuscaPanicos() {
       this.apiUrl = this.loading.m_UrlWS +'/GetPanico';
       console.log(this.apiUrl);
       //this.apiUrl = 'http://192.168.0.5:14757/WSIdentificacion.asmx/Identificacion?stRFoto='+stRFotoAux;
       //let creds = JSON.stringify({stRFoto: this.stRFoto});
       //postData.append('stRFoto' , stRFotoAux);
       let headers = new Headers();
       headers.append('Content-Type', 'application/x-www-form-urlencoded');

       let params = 'stClienteID=' + this.loading.m_ClienteID +'&stEmpleadoID=' + this.loading.m_Empleado;
       console.log(params);
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



 private SrDetenerPanicos(stRID: string) {
       this.apiUrl = this.loading.m_UrlWS +'/setPanico';
       console.log(this.apiUrl);
       //this.apiUrl = 'http://192.168.0.5:14757/WSIdentificacion.asmx/Identificacion?stRFoto='+stRFotoAux;
       //let creds = JSON.stringify({stRFoto: this.stRFoto});
       //postData.append('stRFoto' , stRFotoAux);
       let headers = new Headers();
       headers.append('Content-Type', 'application/x-www-form-urlencoded');

       let params = 'stRDispositivo=&stRDato=&stREmpleado=' + this.loading.m_Empleado + '&stRID=' + stRID;
       console.log(params);
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

/*
 private GetSubEstadoRonda()
 {
   //this.GetFunciones('-1','-1');
   //this.loading.presentTxt('Oberón Obteniendo Estado de las Rondas ...');
   this.SrBuscaEstadoRondas().then(data => {
     //console.log(data["Table1"]);
     if(data["Table1"] != null) {
       if(data["Table1"][0].PENDIENTE=='1')
       {
         this.stLColorRonda="danger";
         this.stLEstadoRonda="Pendientes";
         this.tts.speak({
           text: 'Alerta OBERÓN: ' +  this.loading.m_Nombres +' Tiene una Ronda Pendiente por Ejecutar ',
           rate: 1,
           locale: 'es-CO'
        })
        .then(() => console.log('Success'))
        .catch((reason: any) => console.log(reason));
       }
       else{
         if(data["Table1"][0].PENDIENTE=='2')
         {
           this.stLColorRonda="warning";
           this.stLEstadoRonda="En Ejecución";
         }
         else{
           this.stLColorRonda="dark";
           this.stLEstadoRonda="No hay Pendientes";
         }
       }
       //this.dataSubCat=data["Table1"];
       //this.TabFirma=false;
     }
   });
   //this.loading.dismiss();

 }

 private SrBuscaEstadoRondas() {
   this.apiUrl = this.loading.m_UrlWS +'/GetRondas_Pendientes';
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let params = 'stRID_Puesto=' + this.loading.m_Puesto +'&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
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

*/
 private GetContadorNotifi()
 {
   //this.GetFunciones('-1','-1');
   //this.loading.presentTxt('Oberón Obteniendo Estado de las Rondas ...');
   this.SrBuscaContadorNotifi().then(data => {
     //console.log(data["Table1"]);
     if(data["Table1"] != null) {
       if(data["Table1"][0].CONTADOR>0)
       {
         this.stLColorNotifica="danger";
         this.inLContadorNotifica=data["Table1"][0].CONTADOR;
       }
       else{
         this.stLColorNotifica="dark";
         this.inLContadorNotifica=0;
       }
       //this.dataSubCat=data["Table1"];
       //this.TabFirma=false;
     }
   });
   //this.loading.dismiss();

 }

 private SrBuscaContadorNotifi() {
   this.apiUrl = this.loading.m_UrlWS +'/GetContador_Alertas';
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let params = 'stEmpleadoID=' + this.loading.m_Empleado +'&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
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



 registerNotification(ID: number, Texto: string) {
       //var sound = this.plt != 'iOS' ? 'file://audio/adhan.mp3' : 'content://assets/img/OberonAlert.mp3';
       this.localNotifications.schedule({
         id: ID,
         title: 'Alerta - OBERÓN',
         text: 'Botón de Panico - ' + Texto,
         data: { mydata : Texto},
         led: 'FF0000',
         sound: 'file://OberonAlert.mp3',
         //sound: 'file://android_asset/www/assets/img/OberonAlert.mp3',
         vibrate: true
         //sound: '../assets/img/OberonAlert.mp3',
         //trigger: {
           // at: new Date(new Date().getTime() + ms) DOESN'T WORK
         //   every: ELocalNotificationTriggerUnit.MINUTE
         //},
       });
     }
  public openWithInAppBrowser(url : string){
      let target = "_self";
      this.theInAppBrowser.create(url,target,this.options);
  }


  onLinterna(){
    if(this.inLLinterna==0)
    {
        this.flash.switchOn();
        this.inLLinterna=1;
        this.ClrFondo="blue";
    }
    else
    {
      this.flash.switchOff();
      this.inLLinterna=0;
      this.ClrFondo="";

    }

  }
  onPanico(){
    this.SetPanico();
  }

  onLlamar(){
    this.GetTelCentral();
  }

  private GetTelCentral()
  {
    //this.GetFunciones('-1','-1');

    this.SrBuscaTelCentral().then(data => {
      if(data["Table1"] != null) {
        this.dataAux=data["Table1"][0];
        let stLTelefono=this.dataAux.CODIR_TELEFONO;
        if(stLTelefono!="")
        {
          this.callNumber.callNumber(stLTelefono, true)
          //.then(res => console.log('Launched dialer!', res))
          //.catch(err => console.log('Error launching dialer', err));

        }

      }
    });

  }

  private SrBuscaTelCentral() {
    this.loading.presentTxt('Oberón Obteniendo Telefóno de la Central de Operaciones...');
    this.stLUrl = this.loading.m_UrlWS +'/GetTelCentral';
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let params = 'stRStatus=1&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
    console.log(params);
    return new Promise(resolve => {
    this.http.post(this.stLUrl,params,{headers: headers}).subscribe(data => {
      if(data.json()!=null){
        this.loading.dismiss();
        //console.log(data.json());
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

  private SetPanico()
  {
    //this.GetFunciones('-1','-1');

    this.SrBuscaPanico().then(data => {
      if(data["Table1"] != null) {
        this.dataAux=data["Table1"];
      }
    });

  }

  private SrBuscaPanico() {
    this.loading.presentTxt('Oberón Reportando Pánico...');
    this.stLUrl = this.loading.m_UrlWS + '/Ins_Alertas';
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let params = 'stRReferencia=' + this.loading.m_IMEI + '&stREmpleado=' + this.loading.m_Empleado + '&stRTipo=1&stRLatitud=' + this.lat + '&stRLongitud=' + this.lng + '&stRUbicacion=0&stRStatus=1&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
    console.log(params);
    return new Promise(resolve => {
    this.http.post(this.stLUrl,params,{headers: headers}).subscribe(data => {
      if(data.json()!=null){
        this.loading.dismiss();
        //console.log(data.json());
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

  private SrProcesaInicioAsistencia(){
    //this.loading.presentTxt('Oberón Obteniendo el Estado de la Asistencia...');
    //alert("Entra1");

    this.SrBuscaGetInicioAsistencia().then(data => {
      if(data["Table1"] != null) {
        //this.loading.dismiss();
        //this.dataNov=data["Table1"];
        //console.log(data["Table1"][0].RESP);
        if(data["Table1"]=="")
        {
          //this.loading.dismiss();
          //alert("ERROR: En la Consulta del Estado de Asistencia Inicio");
          this.stLPuesto="SIN ASISTENCIA";
          //this.Disable=true;
          this.ColorAsistencia="danger";
          this.datList=this.service.findByNameTurnoCerrado('ST');
          this.datListAux=this.datList["__zone_symbol__value"];
        }
        else{
          if(data["Table1"][0].Error_Code=="0")
          {
            this.stLEstadoTurno=data["Table1"][0].ESTADO_ASISTENCIA;


            if(this.stLEstadoTurno=="0")
            {
              //let stLPto=data["Table1"][0].ASISTENCIA_IDPUESTO.toString();
              this.stLPuesto="SIN ASISTENCIA";
              //this.Disable=true;
              this.ColorAsistencia="danger";
              this.datList=this.service.findByNameTurnoCerrado('ST');
              this.datListAux=this.datList["__zone_symbol__value"];

            }

            if(this.stLEstadoTurno=="1")
            {
              //let stLPto="";
              let stLPto=data["Table1"][0].CIUDADOP.toString();
              this.loading.m_Puesto=data["Table1"][0].ASISTENCIA_IDPUESTO.toString();
              this.loading.m_TipoTAG=data["Table1"][0].SUC_QRNFC.toString();
              this.stLPuesto=stLPto;
              //this.Disable=true;
              this.ColorAsistencia="warning";
              this.datList=this.service.findByNameTurnoAbierto('turno');
              this.datListAux=this.datList["__zone_symbol__value"];
              //this.MensajeIdentifica="Empleado Identificado";
              //document.documentElement.style.setProperty("--colorbordimg", '#ffce00');
              //document.documentElement.style.setProperty("--colorletRec", '#000000');
            }

            if(this.stLEstadoTurno=="2")
            {
              let stLPto=data["Table1"][0].CIUDADOP.toString();
              this.loading.m_Puesto=data["Table1"][0].ASISTENCIA_IDPUESTO.toString();
              this.loading.m_TipoTAG=data["Table1"][0].SUC_QRNFC.toString();
              this.stLPuesto=stLPto;
              //this.Disable=true;
              this.ColorAsistencia="dark";
              this.datList=this.service.findByNameTurnoCerrado('ST');
              this.datListAux=this.datList["__zone_symbol__value"];
              //this.MensajeIdentifica="Empleado Identificado";
              //document.documentElement.style.setProperty("--colorbordimg", '#ffce00');
              //document.documentElement.style.setProperty("--colorletRec", '#000000');
            }

          }
        }



      }
      else{
        //this.loading.dismiss();
        alert("ERROR: En la Consulta del Estado de Asistencia Inicio");
        this.stLPuesto="SIN ASISTENCIA";
        //this.Disable=true;
        this.ColorAsistencia="danger";
      }
    });
    //this.GetSubEstadoRonda();

  }

  private SrBuscaGetInicioAsistencia() {
    this.stLUrl = this.loading.m_UrlWS +'/GetEmpleadosAsistenciaActual';
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let params = 'stREmpleado=' + this.loading.m_Empleado + '&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
  //console.log(params);
    //alert(params);
    return new Promise(resolve => {
    this.http.post(this.stLUrl,params,{headers: headers}).subscribe(data => {
      if(data.json()!=null){
        //console.log(data.json());
         resolve(data.json());
      }
      else
        resolve(false);
      });
    });

  }

  ionViewWillEnter() {
    this.SrProcesaInicioAsistencia();
    this.menuCtrl.enable(true);
    this.findAll();

  }

  settings() {
    this.navCtrl.navigateForward('settings');
  }

  onInput(event) {
    this.service.findByName(this.searchKey)
        .then(data => {
            this.properties = data;
        })
        .catch(error => alert(JSON.stringify(error)));
  }

  onCancel(event) {
    this.findAll();
  }

  findAll() {
    this.service.findAll()
      .then(data => this.properties = data)
      .catch(error => alert(error));

  }

  async openPropertyListPage(label?: any) {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(() => {
      let navigationExtras: NavigationExtras = {
        state: {
          cat: '',
          label: label
        }
      };
      this.router.navigate(['property-list'], navigationExtras);
    });
  }

  async alertLocation() {
    const changeLocation = await this.alertCtrl.create({
      header: 'Change Location',
      message: 'Type your Address to change list in that area.',
      inputs: [
        {
          name: 'location',
          placeholder: 'Enter your new Location',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Change',
          handler: async (data) => {
            console.log('Change clicked', data);
            this.yourLocation = data.location;
            const toast = await this.toastCtrl.create({
              message: 'Location was change successfully',
              duration: 3000,
              position: 'top',
              closeButtonText: 'OK',
              showCloseButton: true
            });

            toast.present();
          }
        }
      ]
    });
    changeLocation.present();
  }

  async searchFilter () {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage
    });
    return await modal.present();
  }

  async notifications() {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

}
