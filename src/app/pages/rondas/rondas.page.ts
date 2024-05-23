import { Component, OnInit } from '@angular/core';
import { TranslateProvider } from '../../providers';
import { ModalController } from '@ionic/angular';
import { NavParams, NavController } from '@ionic/angular';
import { LoadingService } from '../../loading.service';
import {Http, Headers} from '@angular/http';
import { Platform, AlertController, ToastController } from '@ionic/angular';
//import { RonpuntosPage } from './../rondas/ronpuntos/ronpuntos.page';
import { VerreqPage } from './../rondas/verreq/verreq.page';
import { FacialbasPage } from './../rondas/facialbas/facialbas.page';

import { BaseptoPage } from './../rondas/basepto/basepto.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
//import { GooglerPage } from './../../modal/googler/googler.page';

@Component({
  selector: 'app-rondas',
  templateUrl: './rondas.page.html',
  styleUrls: ['./rondas.page.scss'],
})
export class RondasPage implements OnInit {
  private stLRutaImg="../../assets/img/";
  private stLUrl: string;
  private dataAux: any;

  tagId: string;
  tagMsg: string;
  public apiUrl: string;
  dataAux1: any;
  stLNomPunto: string;
  stLColor: string;
  stLLink: string;
  dataNov: any;
  myListener: any;
  stLEmpleado: string;
  stLPuntoID: string;
  stLATM: string;
  stLFoto: string;
  lat: any;
  lng: any;
  stLAsistenciaActiva: any;

  constructor(private translate: TranslateProvider,
    private nav: NavController,
    private modalCtrl: ModalController,
    private loading: LoadingService,
    public platform: Platform,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private geolocation: Geolocation,

    private http: Http) {
      this.getPuntosRonda();
     }

  ngOnInit() {
    this.GetCurrentPosition();
  }

GetCurrentPosition(){
  this.geolocation.getCurrentPosition()
  .then(position => {

    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;

  });
}

async presentToast(stRMensaje) {
  const toast = await this.toastCtrl.create({
  message: stRMensaje,
  duration: 4000
  });
  toast.present();
}


  private getPuntosRonda()
{
  this.loading.present();
  this.SrBuscaPuntoRonda().then(data => {

    if(data["Table"] != null) {
      this.dataAux=data["Table"];
      //console.log(data);
            }
    });
    this.loading.dismiss();
}
private SrBuscaPuntoRonda() {
  this.stLUrl = this.loading.m_UrlWS + '/GetdataRutaOCCA';
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  let params = 'stREmpleadoAsig=' + this.loading.m_Empleado +'&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
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


async presentAccesos(stRPuntoID, stRATM, stRNomPunto, stREstado) {

  if(stREstado=="0" || stREstado=="2")
  {
    //if(this.SrAsistenciaActiva()==true)
    //{
    this.presentfacialbas(stRPuntoID, stRATM, stRNomPunto, stREstado)
    //}
    //else{
    //  this.presentToast('Advertencia: Debe Abrir su Turno de Trabajo para Acceder al ATM');
    //}
  }
  if(stREstado=="1")
  {
    this.presentbasepto(stRPuntoID, stRATM, stRNomPunto)
  }

}


private SrProcesaActualiza(){
  this.loading.present();
  this.SrActualizaRonda().then(data => {
    if(data["Table"] != null) {
      this.dataNov=data["Table"];
      //console.log(data["Table"][0].RESP);
      if(data["Table"][0].RESP=='OK')
      {
        this.presentToast('Inicia Operación');
        this.getPuntosRonda();
        //this.closeModal();
      }
      else{
        this.presentToast('Error al Iniciar Operación');
      }
    }
  });
  this.loading.dismiss();
}

private SrActualizaRonda() {
  this.apiUrl = this.loading.m_UrlWS +'/setActualizaAccessATM';
  //console.log(this.apiUrl);
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //console.log(this.m_puesto);
  let params = 'stRPuntoID=' +this.stLPuntoID +'&stREmpleadoASIG='+ this.loading.m_Empleado +'&stRFoto='+ this.stLFoto +'&stRLat='+ this.lat +'&stRLon='+ this.lng +'&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;;
  //let params='';
  //console.log(params);
  return new Promise(resolve => {
    this.http.post(this.apiUrl,params,{headers: headers}).subscribe(data => {
    if(data.json()!=null){
      resolve(data.json());
    }
    else
      resolve(false);
    });
  });
}


async presentfacialbas(stRPuntoID: string, stRATM: string, stRNomPunto: string, stREstado: string) {
  this.stLPuntoID=stRPuntoID;
  this.stLATM=stRATM;
  this.stLNomPunto=stRNomPunto;
  this.stLEmpleado=this.loading.m_Empleado;

  const modal = await this.modalCtrl.create({
    component: FacialbasPage,
    componentProps: { stREmpleado: this.stLEmpleado }
  });
  modal.onDidDismiss()
  .then((data) => {
     //console.log("foto");
     this.stLFoto=data.data;
     //console.log(this.stLFoto.length);
     if(this.stLFoto.length>1)
     {

       this.presentToast('Bienvenido al ATM: ' + this.stLATM + ' - ' + this.stLNomPunto);
       this.stLLink="En Operación";
       this.stLColor="warning";
       this.SrProcesaActualiza();

     }
     else{
       this.presentToast('Error: Empleado no Valido');
     }

 });

  return await modal.present();
}


async presentbasepto(stRPto: string,stRATM: string, stRNombre: string) {
  const modal = await this.modalCtrl.create({
  component: BaseptoPage,
  componentProps: { stRPto: stRPto, stRNombre: stRNombre, stRATM: stRATM }
  });
  modal.onDidDismiss()
   .then((data) => {
     this.getPuntosRonda();
 });

  return await modal.present();
}



PresentWaze(stRLat: string, stRLon: string, stRNombre: string, stREstado: string, stRPtoID: string)
{
  //if(stREstado=='1')
  //{
    console.log('waze' + stRLat)
    let destination = stRLat + ',' + stRLon;

      if(this.platform.is('ios')){
        window.open('maps://?q=' + destination, '_system');
      } else {
        let label = encodeURI(stRNombre);
        window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
      }
  //}
  //else{
  //  if(stREstado=='1')
  //  {
  //    this.presentbasepto(stRPtoID, stRNombre, stRTAGID);
  //  }
  //}
}

  async PresentVerreq(stRPto: string, stRATM: string, stRNombre: string) {
    //console.log(stREmpleado);
    const modal = await this.modalCtrl.create({
    component: VerreqPage,
    componentProps: { stRPto: stRPto, stRATM: stRATM, stRNombre: stRNombre, stRNOAccion: "1" }
    });
    modal.onDidDismiss()
    .then((data) => {
      this.getPuntosRonda();

  });
   return await modal.present();
  }

}
