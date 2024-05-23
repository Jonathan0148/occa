import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { TranslateProvider } from '../../providers';
import { LoadingService } from '../../loading.service';

import {Http, Headers} from '@angular/http';
import { Events } from '@ionic/angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;
  public m_stNombres: string;
  public email: string;
  public password: string;
  public apiUrl: string;
  private stLEstadoTurno: string="";
  dataAux: any;
  stLIDModulo: string="TGSI_OCCA_APP";
  stLUsuarioApp: string="OBOCCA";
  stLPasswordApp: string="iy/18sMdQ6mX2LGeDGfayvx0iRj1KEC2NwvuUKRqvMc=";
  stLCodigoWSApp: string ="TGSI_OCCA_APP";
  stLIMEI: string="";
  stLCargo: string="SUP";
  private stLPuestoID: string="";

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private translate: TranslateProvider,
    private formBuilder: FormBuilder,
    public loading: LoadingService,
    public http: Http,
    public events: Events,
    private uniqueDeviceID: UniqueDeviceID,
    private uid: Uid,
    private androidPermissions: AndroidPermissions
  ) {
    //this.m_IMEI=this.getImei();
    this.getImei();

   }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {

    this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }


  async getImei() {

   const { hasPermission } = await this.androidPermissions.checkPermission(
     this.androidPermissions.PERMISSION.READ_PHONE_STATE
   );

   if (!hasPermission) {
     const result = await this.androidPermissions.requestPermission(
       this.androidPermissions.PERMISSION.READ_PHONE_STATE
     );

     if (!result.hasPermission) {
       throw new Error('Permissions required');
     }

     // ok, a user gave us permission, we can get him identifiers after restart app

     return;
   }

    this.stLIMEI=this.uid.IMEI;

    return this.uid.IMEI;
  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: this.translate.get('app.pages.login.label.forgot'),
      message: this.translate.get('app.pages.login.text.forgot'),
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: this.translate.get('app.label.email')
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        
          handler: () => {
            //console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                showCloseButton: true,
                message: this.translate.get('app.pages.login.text.sended'),
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  // // //
  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }

  goToHome() {
    //this.navCtrl.navigateRoot('/home-results');
    //console.log("Entra" + this.email);
    this.SetValidaUsuario();
  }



  async presentToast(stRMensaje) {
       const toast = await this.toastCtrl.create({
         message: stRMensaje,
         duration: 4000
       });
       toast.present();
  }


  private GetSiglaModulo()
  {
      this.SrBuscaSigaModulo().then(data => {
      if(data["Table1"] != null) {
          this.dataAux=data["Table1"];
          if(this.dataAux.length>0)
          {
            this.loading.m_Sigla=this.dataAux[0].SAPP_SIGLA;

            //console.log("Sigla");
            //console.log(this.dataAux[0].SAPP_SIGLA);
          }
          else{
            this.presentToast("Error: Sigla NO Encontrada");
          }
      }
      else{
        this.presentToast("Error: Sigla NO Encontrada");
      }
    });

  }


  private SrBuscaSigaModulo() {
        this.apiUrl = this.loading.m_UrlWS + '/GetSiglaAPP';
        //console.log(this.apiUrl);
        //this.apiUrl = 'http://192.168.0.5:14757/WSIdentificacion.asmx/Identificacion?stRFoto='+stRFotoAux;
        //let creds = JSON.stringify({stRFoto: this.stRFoto});
        //postData.append('stRFoto' , stRFotoAux);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.loading.m_ModuloID=this.stLIDModulo;


        let params = 'stRIDAPP=' + this.stLIDModulo + '&stRUsuarioAPP=' + this.stLUsuarioApp +'&stRPasswordAPP='+ this.stLPasswordApp +'&stRCodigoWSAPP='+ this.stLCodigoWSApp +'&stRIMEI='+ this.stLIMEI;

        //alert("Parametros " + params);
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

  private SetValidaUsuario()
  {
      this.loading.present();
    this.SrValidaUsuario().then(data => {

              if(data["Table1"][0] != null) {
                this.dataAux=data["Table1"][0];
                if(this.dataAux.RESP=="OK")
                  {
                    this.loading.m_Empleado=this.dataAux.EMPL_IDEMPLEADO;
                    //this.loading.m_Puesto=this.dataAux.EMPTO_PUESTO;
                    this.loading.m_Apellidos=this.dataAux.EMPL_APELLIDOS;
                    this.loading.m_Nombres=this.dataAux.EMPL_NOMBRES;
                    this.loading.m_Cargo=this.dataAux.EMPL_CARGO;
                    //this.m_stNombres=this.loading.m_Nombres;
                    this.events.publish('user:created', this.dataAux.EMPL_NOMBRES, this.dataAux.EMPL_CARGO);
                    this.loading.m_UbicacionID=this.dataAux.EMPL_CIUDADOP;
                    this.loading.m_CiudadOP=this.dataAux.EMPL_CIUDADOP;

                    this.loading.m_Ubicacion=this.dataAux.NOMCIUDAD_OP;

                    this.loading.m_Cliente=this.dataAux.CLIE_NOMBRE;
                    this.loading.m_Cliente_Com=this.dataAux.CLIE_COMERCIAL;
                    //console.log("Entra " + this.loading.m_Cliente );
                    this.loading.m_ClienteID=this.dataAux.CLIE_ID_REG;
                    this.loading.m_NomPto=this.dataAux.COPTO_DESCRIPCION;
                    this.loading.m_CargoID=this.dataAux.CARGCON_ID;
                    this.SrProcesaInicioAsistencia(this.dataAux.EMPTO_PUESTO, this.dataAux.EMPL_APELLIDOS + ' ' + this.dataAux.EMPL_NOMBRES);
                    this.loading.m_Puesto=this.stLPuestoID;
                    //this.loading.m_Puesto=this.stLPuestoID;
                    //console.log ("Puesto " + this.loading.m_Puesto);
                    this.GetSiglaModulo();
                    //this.navCtrl.navigateRoot('/home-results');
                    //this.presentToast("Bienvenido: " + this.dataAux.EMPL_APELLIDOS + ' ' + this.dataAux.EMPL_NOMBRES);


                  }
                  else{
                    this.presentToast("Error: Empleado, Contraseña ó IMEI Invalido");
                  }
                }
                else{
                  this.presentToast("Error: Empleado, Contraseña ó IMEI Invalido");
                }


              this.loading.dismiss();
        });

  }


  private SrProcesaInicioAsistencia(stRPuesto: string, stRNombres: string){
    //this.loading.presentTxt('Oberón Obteniendo el Estado de la Asistencia...');
    //alert("Entra1");

    this.SrBuscaGetInicioAsistencia().then(data => {
      if(data["Table1"] != null) {
        //this.loading.dismiss();
        //this.dataNov=data["Table1"];
        //console.log(data["Table1"][0].RESP);
        if(data["Table1"]=="")
        {
            this.stLPuestoID=stRPuesto;
        }
        else{
          if(data["Table1"][0].Error_Code=="0")
          {
            this.stLEstadoTurno=data["Table1"][0].ESTADO_ASISTENCIA;


            if(this.stLEstadoTurno=="0")
            {
                this.stLPuestoID=stRPuesto;
            }

            if(this.stLEstadoTurno=="1")
            {
              let stLPto=data["Table1"][0].COPTO_DESCRIPCION.toString();
              this.stLPuestoID=data["Table1"][0].ASISTENCIA_IDPUESTO.toString();

            }

            if(this.stLEstadoTurno=="2")
            {
              let stLPto=data["Table1"][0].COPTO_DESCRIPCION.toString();
              this.stLPuestoID=data["Table1"][0].ASISTENCIA_IDPUESTO.toString();
              //this.stLPuesto=stLPto;
              //this.Disable=true;
              //this.ColorAsistencia="dark";
              //this.MensajeIdentifica="Empleado Identificado";
              //document.documentElement.style.setProperty("--colorbordimg", '#ffce00');
              //document.documentElement.style.setProperty("--colorletRec", '#000000');
            }

          }
        }
          this.loading.m_Puesto=this.stLPuestoID;
          console.log("prueba " + this.stLPuestoID);
          console.log("prueba1 " + this.loading.m_Puesto);
          this.navCtrl.navigateRoot('/home-results');
          this.presentToast("Bienvenido: " + stRNombres);
        //console.log("Puesto: " + stLPuesto);

      }
      else{
        //this.loading.dismiss();
        alert("ERROR: En la Consulta del Estado de Asistencia Inicio");
        //this.stLPuesto="SIN ASISTENCIA";
        //this.Disable=true;
        //this.ColorAsistencia="danger";
      }
    });
    //return stLPuesto;
  }

  private SrBuscaGetInicioAsistencia() {
    this.apiUrl = this.loading.m_UrlWS + '/GetEmpleadosAsistenciaActual';
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let params = 'stREmpleado=' + this.loading.m_Empleado + '&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
  //console.log(params);
    //alert(params);
    return new Promise(resolve => {
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
  private SrValidaUsuario() {
        this.apiUrl = this.loading.m_UrlWS + '/GetUserEmpleadosv2';
        //console.log(this.apiUrl);
        //this.apiUrl = 'http://192.168.0.5:14757/WSIdentificacion.asmx/Identificacion?stRFoto='+stRFotoAux;
        //let creds = JSON.stringify({stRFoto: this.stRFoto});
        //postData.append('stRFoto' , stRFotoAux);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.stLIMEI="352431100396804";

        this.loading.m_UsuarioApp=this.stLUsuarioApp;
        this.loading.m_PasswordApp=this.stLPasswordApp;
        this.loading.m_CodigoWSApp=this.stLCodigoWSApp;
        this.loading.m_IMEI=this.stLIMEI;
        //alert(this.stLIMEI);
        //let params = 'stRIDAPP=' + this.stLIDModulo + '&stRUsuarioAPP=' + this.stLUsuarioApp +'&stRPasswordAPP='+ this.stLPasswordApp +'&stRCodigoWSAPP='+ this.stLCodigoWSApp +'&stRIMEI='+ this.stLIMEI;

        let params = 'stREmpleadoIdentifica=' + this.email + '&stRCargo=' + this.stLCargo + '&stRPwd=' + this.password + '&stRUsuarioAPP=' + this.stLUsuarioApp +'&stRPasswordAPP='+ this.stLPasswordApp +'&stRCodigoWSAPP='+ this.stLCodigoWSApp +'&stRIMEI='+ this.stLIMEI;
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

}
