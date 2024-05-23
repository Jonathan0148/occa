import { Component, OnInit } from '@angular/core';
import { TranslateProvider } from '../../../providers';
import { ModalController } from '@ionic/angular';
import { NavParams, NavController } from '@ionic/angular';
import { LoadingService } from '../../../loading.service';
import {Http, Headers} from '@angular/http';
import { ReconocimientoPage } from './../../asistencia/empleados/reconocimiento/reconocimiento.page';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {
  //private stLRutaImg="../../../assets/img/EmpNA.png";
  private stLRutaImg="";
  private stLUrl: string;
  private dataAux: any;
  private searchKey: string;
  private stLEstado: string;
  private stLInfo: string;

  constructor(private translate: TranslateProvider,
    private nav: NavController,
    private modalCtrl: ModalController,
    private loading: LoadingService,
    private http: Http)  {


   }

   ngOnInit() {
     this.getEmpleados();
     //alert("Entra Inicio");
   }

  async PresentReconocimiento(stREmpleado) {
    //console.log(stREmpleado);
    const modal = await this.modalCtrl.create({
    component: ReconocimientoPage,
    componentProps: { stREmpleado: stREmpleado }
    });
    modal.onDidDismiss()
    .then((data) => {
      //this.getEmpleados();
      let valor = data['data'];
      //console.log("valor: " + valor);
      if(valor=="1")
      {
        this.nav.navigateRoot('/home-results');
      }
      else if(valor=="0")
      {
        this.getEmpleados();
      }
  });
   return await modal.present();
  }

   private getEmpleados()
   {
     this.loading.present();
     this.SrBuscaEmpleados().then(data => {
     if(data["Table1"] != null) {
       this.dataAux=data["Table1"];
       this.stLEstado=this.dataAux[0].Estado;
       if (this.stLEstado=="0") {
         this.stLInfo=this.dataAux[0].Info;
       }
       //this.SrProcesaEstadoTurno(this.dataAux[0].EMPL_IDEMPLEADO);

     }

     });
     this.loading.dismiss();
   }
   private SrBuscaEmpleados() {
         this.stLUrl = this.loading.m_UrlWS + '/GetEmpleados';
         //console.log(this.stLUrl);
         //this.apiUrl = 'http://192.168.0.5:14757/WSIdentificacion.asmx/Identificacion?stRFoto='+stRFotoAux;
         //let creds = JSON.stringify({stRFoto: this.stRFoto});
         //postData.append('stRFoto' , stRFotoAux);
         let headers = new Headers();
         headers.append('Content-Type', 'application/x-www-form-urlencoded');

         let params = 'stREmpleado=' + this.loading.m_Empleado + '&stRCiudadOP=' + this.loading.m_CiudadOP + '&stRCargoCod=' + this.loading.m_CargoID + '&stRBusqueda=0&stRNomBusq=NULL&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
         //let params = 'stRPuesto=' + this.loading.m_Puesto;
         //console.log('Entra: ' + params);
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

   private GetEmplBusqueda()
   {
     this.loading.present();
     this.SrBuscaEmpleadosBusq().then(data => {
     if(data["Table1"] != null) {
       this.dataAux=data["Table1"];
       //this.SrProcesaEstadoTurno(this.dataAux[0].EMPL_IDEMPLEADO);
       //console.log("Estado bUSQ: " + this.dataAux[0].Estado);
        this.stLEstado=this.dataAux[0].Estado;
        if (this.stLEstado=="0") {
          this.stLInfo=this.dataAux[0].Info;
        }
     }

     });
     this.loading.dismiss();
   }
   private SrBuscaEmpleadosBusq() {
         this.stLUrl = this.loading.m_UrlWS + '/GetEmpleados';
         //console.log(this.stLUrl);
         //this.apiUrl = 'http://192.168.0.5:14757/WSIdentificacion.asmx/Identificacion?stRFoto='+stRFotoAux;
         //let creds = JSON.stringify({stRFoto: this.stRFoto});
         //postData.append('stRFoto' , stRFotoAux);
         let headers = new Headers();
         headers.append('Content-Type', 'application/x-www-form-urlencoded');

         let params = 'stREmpleado=' + this.loading.m_Empleado + '&stRCiudadOP=' + this.loading.m_CiudadOP + '&stRCargoCod=' + this.loading.m_CargoID + '&stRBusqueda=1&stRNomBusq='+ this.searchKey + '&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
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
