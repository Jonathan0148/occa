import { OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { TranslateProvider } from '../../../providers';
import { ModalController } from '@ionic/angular';
import { NavParams, NavController, ToastController, IonSlides } from '@ionic/angular';
import { LoadingService } from '../../../loading.service';
import {Http, Headers} from '@angular/http';

@Component({
  selector: 'app-capdetalle',
  templateUrl: './capdetalle.page.html',
  styleUrls: ['./capdetalle.page.scss'],
})
export class CapdetallePage implements OnInit {
  @ViewChild(IonSlides, { static: true }) slides: IonSlides;
  private stLIdCap: string;
  private stLUrl: string;
  private dataAux: any;
  stLEntra: string="0";
  showSkip = false;
  slideOpts = {
    effect: 'flip',
    speed: 1000
  };
  dir: String = 'ltr';
  cont: number= 0;
  constructor(private translate: TranslateProvider,

    private nav: NavController,
    private modalCtrl: ModalController,
    private loading: LoadingService,
    public navParams: NavParams,
    private http: Http) {
      this.stLIdCap = navParams.get("stRIdCap");
      this.getCapacitacionDet(this.stLIdCap);
    }

  ngOnInit() {
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }

  private getCapacitacionDet(stRCapID: string)
  {
    this.loading.present();
    this.SrBuscaCapacitacionDet(stRCapID).then(data => {
    if(data["Table"] != null) {
      this.dataAux=data["Table"];
      this.stLEntra="1";
      //console.log(this.dataAux);
    }

    });
    this.loading.dismiss();
  }
  private SrBuscaCapacitacionDet(stRCapID: string) {
        this.stLUrl = 'http://wsoberonvigilantes.azurewebsites.net/WsVigilantes.asmx/GetCapacitacion_Detalle';
        //console.log(this.stLUrl);
        //this.apiUrl = 'http://192.168.0.5:14757/WSIdentificacion.asmx/Identificacion?stRFoto='+stRFotoAux;
        //let creds = JSON.stringify({stRFoto: this.stRFoto});
        //postData.append('stRFoto' , stRFotoAux);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let params = 'stRCodigo=-1&stRCodigoCAPID=' + stRCapID + '&stREstado=-1&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
        //let params = 'stRPuesto=' + this.loading.m_Puesto;
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

  onSlideNext() {
    console.log("Contador" + this.cont);


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
    this.nav.navigateForward('/capacitacion');
    // this.router.navigateByUrl('/tabs/(home:home)');
  }

  openLoginPage() {
    this.nav.navigateForward('/capacitacion');
  }

}
