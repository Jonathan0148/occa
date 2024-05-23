import { OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { TranslateProvider } from '../../../providers';
import { ModalController } from '@ionic/angular';
import { NavParams, NavController, ToastController } from '@ionic/angular';
import { LoadingService } from '../../../loading.service';
import {Http, Headers} from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ChangeDetectorRef } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-mdetalle',
  templateUrl: './mdetalle.page.html',
  styleUrls: ['./mdetalle.page.scss'],
})
export class MdetallePage implements OnInit {
  @ViewChild(SignaturePad, {static: false}) signaturePad: SignaturePad;

  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'maxWidth': 1,
    'minWidth': 1,
    'canvasWidth': 350,
    'canvasHeight': 250
  };

  private stLUrl: string;
  private dataAux: any;
  private dataCat: any;
  private dataSubCat: any;
  private dataNov: any;
  private dataFirmas: any;
  private dataFunc: any;
  private stLRutaImg="../../assets/img/Funcion.png";
  private onDetalleForm: FormGroup;
  private TabPosition: string='0';
  private TabFirma: any=true;
  private stLColorTabAct: string='secondary';
  private stLColorTabInac: string='primary';
  private stLColorTab1: string;
  private stLColorTab2: string;
  private stLColorTab3: string;
  private stLTipo: string;
  private chKProveedor: any=false;
  private Proveedor: any=false;
  private stLProveedor: string;
  private lat: any;
  private lng: any;

  private chKCorreo: any=false;
  private Correo: any=false;
  private stLCorreo: string;

  private stLCategoria: string;
  private stLSubCategoria: string;
  private stLNovedad: string;
  private stbase64ImageAux: string="assets/img/img-icon3.png";
  private stbase64Image: string;
  private stbase64FirmaAux: string="assets/img/img-icon3.png";
  private stbase64Firma: string;
  private datText: string="";

  stRPto: string;
  stRATM: string;
  stRNombre: string;

  constructor(private translate: TranslateProvider,
    private nav: NavController,
    private modalCtrl: ModalController,
    private loading: LoadingService,
    private http: Http,
    private formBuilder: FormBuilder,
    private camera: Camera,
    private speechRecognition: SpeechRecognition,
    private cd: ChangeDetectorRef,
    private geolocation: Geolocation,
    private toastCtrl: ToastController,
    public navParams: NavParams
    ) {
      this.stLColorTab1=this.stLColorTabAct;
      this.stLColorTab2=this.stLColorTabInac;
      this.GetPermission();
      this.GetCurrentPosition();
      this.GetTipo();

      this.stRPto = navParams.get("stRPto");
      this.stRATM = navParams.get("stRATM");
      this.stRNombre = navParams.get("stRNombre");

      //this.stbase64ImageAux="assets/img/img-icon.png";
      //this.stbase64ImageAux="../../../../assets/img/Funcion.png";
      //this.stbase64ImageAux="../../../../assets/img/img-icon.jpg";
      //this.stbase64ImageAux="../../../assets/img/img-icon2.png";
    }

  ngOnInit() {
    this.onDetalleForm = this.formBuilder.group({
        'stLTipo': [null, Validators.compose([
          Validators.required
        ])
      ],
        'stLCategoria': [null, Validators.compose([
          Validators.required
        ])
      ],
      'stLSubCategoria': [null, Validators.compose([
        Validators.required
      ])
    ],

   'datText': [null, Validators.compose([
      Validators.required
   ])
   ],
   'signaturePad': [null, Validators.compose([
      //Validators.optional
   ])
   ],

   'stLProveedor': [null, Validators.compose([
      //Validators.optional
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

   'stbase64FirmaAux': [null, Validators.compose([
      //Validators.optional
   ])
   ],

    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  GetCurrentPosition(){
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

  private GetTipo()
  {
    //this.GetFunciones('-1','-1');
    this.loading.presentTxt('Oberón Obteniendo Tipos de Minuta ...');
    this.SrBuscaTipo().then(data => {
      //console.log(data["Table"]);
      if(data["Table"] != null) {
        this.dataAux=data["Table"];

      }
    });
    this.loading.dismiss();
  }

  private SrBuscaTipo() {

    this.stLUrl = this.loading.m_UrlWS + '/GetTipo_Novedad';
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let params = 'stRCodigo=-1&stRClienteID=-1&stREstado=1&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
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


  private GetCategoria(stRTipo: string)
  {
    //this.GetFunciones('-1','-1');
    this.loading.presentTxt('Oberón Obteniendo Categorías de Minuta ...');
    this.stLCategoria="";
    this.SrBuscaCategoria(stRTipo).then(data => {
      //console.log(data["Table"]);
      if(data["Table"] != null) {
        this.dataCat=data["Table"];

      }
    });
    this.loading.dismiss();

  }

  private SrBuscaCategoria(stRTipo: string) {

    this.stLUrl = this.loading.m_UrlWS +'/GetCategoria';
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let params = 'stRCodigo=-1&stRTipo_Novedad_ID=' + stRTipo + '&stREstado=1&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
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

        resolve(false);
      }
      });
    });

  }


  private GetSubCategoria(stRCategoria: string)
  {
    //this.GetFunciones('-1','-1');
    this.loading.presentTxt('Oberón Obteniendo SubCategorías de Minuta ...');
    this.TabFirma=true;
    this.chKProveedor=false;
    this.chKCorreo=false;
    this.stLSubCategoria="";
    this.SrBuscaSubCategoria(stRCategoria).then(data => {
      //console.log(data["Table"]);
      if(data["Table"] != null) {
        this.dataSubCat=data["Table"];
        //this.TabFirma=false;
      }
    });
    this.loading.dismiss();

  }

  private SrBuscaSubCategoria(stRCategoria: string) {

    this.stLUrl = this.loading.m_UrlWS +'/GetSubcategoria';
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let params = 'stRCodigo=-1&stRCategoria_ID=' + stRCategoria + '&stREstado=1&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
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

        resolve(false);
      }
      });
    });

  }


  private GetNovedad(stRSubCategoria: string)
  {
    //this.GetFunciones('-1','-1');
    this.loading.presentTxt('Oberón Obteniendo Novedades de Minuta ...');
    this.stLNovedad="";
    this.GetEstadoFirmas(stRSubCategoria, this.stLCategoria);
    this.SrBuscaNovedad(stRSubCategoria).then(data => {
      //console.log(data["Table"]);
      if(data["Table"] != null) {
        this.dataNov=data["Table"];

      }
    });
    this.loading.dismiss();

  }

  private SrBuscaNovedad(stRSubCategoria: string) {

    this.stLUrl = 'http://wsoberonvigilantes.azurewebsites.net/WsVigilantes.asmx/GetNovedad';
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let params = 'stRCodigo=-1&stRSubcategoria_ID=' + stRSubCategoria + '&stREstado=1&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
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
drawStart(){
  console.log("drawStart");
}
drawComplete(){
  this.stbase64FirmaAux = this.signaturePad.toDataURL();
  this.stbase64Firma = this.signaturePad.toDataURL();
  var stLFirmaBD = this.stbase64Firma.replace("data:image/png;base64,", "");
  this.stbase64Firma=stLFirmaBD;
  //console.log(this.stbase64FirmaAux);
  //console.log("Def:" + stLFirmaBD);
}
SrClear(){
  this.signaturePad.clear();
}

private GetEstadoFirmas(stRSubCategoria: string, stRCategoria: string)
{
  this.loading.presentTxt('Oberón Obteniendo Parámetros Firmas ...');
  this.SrBuscaEstadoFirmas(stRSubCategoria, stRCategoria).then(dataAux1 => {
    //console.log(dataAux1["Table"]);

    if(dataAux1["Table"] != null) {
      this.dataFirmas=dataAux1["Table"][0];
      if(this.dataFirmas.REQUIERE_FIRMA=="1")
      {
        this.TabFirma=false;
      }
      else{
        this.TabFirma=true;
      }

      //console.log("Proveedor " + this.dataFirmas.PROVEDOR);
      if(this.dataFirmas.PROVEDOR=="1")
      {
        this.chKProveedor=true;
      }
      else{
        this.chKProveedor=false;
      }

      this.Proveedor=true;

      if(this.dataFirmas.LISTA_DE_CORREO!="0")
      {
        this.chKCorreo=true;
      }
      else{
        this.chKCorreo=false;
      }
      this.Correo=true;

    }
  });
  this.loading.dismiss();

}

private SrBuscaEstadoFirmas(stRSubCategoria: string, stRCategoria: string) {

  this.stLUrl = 'http://wsoberonvigilantes.azurewebsites.net/WsVigilantes.asmx/GetEstadoFirma';
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  let params = 'stR_Sub_ID=' + stRSubCategoria + '&stR_Categoria_ID=' + stRCategoria + '&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
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

async presentToast(stRMensaje) {
  const toast = await this.toastCtrl.create({
    message: stRMensaje,
    duration: 4000
  });
  toast.present();
}

private SrProcesaIngreso(){
  this.loading.presentTxt('Oberón Guardando Ticket ...');
  this.SrIngresaMinuta().then(data => {
  if(data["Table"] != null) {
    this.dataNov=data["Table"];
    this.loading.dismiss();
//    console.log(data["Table"][0].RESP);
    if(data["Table"][0].RESP=='OK')
    {
      this.presentToast('Registro Guardado Satisfactoriamente');
      this.closeModal();
    }
    else{
      alert('Error al Guardar Minuta');
    }
  }
  else{
    this.loading.dismiss();
  }
});

}

private SrIngresaMinuta() {
  this.stLUrl = this.loading.m_UrlWS +'/setIngresaMinuta';
  //console.log(this.apiUrl);
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  let params = 'stRPunto=' + this.stRPto + '&stREmpleado='+ this.loading.m_Empleado +'&stRTipo=' + this.stLTipo +'&stRCategoria=' + this.stLCategoria +'&stRSubcategoria=' + this.stLSubCategoria + '&stRNoveda=&stRDescripcion=' + this.datText + '&stRFoto=' + this.stbase64Image + '&stRLat=' + this.lat + '&stRLon='+ this.lng + '&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
  //let params = 'stRPUESTOID='+ this.loading.m_Puesto +'&stREMPLEADOID='+ this.loading.m_Empleado +'&stRNOVEDAD=' + this.stLNovedad +'&stRDESCRIPCION=' + this.datText +'&stRFOTO=' + this.stbase64Image + '&stRLAT=' + this.lat +'&stRLON=' + this.lng + '&stRClienteID=' + this.loading.m_ClienteID + '&stRUbicacion='+ this.loading.m_UbicacionID + '&stRFirma='+ this.stbase64Firma + '&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
  console.log(params);

  return new Promise(resolve => {
  this.http.post(this.stLUrl,params,{headers: headers}).subscribe(data => {
  if(data.json()!=null){
    resolve(data.json());
  }
  else
    resolve(false);
  });
});

}

}
