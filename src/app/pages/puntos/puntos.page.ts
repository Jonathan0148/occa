import { Component, OnInit } from '@angular/core';
import { TranslateProvider } from '../../providers';
import { ModalController } from '@ionic/angular';
import { NavParams, NavController } from '@ionic/angular';
import { LoadingService } from '../../loading.service';
import {Http, Headers} from '@angular/http';
//import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { NfcPage } from './../puntos/nfc/nfc.page';


@Component({
  selector: 'app-puntos',
  templateUrl: './puntos.page.html',
  styleUrls: ['./puntos.page.scss'],
})
export class PuntosPage implements OnInit {

  private TabPosition: string='0';
  private stLColorTabAct: string='secondary';
  private stLColorTabInac: string='primary';
  private stLColorTab1: string;
  private stLColorTab2: string;
  private stLColorTab3: string;
  private stLRutaImgSA="../../assets/img/Tag_SA.png";
  private stLRutaImgASI="../../assets/img/Tag_ASIG.png";
  private stLRutaImgINSTALL="../../assets/img/Tag_INSTALL.png";

  private stLUrl: string;
  private dataAux: any;
  private dataAsignados: any;
  private dataInstalados: any;
  private dataAux1: any;

  constructor(private translate: TranslateProvider,
    private nav: NavController,
    private modalCtrl: ModalController,
    private loading: LoadingService,
    private http: Http) {
      this.stLColorTab1=this.stLColorTabAct;
      this.stLColorTab2=this.stLColorTabInac;
      this.stLColorTab3=this.stLColorTabInac;
      this.GetPuntosSinAsignar();

    }

  ngOnInit() {
    //console.log ("SIGLA " + )
  }

  SrOpenTab(stRTab: string){
    if(stRTab=="0")
    {
      this.stLColorTab1=this.stLColorTabAct;
      this.stLColorTab2=this.stLColorTabInac;
      this.stLColorTab3=this.stLColorTabInac;
      this.GetPuntosSinAsignar();
    }
    else if(stRTab=="1")
    {
      this.stLColorTab1=this.stLColorTabInac;
      this.stLColorTab2=this.stLColorTabAct;
      this.stLColorTab3=this.stLColorTabInac;
      this.GetPuntosAsignados();
    }
    else if(stRTab=="2")
    {
      this.stLColorTab1=this.stLColorTabInac;
      this.stLColorTab2=this.stLColorTabInac;
      this.stLColorTab3=this.stLColorTabAct;
      this.GetPuntosInstalados();
    }

    this.TabPosition=stRTab;
  }

  private GetPuntosSinAsignar()
  {
    //this.GetFunciones('-1','-1');
    this.SrBuscaPuntosSinAsignar().then(data => {
    //console.log(data["Table"]);
      if(data["Table"] != null) {
        this.dataAux=data["Table"];
      }
    });
  }
  private SrBuscaPuntosSinAsignar(){
    this.loading.presentTxt('Oberón Obteniendo Puntos SIN Asignar...');
    this.stLUrl =  this.loading.m_UrlWS +'/GetPuntos';
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //let params = 'stRPUN_ID=-1&stRPUN_TAG_ID=-1&stRPUN_INSTALADO=0&stRPUN_ASIGNADO=0&stRCliente=' + this.loading.m_ClienteID + '&stREMPLEADO=' + this.loading.m_Empleado + '&stRUBICACION='+ this.loading.m_UbicacionID + '&stRPUN_STATUS=1&stRSolicitud=0&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
    let params = 'stRPUN_ID=-1&stRPUN_TAG_ID=-1&stRPUN_INSTALADO=0&stRPUN_ASIGNADO=0&stRCliente=' + this.loading.m_ClienteID + '&stREMPLEADO=' + this.loading.m_Empleado + '&stRUBICACION='+ this.loading.m_UbicacionID + '&stRPUN_STATUS=1&stRSolicitud=0&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
    console.log(params);
    return new Promise(resolve => {
    this.http.post(this.stLUrl,params,{headers: headers}).subscribe(data => {
      if(data.json()!=null){
        //console.log(data.json());
        this.loading.dismiss();

         resolve(data.json());
      }
      else
      {
        this.loading.dismiss();
        resolve(false);
      }
      });
    });

  }


