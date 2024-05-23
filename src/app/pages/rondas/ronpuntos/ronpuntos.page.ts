import { OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { TranslateProvider } from '../../../providers';
import { Platform, ModalController } from '@ionic/angular';
import { NavParams, NavController, ToastController, AlertController } from '@ionic/angular';
import { LoadingService } from '../../../loading.service';
import {Http, Headers} from '@angular/http';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PreguntasPage } from './../../rondas/preguntas/preguntas.page';

@Component({
  selector: 'app-ronpuntos',
  templateUrl: './ronpuntos.page.html',
  styleUrls: ['./ronpuntos.page.scss'],
})
export class RonpuntosPage implements OnInit {
  private tagId: string;
  private tagMsg: string;
  private dataNov: any;
  private myListener: any;
  private stLUrl: string;
  private dataAux: any;
  private dataTAG: any;
  private lat: any;
  private lng: any;
  private stLIdRondaProy: string;
  private stLNomRonda: string;
  private stLFecRonda: string;
  private stLIdProyec: string;
  private stLTitulo: string;
  private stLRondaPuntos: string;
  private stLRutaImg="assets/img/";
  constructor(private translate: TranslateProvider,
    private nav: NavController,
    private modalCtrl: ModalController,
    private loading: LoadingService,
    private navParams: NavParams,
    private alertController: AlertController,
    private platform: Platform,
    private http: Http,
    private nfc: NFC,
    private ndef: Ndef,
    private geolocation: Geolocation) {
      this.stLIdRondaProy = navParams.get("stRIdRondaProy");
      this.stLNomRonda= navParams.get("stRNomRonda");
      this.stLFecRonda= navParams.get("stRFecRonda");

      this.stLTitulo=this.stLNomRonda;
      //this.GetTagNFCOrden('OBVIG0460a372816380');
      this.getCurrentPosition();
      this.addListenNFC();
      this.GetPuntos();
    }

  ngOnInit() {
  }

  private getCurrentPosition(){

  //let options = {timeout: 5000, enableHighAccuracy: true};
  this.geolocation.getCurrentPosition()
  .then(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
  });
}

addListenNFC() {
  //console.log('entra a addListenNFC');
    this.loading.presentTxt('Oberón detecta NFC Satisfactoriamente ...');
    this.myListener = this.nfc.addNdefListener(() => {

      this.loading.dismiss();
    }, (err) => {
      alert('error Oberón NO puede detectar el NFC del Dispositivo. Por favor Habilítelo...');
    }).subscribe((event) => {
        //let payload = event.tag.ndefMessage[0].payload;
        //let tagContent = this.nfc.bytesToString(payload).substring(3);
        //this.presentToast('Ingresa evento: ' + tagContent);
        //console.log('received ndef message. the tag contains: ', event.tag);
        //console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));

    this.tagId=this.nfc.bytesToHexString(event.tag.id);
    //this.presentToast('ID' + this.tagId);
    if(this.tagId!=null)
    {
      this.tagId=this.loading.m_Sigla + this.tagId;
      this.myListener.unsubscribe();
      //alert(this.tagId);
      //this.GetTagNFCOrden(this.tagId);
      this.GetTagNFCOrden(this.tagId);
      //this.GetPuntosEstado();

    }
  });
  this.loading.dismiss();
}

closeModal() {
  this.myListener.unsubscribe();
  this.modalCtrl.dismiss();
}

async PresentPregunta(stRIdPunto: string, stRNomPunto: string, stRIdProyec: string) {
  //console.log(stREmpleado);
  const modal = await this.modalCtrl.create({
  component: PreguntasPage,
  componentProps: { stRIdPunto: stRIdPunto, stRNomPunto: stRNomPunto, stRIdProyec: stRIdProyec }
  });
  modal.onDidDismiss()
  .then((data) => {
    this.GetPuntos();
    this.addListenNFC();
    //this.getEmpleados();

});
 return await modal.present();
}

private GetPuntos()
{
  //this.GetFunciones('-1','-1');
  this.loading.presentTxt('Oberón Obteniendo Puntos Disponibles...');
  this.SrBuscaPuntos().then(data => {
  //console.log(data["Table"]);
  if(data["Table"] != null ) {
    if(data["Table"].length>0)
    {
      this.dataAux=data["Table"];
      this.loading.dismiss();
    }
    else{
      this.loading.dismiss();
      this.closeModal();
    }
  }
});

}

private SrBuscaPuntos() {
  //this.loading.presentTxt('Oberón Obteniendo Minutas...');
  //this.loading.presentTxt('Oberón Obteniendo Puntos Disponibles...');
  this.stLUrl = 'http://wsoberonvigilantes.azurewebsites.net/WsVigilantes.asmx/GetRonda_Puntos';
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  let params = 'stRProyeccion_ID=' + this.stLIdRondaProy + '&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
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
      //this.loading.dismiss();
      resolve(false);
    }
    });
  });

  //this.loading.dismiss();
}


private GetTagNFCOrden(stRTagID: string)
{
  //this.GetFunciones('-1','-1');
  this.loading.presentTxt('Oberón Confirmando Punto de Ronda...');
  this.SrValidaTAGNFC(stRTagID).then(data => {
    console.log("TAG " + data["Table"].length);
  console.log(data["Table"]);

  if(data["Table"] != null ) {
    if(data["Table"].length>0)
    {
      this.loading.dismiss();
      this.dataTAG=data["Table"][0];
      if(this.dataTAG.TAG_CORRECTO=="1")
      {
        this.PresentPregunta(this.dataTAG.PUN_IDREG, this.dataTAG.PUN_NOMBRE, this.stLIdRondaProy)
      }
      else{
        this.loading.dismiss();
        this.addListenNFC();
        alert("TAG NO Valido para este punto")
      }
    }
    else{
      this.closeModal();
    }
  }
});

}

private SrValidaTAGNFC(stRTagID: string) {
  //this.loading.presentTxt('Oberón Obteniendo Minutas...');
  this.stLUrl = 'http://wsoberonvigilantes.azurewebsites.net/WsVigilantes.asmx/GetOrden_Ronda';
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  let params = 'stRID_Tag=' + stRTagID + '&stR_Proyeccion=' + this.stLIdRondaProy +'&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
  console.log(params);
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
