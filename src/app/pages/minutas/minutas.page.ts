import { Component, OnInit } from '@angular/core';
import { TranslateProvider } from '../../providers';
import { ModalController } from '@ionic/angular';
import { NavParams, NavController } from '@ionic/angular';
import { LoadingService } from '../../loading.service';
import {Http, Headers} from '@angular/http';
import { MdetallePage } from './../minutas/mdetalle/mdetalle.page';
import { ResumenPage } from './../minutas/resumen/resumen.page';

@Component({
  selector: 'app-minutas',
  templateUrl: './minutas.page.html',
  styleUrls: ['./minutas.page.scss'],
})
export class MinutasPage implements OnInit {

  private stLUrl: string;
  private dataAux: any;
  private dataFunc: any;
  private stLRutaImg="../../assets/img/Minutadet.png";
  private stbase64ImageAux="assets/img/Funcion.png";
  constructor(private translate: TranslateProvider,
    private nav: NavController,
    private modalCtrl: ModalController,
    private loading: LoadingService,
    private http: Http
    ) {
      this.GetMinutas();
    }

  ngOnInit() {
  }

  async PresentDetalle() {
    //console.log(stREmpleado);
    const modal = await this.modalCtrl.create({
    component: MdetallePage
    //componentProps: { stREmpleado: stREmpleado }
    });
    modal.onDidDismiss()
    .then((data) => {
      //this.getEmpleados();

  });
   return await modal.present();
  }

  async PresentResumen(stRIdMinuta: string) {
    //console.log(stREmpleado);
    const modal = await this.modalCtrl.create({
    component: ResumenPage,
    componentProps: { stRIdMinuta: stRIdMinuta }
    });
    modal.onDidDismiss()
    .then((data) => {
      //this.getEmpleados();

  });
   return await modal.present();
  }

  private GetMinutas()
  {
    //this.GetFunciones('-1','-1');
    this.loading.presentTxt('Oberón Obteniendo Minutas...');
    this.SrBuscaMinutas().then(data => {
    //console.log(data["Table"]);
    if(data["Table"] != null) {
      this.dataAux=data["Table"];
    }
  });
    this.loading.dismiss();
  }

  private SrBuscaMinutas() {
    //this.loading.presentTxt('Oberón Obteniendo Minutas...');
    this.stLUrl = 'http://wsoberonvigilantes.azurewebsites.net/WsVigilantes.asmx/GetMinuta';
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let params = 'stRFECHA=-1&stRCLIENTEID=' + this.loading.m_ClienteID + '&stRUBICACIONID='+ this.loading.m_UbicacionID + '&stRPUESTOID='+ this.loading.m_Puesto + '&stREstado=1&stRSolicitud=0&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
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

}