  private GetPuntosAsignados()
  {
    //this.GetFunciones('-1','-1');
    this.SrBuscaPuntosAsignados().then(data => {
    //console.log(data["Table"]);
      if(data["Table"] != null) {
        this.dataAsignados=data["Table"];
      }
    });
  }
  private SrBuscaPuntosAsignados(){
    this.loading.presentTxt('Oberón Obteniendo Puntos Asignados...');
    this.stLUrl =  this.loading.m_UrlWS +'/GetPuntos';
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let params = 'stRPUN_ID=-1&stRPUN_TAG_ID=-1&stRPUN_INSTALADO=0&stRPUN_ASIGNADO=1&stRCliente=' + this.loading.m_ClienteID + '&stREMPLEADO=' + this.loading.m_Empleado + '&stRUBICACION='+ this.loading.m_UbicacionID + '&stRPUN_STATUS=1&stRSolicitud=0&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
    //console.log(params);
    return new Promise(resolve => {
    this.http.post(this.stLUrl,params,{headers: headers}).subscribe(data => {
      if(data.json()!=null){
        //console.log(data.json());
        this.loading.dismiss();

         resolve(data.json());
      }
      else
      {
        this.loading.dismiss();
        resolve(false);
      }
      });
    });

  }

  private GetPuntosInstalados()
  {
    //this.GetFunciones('-1','-1');
    this.SrBuscaPuntosInstalados().then(data => {
    //console.log(data["Table"]);
      if(data["Table"] != null) {
        this.dataInstalados=data["Table"];
      }
    });
  }
  private SrBuscaPuntosInstalados(){
    this.loading.presentTxt('Oberón Obteniendo Puntos Instalados...');
    this.stLUrl =  this.loading.m_UrlWS +'/GetPuntos';
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //let params = 'stRPUN_ID=-1&stRPUN_TAG_ID=-1&stRPUN_INSTALADO=1&stRPUN_ASIGNADO=1&stRCliente=' + this.loading.m_ClienteID + '&stREMPLEADO=' + this.loading.m_Empleado + '&stRUBICACION='+ this.loading.m_UbicacionID + '&stRPUN_STATUS=1&stRSolicitud=0&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
    let params = 'stRPUN_ID=-1&stRPUN_TAG_ID=-1&stRPUN_INSTALADO=1&stRPUN_ASIGNADO=1&stRCliente=' + this.loading.m_ClienteID + '&stREMPLEADO=-1&stRUBICACION='+ this.loading.m_UbicacionID + '&stRPUN_STATUS=1&stRSolicitud=0&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
    //console.log(params);
    return new Promise(resolve => {
    this.http.post(this.stLUrl,params,{headers: headers}).subscribe(data => {
      if(data.json()!=null){
        //console.log(data.json());
        this.loading.dismiss();

         resolve(data.json());
      }
      else
      {
        this.loading.dismiss();
        resolve(false);
      }
      });
    });

  }

  async PresentNFC(stRIdPunto: string, stRConfiguracion: string, stRNomPunto: string) {
    //console.log(stREmpleado);
    const modal = await this.modalCtrl.create({
    component: NfcPage,
    componentProps: { stRIdPunto: stRIdPunto, stRConfiguracion: stRConfiguracion, stRNomPunto: stRNomPunto  }
    });
    modal.onDidDismiss()
    .then((data) => {
      if(stRConfiguracion=="ASIG")
      {
        this.GetPuntosSinAsignar();
      }
      if(stRConfiguracion=="INSTAL")
      {
        this.GetPuntosAsignados();
      }
      //this.getEmpleados();

  });
   return await modal.present();
  }

}
