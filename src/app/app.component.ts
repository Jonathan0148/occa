import { Component } from '@angular/core';
// import { Router } from '@angular/router';

import { Platform, MenuController } from '@ionic/angular';
import { AlertController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { TranslateProvider } from './providers/translate/translate.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { LoadingService } from './loading.service';
import { Events } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
//import { NetworkService } from './network-service.service';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';

import { Pages } from './interfaces/pages';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import {Http, Headers} from '@angular/http';
//import { LoadingService } from '../../loading.service';

declare var window;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isConnected: any = false;
  public appPages: Array<Pages>;
  public m_stNombres: string;
  public m_stCargo: string;
  private m_EstadoGPS: any = false;
  private lat: any
  private lon: any;
  private velocidad: any;
  private hora: any;
  private stLUrl: string;
  arr: any;

  stLIDModulo: string="TGSI_OCCA_APP";
  stLUsuarioApp: string="OBOCCA";
  stLPasswordApp: string="iy/18sMdQ6mX2LGeDGfayvx0iRj1KEC2NwvuUKRqvMc=";
  stLCodigoWSApp: string ="TGSI_OCCA_APP";
  stLIMEI: string="";
  stLUrlWS: string ="http://wsoberonocca.azurewebsites.net/WsOCCA.asmx";
  constructor(
    private platform: Platform,
    private menu: MenuController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateProvider,
    private translateService: TranslateService,
    public events: Events,
    private network: Network,
    private backgroundGeolocation: BackgroundGeolocation,
    private diagnostic: Diagnostic,
    private http: Http,
    public loading: LoadingService

    //private networkService: NetworkService,


    // public router: Router
  ) {
    this.appPages = [
      {
        title: 'Home',
        url: '/home-results',
        direct: 'root',
        icon: 'home'
      },
      {
        title: 'Cambiar Contraseña',
        url: '/home-location',
        direct: 'forward',
        icon: 'cog'
      },
      {
        title: 'Acerca de',
        url: '/messages',
        direct: 'forward',
        icon: 'information-circle-outline'
      },
      //
      //{
      //  title: 'Properties',
      //  url: '/property-list',
      //  direct: 'forward',
      //  icon: 'home'
      //},

      {
        title: 'Cerrar Sesión',
        url: '/login',
        direct: 'root',
        icon: 'log-out'
      }

    ];
    this.arr = [];
    this.initializeApp();
    events.subscribe('user:created', (user, cargo) => {
    // user and time are the same arguments passed in `events.publish(user, time)`
      this.m_stNombres=user;
      this.m_stCargo=cargo;
    //console.log('Welcome', user);
    });
    }





  initializeApp() {
    this.platform.ready().then(() => {
      //this.OnCheckInternet();
      //if(this.stLConectado=="1")
      //{

        this.statusBar.styleDefault();
        setTimeout(() => {
          this.splashScreen.hide();
        }, 1000);
        // this.splashScreen.hide();



        // Set language of the app.
        this.translateService.setDefaultLang(environment.language);
        this.translateService.use(environment.language);
        this.translateService.getTranslation(environment.language).subscribe(translations => {
          this.translate.setTranslations(translations);
        });
        //this.checkNetwork();
        if (this.checkNetwork()) {
        // This will call when network avaiable
          console.log("Tiene Internet");

          if(this.checkLocation()){
                const config: BackgroundGeolocationConfig = {
                  desiredAccuracy: 10,
                  stationaryRadius: 20,
                  distanceFilter: 30,
                  debug: false, //  enable this hear sounds for background-geolocation life-cycle.
                  stopOnTerminate: false, // enable this to clear background location settings when the app terminates
                  notificationTitle: 'Oberón OCCA V2',
                  notificationText: 'enabled',

              };

              this.backgroundGeolocation.configure(config)
              .then(() => {
                this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
                console.log(location);
                var locationstr= localStorage.getItem("location");
                if(locationstr==null)
                {
                  this.arr.push(location);
                }
                else{
                  if (location.speed == undefined) {
                    location.speed = 0;
                  }

                  //let timestamp = new Date(location.time);
                  alert(location.latitude);
                  let timestamp = new Date(location.time);
                  this.lat=location.latitude;
                  this.lon=location.longitude;
                  this.velocidad=location.speed;
                  this.hora=timestamp;
                  //this.presentToast("Velocidad" + location.speed);
                  this.SrIngresaGPS();
                  //var locationarr = JSON.parse(locationstr);
                  //this.arr= locationstr;
                }
                //localStorage.setItem("location", JSON.stringify(this.arr));

                  // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
                  // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
                  // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
                //this.backgroundGeolocation.finish(); // FOR IOS ONLY
              });

            });
            window.app= this;
          }
          else {
           // This will call when network is not available
            alert("El Dispositivo Oberón NO tiene GPS Activo. Por Favor Activelo");
            navigator['app'].exitApp();
          }
        }
        else {
         // This will call when network is not available
          alert("El Dispositivo Oberón NO tiene Internet. Por Favor Conectese a Internet");
          navigator['app'].exitApp();
        }



      //}
      //else{
      //  this.presentAlertConfirm();
      //}
      }).catch(() => {
        // Set language of the app.
        this.translateService.setDefaultLang(environment.language);
        this.translateService.use(environment.language);
        this.translateService.getTranslation(environment.language).subscribe(translations => {
          this.translate.setTranslations(translations);
        });

       });

  }

  checkLocation() {
    let successCallback = (isAvailable) => { this.m_EstadoGPS=isAvailable; }
    let errorCallback = (e) => console.error(e);
    this.diagnostic.isLocationEnabled().then(successCallback).catch(errorCallback);
    //return this.m_EstadoGPS;
    return true;
   }
  checkNetwork() {
    if (this.network.type != "none") {
        return true;
    }
    else {
        return false;
    }
  }

  closeMenu() {
    this.menu.close();
  }

  private SrIngresaGPS() {
      this.stLUrl = this.stLUrlWS + '/setGPS';

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');


      let params = 'inRvelocidad='+ this.velocidad +'&stRLat=' + this.lat +'&stRLon=' + this.lon + '&stREmpleadoID=' + this.loading.m_Empleado +'&stRUsuarioAPP=' + this.stLUsuarioApp +'&stRPasswordAPP='+ this.stLPasswordApp +'&stRCodigoWSAPP='+ this.stLCodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
      //alert(params);
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


  // goToEditProgile() {
  //   this.router.navigateByUrl('/edit-profile');
  // }

  // logout() {
  //   this.router.navigateByUrl('/login');
  // }
}
