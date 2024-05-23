import { Component, OnInit } from '@angular/core';
import { TranslateProvider } from '../../providers';
import { ModalController } from '@ionic/angular';
import { NavParams, NavController } from '@ionic/angular';
import { LoadingService } from '../../loading.service';
import {Http, Headers} from '@angular/http';
import { CallNumber } from '@ionic-native/call-number/ngx';


@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.page.html',
  styleUrls: ['./directorio.page.scss'],
})
export class DirectorioPage implements OnInit {
  private stLRutaImg="../../assets/img/Tel.png";
  private stLUrl: string;
  private dataAux: any;

  constructor(private translate: TranslateProvider,
    private nav: NavController,
    private modalCtrl: ModalController,
    private loading: LoadingService,
    private http: Http,
    private callNumber: CallNumber) { }

  ngOnInit() {
    this.getDirectorio();
  }

  private getDirectorio()
  {
    this.loading.present();
    this.SrBuscaDirectorio().then(data => {
    if(data["Table1"] != null) {
      this.dataAux=data["Table1"];
    }

    });
    this.loading.dismiss();
  }
  private SrBuscaDirectorio() {
        this.stLUrl =  this.loading.m_UrlWS + '/GetDirectorioCliente';
        //console.log(this.stLUrl);
        //this.apiUrl = 'http://192.168.0.5:14757/WSIdentificacion.asmx/Identificacion?stRFoto='+stRFotoAux;
        //let creds = JSON.stringify({stRFoto: this.stRFoto});
        //postData.append('stRFoto' , stRFotoAux);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let params = 'stREstado=1&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
        //let params = 'stRPuesto=' + this.loading.m_Puesto;
        //console.log(params);
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

  Srllamar(stRTelefono){
    this.callNumber.callNumber(stRTelefono, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

}
