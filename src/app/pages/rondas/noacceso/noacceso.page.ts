import { Component, Input, OnInit } from '@angular/core';
import { NavParams,NavController, ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { LoadingService } from './../../../loading.service';
import {Http, Headers} from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ChangeDetectorRef } from '@angular/core';
import { Platform, AlertController, ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-noacceso',
  templateUrl: './noacceso.page.html',
  styleUrls: ['./noacceso.page.scss'],
})
export class NoaccesoPage implements OnInit {
  @Input() value: any;
  matches: String[];

  public image: any;
  public stbase64Image: string;
  //public stbase64ImageAux: string;
  public apiUrl: string;
  public onNoAccesoForm: FormGroup;
  myListener: any;

  dataAux: any;
  dataCat: any;
  lat: any;
  lng: any;
  dataSubCat: any;
  SlMotivo: string;

  TxtDescripcion: string;
  TxtMensaje: any;
  dataNov: any;
  datText: any;
  Foto: any;
  stRPto: string;
  stRATM: string;
  stRNombre: string;
  private stbase64ImageAux: string="assets/img/img-icon3.png";

  constructor(
    public loading: LoadingService,
    public http: Http,
    private nav: NavController,
    private modalCtrl: ModalController,
    private sanitizer: DomSanitizer,
    private camera: Camera,
    private speechRecognition: SpeechRecognition,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private toastCtrl: ToastController,
    public alertController: AlertController,
    private geolocation: Geolocation,
    public navParams: NavParams
  ) {
    this.getMotivo();
    this.getPermission();
    //this.stbase64ImageAux="assets/img/img-icon.png";
    this.stRPto = navParams.get("stRPto");
    this.stRATM = navParams.get("stRATM");
    this.stRNombre = navParams.get("stRNombre");
  }

  ngOnInit() {
    this.image = this.sanitizer.bypassSecurityTrustStyle(this.value);
    this.getCurrentPosition();
    this.onNoAccesoForm = this.formBuilder.group({
      'SlMotivo': [null, Validators.compose([
        Validators.required
      ])
    ],


'datText': [null, Validators.compose([
  Validators.required
])
],





    });
  }

  closeModal() {
    //this.myListener.unsubscribe();
    this.modalCtrl.dismiss();
  }

  async presentToast(stRMensaje) {
       const toast = await this.toastCtrl.create({
         message: stRMensaje,
         duration: 4000
       });
       toast.present();
     }

  getCurrentPosition(){
  this.geolocation.getCurrentPosition()
    .then(position => {

      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      console.log (this.lat);
      console.log (this.lng);
      //this.latLng = new GoogleMapsLatLng(lat, lng)

      //this.loadMap();
  });
}

  private FCapturarFoto(){
    this.camera.getPicture({
       destinationType: this.camera.DestinationType.DATA_URL,
       encodingType: this.camera.EncodingType.JPEG,
       mediaType: this.camera.MediaType.PICTURE,
       correctOrientation: true,
       sourceType:this.camera.PictureSourceType.CAMERA,
       //cameraDirection: 1,
        quality: 50
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.stbase64ImageAux = "data:image/jpeg;base64," + imageData;
        this.stbase64Image = imageData;
        //this.Foto = imageData.replace("+","__");
    }, (err) => {
        console.log(err);
    });
}

async presentAlertConfirm() {
   const alert = await this.alertController.create({
     header: 'Confirmar',
     message: '¿Está Seguro(a) de Guardar la Notificación del NO Acceso?',
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
           this.SrProcesaIngreso();
         }
       }
     ]
   });
   await alert.present();
}

startListening() {
  let options = {
    language: 'es-CO'
  }
  this.myListener =this.speechRecognition.startListening().subscribe(matches => {
  this.datText = matches[0];
  this.cd.detectChanges();
  });
                //this.isRecording = true;
}

private getMotivo()
{
    this.loading.present();
  this.SrBuscaMotivo().then(data => {

            if(data["Table"] != null) {
              this.dataAux=data["Table"];

              console.log(data);
            }
      });
      this.loading.dismiss();
}
private SrBuscaMotivo() {
      this.apiUrl = this.loading.m_UrlWS +'/getMotivoNoAcceso';
      //console.log(this.apiUrl);
      //this.apiUrl = 'http://192.168.0.5:14757/WSIdentificacion.asmx/Identificacion?stRFoto='+stRFotoAux;
      //let creds = JSON.stringify({stRFoto: this.stRFoto});
      //postData.append('stRFoto' , stRFotoAux);
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      let params = '&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
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



SrIngresar(formData){
  console.log('Ingresa Form ' + this.SlMotivo);
  this.presentAlertConfirm();

}

private SrProcesaIngreso(){
  this.loading.present();

  this.SrIngresaNoAccess().then(data => {

            if(data["Table"] != null) {
              this.dataNov=data["Table"];

              console.log(data["Table"][0].RESP);
              if(data["Table"][0].RESP=='OK')
              {
                this.presentToast('Registro Guardado Satisfactoriamente');
                this.closeModal();
              }
              else{
                  this.presentToast('Error al Guardar Registro');
              }
            }
            this.loading.dismiss();
      });

}

private SrIngresaNoAccess() {
      this.apiUrl = this.loading.m_UrlWS +'/setIngresaNoAccess';
      console.log(this.apiUrl);
      //this.apiUrl = 'http://192.168.0.5:14757/WSIdentificacion.asmx/Identificacion?stRFoto='+stRFotoAux;
      //let creds = JSON.stringify({stRFoto: this.stRFoto});
      //postData.append('stRFoto' , stRFotoAux);
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      //console.log(this.m_puesto);
      //let foto = this.stbase64Image;
      //let nfoto = foto.replace("+", ".");

      let params = 'stRPunto=' + this.stRPto + '&stREmpleado='+ this.loading.m_Empleado +'&stRMotivo=' + this.SlMotivo +'&stRDescripcion=' + this.datText + '&stRFoto=' + this.stbase64Image + '&stRLat=' + this.lat + '&stRLon='+ this.lng + '&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
      //let params='';
      console.log(params);
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



getPermission() {
                this.speechRecognition.hasPermission()
                  .then((hasPermission: boolean) => {
                    if (!hasPermission) {
                      this.speechRecognition.requestPermission();
                    }
                  });
              }


}
