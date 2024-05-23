import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, IonSlides, MenuController } from '@ionic/angular';
//import { NetworkService } from '../../network-service.service';
import { AlertController, ToastController } from '@ionic/angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LoadingService } from '../../loading.service';
import {Http, Headers} from '@angular/http';


@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.page.html',
  styleUrls: ['./walkthrough.page.scss'],
})

export class WalkthroughPage implements OnInit {
  @ViewChild(IonSlides, { static: true }) slides: IonSlides;
  showSkip = true;
  private isConnected: any = false;
  private stLConectado: string = "0";
  UniqueDeviceID:string;
  stLIMEI: string="";
  stLUrl: string;
  dataAux: any;
  dataAuxDet: any;
  stLEntra: string="0";
  slideOpts = {
    effect: 'flip',
    speed: 1000
  };
  dir: String = 'ltr';
  cont: number= 0;
  stLCargo: string="SUP";

  stLIDModulo: string="TGSI_OCCA_APP";
  stLUsuarioApp: string="OBOCCA";
  stLPasswordApp: string="iy/18sMdQ6mX2LGeDGfayvx0iRj1KEC2NwvuUKRqvMc=";
  stLCodigoWSApp: string ="TGSI_OCCA_APP";
  stLUrlWS: string ="http://wsthmobileoccadev.azurewebsites.net/supervisor/WsSupervision.asmx";


  slideList: Array<any> = [
    {
      title: 'Que es <strong><span class="text-tertiary">Oberón</span> 1.0.0.2</strong>?',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus, dui accumsan cursus lacinia, nisl risus.',
      image: 'assets/img/house01.png',
    },
    {
      title: 'Por qué es<strong><span class="text-tertiary"> Importante</span> La Seguridad Física</strong>?',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus, dui accumsan cursus lacinia, nisl risus.',
      image: 'assets/img/business01.png',
    },
    {
      title: '<strong>Por qué son importantes las Rondas</strong>',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus, dui accumsan cursus lacinia, nisl risus.',
      image: 'assets/img/rent01.png',
    }
  ];

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    private toastCtrl: ToastController,
    public alertController: AlertController,
    public router: Router,
    private uniqueDeviceID: UniqueDeviceID,
    private uid: Uid,
    private androidPermissions: AndroidPermissions,
    private http: Http,
    public loading: LoadingService
  ) {
    this.menuCtrl.enable(false);

    this.getImei();
    this.stLIMEI="352431100396804";
    this.getCapacitacion();

  }
  ngOnInit(){


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

    //alert(this.stLIMEI);
    return this.uid.IMEI;
  }

  private getCapacitacion()
  {

    this.loading.present();
    this.SrBuscaCapacitacion().then(data => {

              if(data["Table1"] != null) {
                this.stLEntra="1";
                this.dataAuxDet=data["Table1"];
                //console.log(this.dataAuxDet[1]["CAP_TITULO"]);
                //console.log(this.dataAuxDet[1]["CAP_MENSAJE"]);
                //console.log(this.dataAuxDet[1]["CAP_IMAGEN"]);
                //this.stLPuestoNom=this.dataAuxDet[0]["OPE_PTO_NOMBRE"];
                //console.log(this.dataAux[0]["OPE_PTO_NOMBRE"]);
                //console.log("Entra");
                //console.log(data["Table"]);
              }
        });
        this.loading.dismiss();

  }
  private SrBuscaCapacitacion() {
        this.stLUrl = this.stLUrlWS + '/GetCapacitaciones';
        //console.log(this.stLUrl);
        //this.apiUrl = 'http://192.168.0.5:14757/WSIdentificacion.asmx/Identificacion?stRFoto='+stRFotoAux;
        //let creds = JSON.stringify({stRFoto: this.stRFoto});
        //postData.append('stRFoto' , stRFotoAux);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let params = 'stRCliente=&stRCargo=' + this.stLCargo +'&stRUsuarioAPP=' + this.stLUsuarioApp +'&stRPasswordAPP='+ this.stLPasswordApp +'&stRCodigoWSAPP='+ this.stLCodigoWSApp +'&stRIMEI='+ this.stLIMEI;
        console.log(params);
        //let params='';
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
/*
  ngOnInit() {
    this.networkService.getNetworkStatus().subscribe((connected: boolean) => {
            this.isConnected = connected;
            if (!this.isConnected) {
                console.log('Por Favor Conectese al Internet ' + this.stLConectado);
                this.stLConectado="0";
                this.presentAlertConfirm();
            }
            else{
              console.log('Internet Conectado ' + this.stLConectado);
              this.stLConectado="1";

            }
     });
  }
*/
  async presentAlertConfirm() {
   const alert = await this.alertController.create({
     header: 'Estado de Internet',
     message: 'Por Favor Conecte el Dispositivo Oberón a Internet e Intente de Nuevo',
     buttons: [
       {
         text: 'Aceptar',
         role: 'aceptar',
         cssClass: 'secondary',
         handler: () => {
           navigator["app"].exitApp();
         }
       }
     ]
   });
   await alert.present();
}

  ionViewWillEnter() {
  }



  onSlideNext() {
    //console.log("Contador" + this.cont);


    this.slides.slideNext(1000, false);
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

  // onLastSlide() {
  // 	this.slides.slideTo(3, 300)
  // }

  openHomeLocation() {
    this.navCtrl.navigateRoot('/home-location');
    // this.router.navigateByUrl('/tabs/(home:home)');
  }

  openLoginPage() {
    this.navCtrl.navigateForward('/login');
  }

}
