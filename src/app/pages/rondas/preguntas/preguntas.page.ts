import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateProvider } from '../../../providers';
import { ModalController } from '@ionic/angular';
import { NavParams,IonSlides, NavController } from '@ionic/angular';
import { LoadingService } from '../../../loading.service';
import {Http, Headers} from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.page.html',
  styleUrls: ['./preguntas.page.scss'],
})
export class PreguntasPage implements OnInit {
  @ViewChild(IonSlides, { static: true }) slides: IonSlides;
  showSkip = true;
  private stbase64ImageAux: string="assets/img/img-icon3.png";
  private stbase64Image: string="";
  private stLUrl: string;
  private lat: any;
  private lng: any;
  private dataCorr: any;
  private dataAux: any;
  private dataAuxTipo: any;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    allowTouchMove:false,
    autoHeight:true,

      //paginationClickable: false
    //preventInteractionOnTransition: true
    //allowSlidePrev: true
  };



  private TabPosition: string='0';
  private stLColorTabAct: string='secondary';
  private stLColorTabInac: string='primary';
  private stLColorTab1: string;
  private stLColorTab2: string;
  private stLColorTab3: string;
  private onPreguntaRondForm: FormGroup;
  private stRIdPunto: string;
  private stRNomPunto: string;
  private stRIdProyec: string;
  private stLTipoResp: string;
  private datText: string="";
  private stLCorreo: string="";
  private stLNovedad: string="1";
  private stLEntra: string="0";
  private stLObligaImagen: string="0";



  constructor(private loading: LoadingService,
    private nav: NavController,
    private modalCtrl: ModalController,
    private camera: Camera,
    private http: Http,
    private geolocation: Geolocation,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private speechRecognition: SpeechRecognition,
    private cd: ChangeDetectorRef

    ) {
      this.stLColorTab1=this.stLColorTabAct;
      this.stLColorTab2=this.stLColorTabInac;

      this.stRIdPunto = navParams.get("stRIdPunto");
      this.stRNomPunto= navParams.get("stRNomPunto");
      this.stRIdProyec= navParams.get("stRIdProyec");
      this.GetPermission();
      this.GetCurrentPosition();
      this.GetPreguntas();
      //console.log("Proyecta ID: " + this.stRIdProyec);
      //this.slides.allowTouchMove = true;

    }




  closeModal() {
    this.modalCtrl.dismiss("0");
  }


  SrOpenTab(stRTab: string){
    if(stRTab=="0")
    {
      this.stLColorTab1=this.stLColorTabAct;
      this.stLColorTab2=this.stLColorTabInac;
      this.stLColorTab3=this.stLColorTabInac;
    }
    else if(stRTab=="1")
    {
      this.stLColorTab1=this.stLColorTabInac;
      this.stLColorTab2=this.stLColorTabAct;
      this.stLColorTab3=this.stLColorTabInac;
    }
    else if(stRTab=="2")
    {
      this.stLColorTab1=this.stLColorTabInac;
      this.stLColorTab2=this.stLColorTabInac;
      this.stLColorTab3=this.stLColorTabAct;
    }

    this.TabPosition=stRTab;
  }

  onSlideNext() {
    //console.log("Contador" + this.cont);

    this.slides.lockSwipes(false)
    this.stLTipoResp="";
    this.stLCorreo="";
    this.stLNovedad="1";
    this.stLEntra="1";
    this.stbase64ImageAux="assets/img/img-icon3.png";
    this.stbase64Image="";
    this.datText="";
    this.SrOpenTab('0');
    this.slides.slideNext(1000, false);
    this.slides.lockSwipes(true)
    /*
    this.cont=this.cont+1;
    if(this.cont==3)
    {
      this.navCtrl.navigateForward('/login');
    }
    */
  }

	onSlidePrev() {
    this.slides.slidePrev(300);
  }

  ngOnInit() {

    this.onPreguntaRondForm = this.formBuilder.group({
    'datText': [null, Validators.compose([
      //Validators.required
   ])
   ],

   'stLProveedor': [null, Validators.compose([
      //Validators.optional
   ])
   ],


   'stLTipoResp': [null, Validators.compose([
      Validators.required
   ])
   ],


   'stLCorreo': [null, Validators.compose([
      //Validators.optional
   ])
   ],

   'stbase64ImageAux': [null, Validators.compose([
      //Validators.required
   ])
   ],

   'stbase64Image': [null, Validators.compose([
      //Validators.required
   ])
   ],



    });

  }

  GetCurrentPosition(){
    this.geolocation.getCurrentPosition()
      .then(position => {

        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        //this.latLng = new GoogleMapsLatLng(lat, lng)

        //this.loadMap();
    });
}

  private GetPreguntas()
  {
    //this.GetFunciones('-1','-1');
    this.loading.presentTxt('Oberón Obteniendo Preguntas Asignadas...');
    this.SrBuscaPreguntas().then(data => {
    //console.log(data["Table"]);
    if(data["Table"] != null) {
      this.dataAux=data["Table"];
      this.stLEntra="1";
    }
  });
    this.loading.dismiss();
  }

  private SrBuscaPreguntas() {
    //this.loading.presentTxt('Oberón Obteniendo Minutas...');
    this.stLUrl = 'http://wsoberonvigilantes.azurewebsites.net/WsVigilantes.asmx/GetPreguntas_Ronda';
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let params = 'stRProyeccion_Ronda_ID=' + this.stRIdProyec + '&stRPunto='+ this.stRIdPunto +'&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
    //console.log(params);
    return new Promise(resolve => {
    this.http.post(this.stLUrl,params,{headers: headers}).subscribe(data => {
      if(data.json()!=null){
        //console.log(data.json());
        //this.loading.dismiss();

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


  private GetTiposRespuesta(stRTipoREspuesta: String)
  {

    //console.log("Entra " + stRTipoREspuesta);
    //this.GetFunciones('-1','-1');
    this.loading.presentTxt('Oberón Obteniendo Tipos de Respuesta...');
    this.SrBuscaTiposRespuesta(stRTipoREspuesta).then(data => {
    //console.log(data["Table"]);
    if(data["Table"] != null) {
      this.dataAuxTipo=data["Table"];
    }
  });
    this.loading.dismiss();
  }

  private SrBuscaTiposRespuesta(stRTipoREspuesta: String) {
    //this.loading.presentTxt('Oberón Obteniendo Minutas...');
    this.stLUrl = 'http://wsoberonvigilantes.azurewebsites.net/WsVigilantes.asmx/GetRespuestas_tipo';
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let params = 'stRTipo_Respuesta=' + stRTipoREspuesta + '&stREstado=1&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
    //console.log(params);
    return new Promise(resolve => {
    this.http.post(this.stLUrl,params,{headers: headers}).subscribe(data => {
      if(data.json()!=null){
        //console.log(data.json());
        //this.loading.dismiss();

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

  SrCapturarFoto(){
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

    }, (err) => {
        console.log(err);
    });
}

SrStartListening() {
  let options = {
    language: 'es-CO'
  }
  this.speechRecognition.startListening().subscribe(matches => {
    //alert(matches[0]);
    this.datText = matches[0];
    this.cd.detectChanges();
  });
              //this.isRecording = true;
}

GetPermission() {
  this.speechRecognition.hasPermission()
  .then((hasPermission: boolean) => {
    if (!hasPermission) {
      this.speechRecognition.requestPermission();
    }
  });
}


private GetRespuestaCorrecta(stRIDTipoRespuesta: String)
{
  //console.log("Entra " + stRTipoREspuesta);
  //this.GetFunciones('-1','-1');
  this.loading.presentTxt('Oberón Obteniendo Respuesta Correcta...');
  this.SrBuscaRespuestaCorrecta(stRIDTipoRespuesta).then(data => {
  //console.log(data["Table"]);
  if(data["Table"] != null) {
    this.dataCorr=data["Table"][0];
    this.stLNovedad=this.dataCorr.CORRECTA;
    this.datText="";
    //console.log("Correcta " + this.stLNovedad);

  }
});
  this.loading.dismiss();
}

private SrBuscaRespuestaCorrecta(stRIDTipoRespuesta: String) {
  //this.loading.presentTxt('Oberón Obteniendo Minutas...');
  this.stLUrl = 'http://wsoberonvigilantes.azurewebsites.net/WsVigilantes.asmx/GetRespuesta_Correcta';
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  let params = 'stRID_Respuesta=' + stRIDTipoRespuesta + '&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
  console.log(params);
  return new Promise(resolve => {
  this.http.post(this.stLUrl,params,{headers: headers}).subscribe(data => {
    if(data.json()!=null){
      //console.log(data.json());
      //this.loading.dismiss();

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

private SrIngresarRegistro(stRIDRESP: string, stRObligaImagen: string)
{
  //console.log("Obliga " + stRObligaImagen);
  //console.log(this.stbase64Image);
  this.stLObligaImagen=stRObligaImagen;

  //this.GetFunciones('-1','-1');
  if(this.stLNovedad=="0")
  {
    if(this.datText!="" && this.stbase64Image!="")
    {
      this.loading.presentTxt('Oberón Ingresando Registro...');
      this.SrPut(stRIDRESP).then(data => {
      //console.log(data["Table"]);
      if(data["Table"] != null) {
          this.dataCorr=data["Table"];
          this.onSlideNext();
        }
      });
      this.loading.dismiss();
    }
    else{
      alert("Por favor ingrese todos los datos requeridos");
    }
  }
  else{

    if(this.stLObligaImagen=="1")
    {
      if(this.stbase64Image!="")
      {

        this.loading.presentTxt('Oberón Ingresando Registro...');
        this.SrPut(stRIDRESP).then(data => {
        //console.log(data["Table"]);
        if(data["Table"] != null) {
            this.dataCorr=data["Table"];
            this.onSlideNext();
          }
        });
        this.loading.dismiss();

      }
      else{
        alert("Por favor ingrese todos los datos requeridos");
      }
    }
    else{
      this.loading.presentTxt('Oberón Ingresando Registro...');
      this.SrPut(stRIDRESP).then(data => {
      //console.log(data["Table"]);
      if(data["Table"] != null) {
          this.dataCorr=data["Table"];
          this.onSlideNext();
        }
      });
      this.loading.dismiss();
    }

  }

}

private SrPut(stRIDRESP: string) {
  //this.loading.presentTxt('Oberón Obteniendo Minutas...');
  this.stLUrl = 'http://wsoberonvigilantes.azurewebsites.net/WsVigilantes.asmx/PutProyeccion_Respuesta';
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  let params = 'stRProyeccion_ID=' + stRIDRESP + '&stREmpleado_ID=' + this.loading.m_Empleado + '&stRRespuesta='+ this.stLTipoResp + '&stRFoto='+ this.stbase64Image +'&stRTexto='+ this.datText +'&stRLatitud='+ this.lat+'&stRLongitud='+ this.lng+'&stREstado=2&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
  console.log(params);
  return new Promise(resolve => {
  this.http.post(this.stLUrl,params,{headers: headers}).subscribe(data => {
    if(data.json()!=null){
      //console.log(data.json());
      //this.loading.dismiss();

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

}
