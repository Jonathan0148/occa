import {Component, OnInit } from '@angular/core';
import {NavController, MenuController, LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import {TranslateProvider } from '../../providers';
import {LoadingService } from '../../loading.service';
import {Http, Headers} from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { environment } from '../../../environments/environment';
import { Platform, AlertController, ToastController } from '@ionic/angular';


import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';


@Component({
  selector: 'app-home-location',
  templateUrl: './home-location.page.html',
  styleUrls: ['./home-location.page.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(0,10px,0)` }), { optional: true }),
        query(':enter', stagger('300ms', [animate('600ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class HomeLocationPage {

  private lang: any;
  private enableNotifications: any;
  private paymentMethod: any;
  private currency: any;
  private onPwdForm: FormGroup;
  private enablePromo: any;
  private enableHistory: any;
  private passwordold: string;
  private password: string;
  private passwordConf: string;
  private dataAux: any;
  private apiUrl: string;

  constructor(
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private translate: TranslateProvider,
    private nav: NavController,
    private modalCtrl: ModalController,
    public loading: LoadingService,
    public http: Http,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    public alertController: AlertController
  ) {

  }

  ngOnInit() {
    this.onPwdForm = this.formBuilder.group({
      'passwordold': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])],
      'passwordConf': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  async presentToast(stRMensaje) {
    const toast = await this.toastCtrl.create({
    message: stRMensaje,
    duration: 2000
  });
  toast.present();
  }

  goChangePwd() {
    if(this.passwordold.length>0 && this.password.length>0 && this.passwordConf.length>0 && this.passwordConf==this.password)
    {
      this.SetCambiaPWD();
    }
    else{
        this.presentToast("Error: La Nueva Contraseña y la Contraseña NO Coninciden");
    }
  }
  private SetCambiaPWD()
  {
      this.loading.present();
      this.SrCambiaPWD().then(data => {
      if(data[0] != null) {
        this.dataAux=data[0];
        if(this.dataAux.Respuesta.length>0)
        {
          //console.log(this.dataAux.Respuesta);
          console.log(this.dataAux.Respuesta.substring(0,5));
          if(this.dataAux.Respuesta.substring(0,5)=="ERROR")
          {
            this.presentToast(this.dataAux.Respuesta);
          }
          else{
            this.presentToast("Contraseña Cambiada Satisfactoriamente");
            this.nav.navigateRoot('/');
          }
        }
        else{
          this.presentToast("Error: La Contraseña NO pudo ser cambiada");
        }
      }
      else{
        this.presentToast("Error: La Contraseña NO pudo ser cambiada");
      }
      this.loading.dismiss();
    });

  }
  private SrCambiaPWD() {
        this.apiUrl = this.loading.m_UrlWS +'/setChgPWD';
        //console.log(this.apiUrl);
        //this.apiUrl = 'http://192.168.0.5:14757/WSIdentificacion.asmx/Identificacion?stRFoto='+stRFotoAux;
        //let creds = JSON.stringify({stRFoto: this.stRFoto});
        //postData.append('stRFoto' , stRFotoAux);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let params = 'stEmpleadoID=' + this.loading.m_Empleado +'&stRPasswordold=' + this.passwordold +'&stRPasswordNew=' + this.password +'&stRPasswordConf=' + this.passwordConf +'&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
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
