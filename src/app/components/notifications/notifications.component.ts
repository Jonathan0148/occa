import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MessageService } from '../../providers/message/message.service';
import { ModalController } from '@ionic/angular';
import { NavParams, NavController } from '@ionic/angular';
import { LoadingService } from './../../loading.service';
import {Http, Headers} from '@angular/http';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  public apiUrl: string;
  dataAux: any;
  messages: Array<any> = [];

  constructor(
    public messageService: MessageService,
    public popoverController: PopoverController,
    private nav: NavController,
    private modalCtrl: ModalController,
    public loading: LoadingService,
    public http: Http
  ) {
    this.getAlertas();
  }


  close() {
    this.popoverController.dismiss();
  }

private getAlertas()
{
    this.loading.presentTxt('Oberón Obteniendo Notificaciones ...');
    this.SrBuscaAlertas().then(data => {
    if(data["Table"] != null) {
      this.dataAux=data["Table"];
    }
    });
    this.loading.dismiss();
}
private SrBuscaAlertas() {
  this.apiUrl = this.loading.m_UrlWS + '/GetAlertas';
  //console.log(this.apiUrl);
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  let params = 'stEmpleadoID=' + this.loading.m_Empleado + '&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
console.log(params);
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


}
