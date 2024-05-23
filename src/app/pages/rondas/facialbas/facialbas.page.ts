import { Component, OnInit } from '@angular/core';
import { TranslateProvider } from '../../../providers';
import { ModalController } from '@ionic/angular';
import { NavParams, NavController } from '@ionic/angular';
import { LoadingService } from '../../../loading.service';
import {Http, Headers} from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-facialbas',
  templateUrl: './facialbas.page.html',
  styleUrls: ['./facialbas.page.scss'],
})
export class FacialbasPage implements OnInit {
  public stbase64ImageAux: string;
  public stbase64Image: string;
  public stLUrl: string;

  public stLFoto: string;
  public stLEdad: string;
  public stLGenero: string;
  public stLGafas: string;
  public stLPostura: string;
  private stLIdentical: string;
  private stLEmpleado: string;
  private stLEstadoTurno: string="";
  public stLIracundo: Number;
  public stLArrogante: Number;
  public stLDesagrado: Number;
  public stLMiedo: Number;
  public inLPostura: Number;
  public stLFelicidad: Number;
  public stLNeutral: Number;
  public stLTristeza: Number;
  public stLSorpresa: Number;
  private inLConfidence: Number;
  private inLGuardar: string;
  private stLPuesto: string;
  //private onReconocimientoForm: FormGroup;
  private stLColorTabAct: string='secondary';
  private stLColorTabInac: string='primary';
  private stLColorTab1: string;
  private stLColorTab2: string;

  private lat: any;
  private lng: any;
  private dataNov: any;
  private dataAux: any;

  private MensajeIdentifica: string;
  private ColorAsistencia: string;
  private ColorLetAsistencia: string;
  private TabPosition: string='0';
  private Disable: any=false;
  private stLAutenticado: string;



  constructor( private loading: LoadingService,
    private nav: NavController,
    private modalCtrl: ModalController,
    private camera: Camera,
    private http: Http,
    private geolocation: Geolocation,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private route: ActivatedRoute) {
      //this.stbase64ImageAux="assets/img/img-icon.png";
      this.http = http;
      this.stLFoto="1";
      this.stLIracundo=0;
      this.stLArrogante=0;
      this.stLDesagrado=0;
      this.stLMiedo=0;
      this.stLFelicidad=0;
      this.stLNeutral=0;
      this.stLTristeza=0;
      this.stLSorpresa=0;
      this.stLGenero="";
      this.stLEdad="";
      this.stLGafas="";
      this.stLPostura="";
      this.inLPostura=0;
      this.stLIdentical="";
      this.inLConfidence=0;
      this.ColorAsistencia="danger";
      document.documentElement.style.setProperty("--colorbordimg", '#f04141');
      document.documentElement.style.setProperty("--colorletRec", '#ffffff');
      this.ColorLetAsistencia="dark";
      this.inLGuardar="0";
      this.stbase64ImageAux="assets/img/img-icon.jpg";
      this.getCurrentPosition();
      //this.getPuestosCliente();
      this.stLColorTab1=this.stLColorTabAct;
      this.stLColorTab2=this.stLColorTabInac;
      //this.stLEmpleado=this.route.snapshot.paramMap.get('EmpleadoId');
      this.stLEmpleado = navParams.get("stREmpleado");
      //this.nav.navigateRoot('/home-results');
      //this.nav.navigateForward('/home-results');
      //console.log("Param:" + this.stLEmpleado);
    }



  ngOnInit() {

    //this.loading.presentTxt('Oberón Obteniendo el Estado de la Asistencia...');
    //this.SrProcesaInicioAsistencia();
    //this.loading.dismiss();


  }
  myDismiss() {
      this.modalCtrl.dismiss(this.stbase64Image);
    }


  closeModal() {
    this.modalCtrl.dismiss("0");
  }



  SrOpenTab(stRTab: string){
    if(stRTab=="0")
    {
      this.stLColorTab1=this.stLColorTabAct;
      this.stLColorTab2=this.stLColorTabInac;
    }
    else{
      if(stRTab=="1")
      {
        this.stLColorTab1=this.stLColorTabInac;
        this.stLColorTab2=this.stLColorTabAct;
      }
    }
    this.TabPosition=stRTab;
  }
  getCurrentPosition(){
    this.geolocation.getCurrentPosition()
    .then(position => {

    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;

    });
  }





