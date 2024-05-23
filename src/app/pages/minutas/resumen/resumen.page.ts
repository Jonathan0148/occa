import { OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { TranslateProvider } from '../../../providers';
import { ModalController } from '@ionic/angular';
import { NavParams, NavController, ToastController } from '@ionic/angular';
import { LoadingService } from '../../../loading.service';
import {Http, Headers} from '@angular/http';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
})
export class ResumenPage implements OnInit {
  private stLUrl: string;
  private dataAux: any;
  private stLTipo: string;
  private stLCategoria: string;
  private stLSubCategoria: string;
  private stLNovedad: string;
  private stLNota: string;
  private stLIdMinuta: string;
  private stbase64ImageAux: string="assets/img/img-icon3.png";
  private stbase64Image: string;


  constructor(private translate: TranslateProvider,
    private nav: NavController,
    private modalCtrl: ModalController,
    private loading: LoadingService,
    public navParams: NavParams,
    private http: Http) {
      this.stLIdMinuta = navParams.get("stRIdMinuta");
      this.GetResumen(this.stLIdMinuta);
    }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  private GetResumen(stRIDMinuta: string)
  {
    //this.GetFunciones('-1','-1');

    this.SrBuscaResumen(stRIDMinuta).then(data => {
      //console.log(data["Table"]);
      if(data["Table"] != null) {
        this.dataAux=data["Table"][0];
        console.log(this.dataAux);
        //this.stLTipo=this.dataAux.
        this.stLTipo=this.dataAux.TIPO_MINUTA;
        this.stLCategoria=this.dataAux.CATEGORIA;
        this.stLSubCategoria=this.dataAux.SUBCATEGORIA;
        this.stLNovedad=this.dataAux.NOVEDAD;
        this.stLNota=this.dataAux.DESCRIPCION;
        this.stbase64ImageAux=this.dataAux.EVIDENCIA;
      }
    });

  }

  private SrBuscaResumen(stRIDMinuta: string) {
    this.loading.presentTxt('Oberón Obteniendo Resumen...');
    this.stLUrl = 'http://wsoberonvigilantes.azurewebsites.net/WsVigilantes.asmx/GetResumenMinuta';
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let params = 'stR_Minuta_ID=' + stRIDMinuta + '&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
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

}
