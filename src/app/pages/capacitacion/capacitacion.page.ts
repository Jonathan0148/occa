import { Component, OnInit } from '@angular/core';
import { TranslateProvider } from '../../providers';
import { ModalController } from '@ionic/angular';
import { NavParams, NavController } from '@ionic/angular';
import { LoadingService } from '../../loading.service';
import {Http, Headers} from '@angular/http';
import { CapdetallePage } from './../capacitacion/capdetalle/capdetalle.page';


@Component({
  selector: 'app-capacitacion',
  templateUrl: './capacitacion.page.html',
  styleUrls: ['./capacitacion.page.scss'],
})
export class CapacitacionPage implements OnInit {
  private stLRutaImg="../../assets/img/Capacitacion.png";
  private stLUrl: string;
  private dataAux: any;

  constructor(private translate: TranslateProvider,
    private nav: NavController,
    private modalCtrl: ModalController,
    private loading: LoadingService,
    private http: Http) { }

    ngOnInit() {
      this.getCapacitacion();
    }

    async PresentDetalle(stRIdCap: string) {
      //console.log(stREmpleado);
      const modal = await this.modalCtrl.create({
      component: CapdetallePage,
      componentProps: { stRIdCap: stRIdCap }
      });
      modal.onDidDismiss()
      .then((data) => {
        //this.getEmpleados();

    });
     return await modal.present();
    }

    private getCapacitacion()
    {
      this.loading.present();
      this.SrBuscaCapacitacion().then(data => {
      if(data["Table"] != null) {
        this.dataAux=data["Table"];
      }

      });
      this.loading.dismiss();
    }
    private SrBuscaCapacitacion() {
          this.stLUrl = 'http://wsoberonvigilantes.azurewebsites.net/WsVigilantes.asmx/GetCapacitacion';
          //console.log(this.stLUrl);
          //this.apiUrl = 'http://192.168.0.5:14757/WSIdentificacion.asmx/Identificacion?stRFoto='+stRFotoAux;
          //let creds = JSON.stringify({stRFoto: this.stRFoto});
          //postData.append('stRFoto' , stRFotoAux);
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');

          let params = 'stRCodigo=-1&stRCliente=' + this.loading.m_ClienteID + '&stREstado=-1&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
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


}