  private getidentificador(stRFoto) {
      this.stLUrl =  this.loading.m_UrlWS +'/Reconocimiento_Emociones';
      //alert(stRFoto);
      let params = 'stRFoto=' + stRFoto + '&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      //let params = 'stRFoto=' + stRFoto;
      return new Promise(resolve => {
          //this.http.post('http://192.168.3.8:1368/icwebmobile/consulta_puestos.php', creds, {headers: headers})
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


  private SrCapturarFoto(){
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType:this.camera.PictureSourceType.CAMERA,
      //cameraDirection: this.camera.Direction.FRONT,
      quality: 70,
      //targetWidth: 90,
      //targetHeight: 90,
      saveToPhotoAlbum: false
    }).then((imageData) => {
      this.stbase64ImageAux = "data:image/jpeg;base64," + imageData;
      this.stbase64Image = imageData;
      //this.loading.presentTxt('Oberón Identificando Emociones...');
      //this.getidentificador(this.stbase64Image).then(data => {
        //alert(data[0].faceAttributes.age);
      /*
      if(data[0] != null) {
        //console.log(data[0].faceAttributes.emotion.neutral);
        this.stLEdad=data[0].faceAttributes.age;
        this.stLGenero=data[0].faceAttributes.gender;
        this.stLGafas=data[0].faceAttributes.glasses;
        this.stLIracundo=Number(data[0].faceAttributes.emotion.anger)*100;
        this.stLArrogante=Number(data[0].faceAttributes.emotion.contempt)*100;
        this.stLDesagrado=Number(data[0].faceAttributes.emotion.disgust)*100;
        this.stLMiedo=Number(data[0].faceAttributes.emotion.fear)*100;
        this.stLFelicidad=Number(data[0].faceAttributes.emotion.happiness)*100;
        this.stLNeutral=Number(data[0].faceAttributes.emotion.neutral)*100;
        this.stLTristeza=Number(data[0].faceAttributes.emotion.sadness)*100;
        this.stLSorpresa=Number(data[0].faceAttributes.emotion.surprise)*100;
        this.inLPostura=Number(data[0].faceAttributes.exposure.value)*100;
        this.stLPostura=data[0].faceAttributes.exposure.exposureLevel;
        this.loading.dismiss();
        //this.loading.presentTxt('Oberón Verificando Empleado...');
        */
        //
        //
        this.loading.presentTxt('Oberón Verificando Empleado...');
        this.SrVerificaPersona(this.stbase64Image).then(data => {
          this.loading.dismiss();
          if(data["isIdentical"] != null) {
            //console.log(data["isIdentical"]);
            this.stLIdentical=data["isIdentical"];
            this.inLConfidence=Number(data["confidence"])*100;
            if(data["isIdentical"]=="1")
            {

              this.stLAutenticado="1";
              this.myDismiss();
              //this.SrProcesaEstadoTurno();
              //this.loading.dismiss();


            }
            else{
              //this.ColorAsistencia="danger";
              //this.ColorLetAsistencia="light";
              alert("Empleado NO Identificado");
              this.MensajeIdentifica="Empleado NO Identificado";
              this.inLGuardar="0";
            }

          }
          else{
            console.log('Error');
            alert("Empleado NO Identificado");
            this.MensajeIdentifica="Empleado NO Identificado";
            //this.ColorAsistencia="danger";
            //this.ColorLetAsistencia="light";
            this.stLIdentical="Error";
            //this.loading.dismiss();
            this.inLGuardar="0";
          }
        });
        //
        //this.loading.dismiss();

    //}

    }, (err) => {
      this.loading.dismiss();
    this.ColorAsistencia="danger";
    this.ColorLetAsistencia="light";
    alert("Empleado NO Identificado");
    this.MensajeIdentifica="Empleado NO Identificado";
    this.stLIdentical="Error";
    console.log(err);
    //});
  });

}




private SrVerificaPersona(stRFoto) {

  this.stLUrl =  this.loading.m_UrlWS +'/Verificacion_Personal';
  console.log(this.stLUrl);
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  let params = 'stRFoto=' + stRFoto +'&stREmpleado=' + this.loading.m_Empleado + '&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
  //alert(params);
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



async presentToast(stRMensaje){
  const toast = await this.toastCtrl.create({
  message: stRMensaje,
  duration: 4000
  });
  toast.present();
}










}
