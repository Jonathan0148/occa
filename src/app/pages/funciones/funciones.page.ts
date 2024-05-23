import { Component, OnInit } from '@angular/core';
import { TranslateProvider } from '../../providers';
import { ModalController } from '@ionic/angular';
import { NavParams, NavController } from '@ionic/angular';
import { LoadingService } from '../../loading.service';
import {Http, Headers} from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-funciones',
  templateUrl: './funciones.page.html',
  styleUrls: ['./funciones.page.scss'],
})
export class FuncionesPage implements OnInit {
  private stLUrl: string;
  private dataAux: any;
  private dataFunc: any;
  private dataCat: any;
  private stLRutaImg="../../assets/img/Funcion.png";
  private stLCategoria: string="";
  private stLTipo: string="";
  private stLListaVisible: string="1";
  private onFuncionesForm: FormGroup;

  constructor(private translate: TranslateProvider,
    private nav: NavController,
    private modalCtrl: ModalController,
    private loading: LoadingService,
    private formBuilder: FormBuilder,
    private http: Http
    ) {

    }

  ngOnInit() {
    this.GetTipoFunciones();
    this.onFuncionesForm = this.formBuilder.group({
      'stLTipo': [null, Validators.compose([
        Validators.required
      ])
    ],
    'stLCategoria': [null, Validators.compose([
      Validators.required
    ])
  ],
    });
  }


  private GetTipoFunciones()
  {
    //this.GetFunciones('-1','-1');

    this.SrBuscaTipoFunciones().then(data => {
      if(data["Table1"] != null) {
        this.dataAux=data["Table1"];
      }
    });

  }

  private SrBuscaTipoFunciones() {
    this.loading.presentTxt('Oberón Obteniendo Tipo Funciones ...');
    this.stLUrl = this.loading.m_UrlWS +'/GetTipoFuncion';
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let params = 'stRCargoID=' + this.loading.m_CargoID + '&stRStatus=1&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
    //console.log(params);
    return new Promise(resolve => {
    this.http.post(this.stLUrl,params,{headers: headers}).subscribe(data => {
      if(data.json()!=null){
        this.loading.dismiss();
        //console.log(data.json());
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


  private GetFunciones(stRTipoFunciones: string, stRCategoria: string)
  {
    if(stRCategoria=="")
    {
      this.stLListaVisible="0";
    }
    else{
      this.SrBuscaFunciones(stRTipoFunciones, stRCategoria).then(data => {
        if(data["Table1"] != null) {
          this.stLListaVisible="1";
          this.dataFunc=data["Table1"];
        }
      });
    }

  }

  private SrBuscaFunciones(stRTipoFunciones: string, stRCategoria: string) {
    this.loading.presentTxt('Oberón Obteniendo Funciones ...');
    this.stLUrl = this.loading.m_UrlWS +'/GetFUNCIONES';
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let params = 'stRTIPOFUNID=' + stRTipoFunciones + '&stRPREGID=' + stRCategoria + '&stRCargoID=' + this.loading.m_CargoID + '&stRStatus=1&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
    //console.log(params);
    return new Promise(resolve => {
    this.http.post(this.stLUrl,params,{headers: headers}).subscribe(data => {
      if(data.json()!=null){
        this.loading.dismiss();
        //console.log(data.json());
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


  private GetCategoria(stRTipoFunciones: string)
  {
    this.dataFunc="";
    this.stLCategoria="";
    this.stLListaVisible="0";
    this.SrBuscaCategoria(stRTipoFunciones).then(data => {
      if(data["Table1"] != null) {
        this.dataCat=data["Table1"];

      }
    });

  }

  private SrBuscaCategoria(stRTipoFunciones: string) {
    this.loading.presentTxt('Oberón Obteniendo Categorías de Funciones ...');
    this.stLUrl = this.loading.m_UrlWS +'/GetPreguntasFunciones';

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let params = 'stRTipoID=' + stRTipoFunciones + '&stRCargoID=' + this.loading.m_CargoID + '&stRStatus=1&stRUsuarioAPP=' + this.loading.m_UsuarioApp +'&stRPasswordAPP='+ this.loading.m_PasswordApp +'&stRCodigoWSAPP='+ this.loading.m_CodigoWSApp +'&stRIMEI='+ this.loading.m_IMEI;
    //console.log(params);
    return new Promise(resolve => {
    this.http.post(this.stLUrl,params,{headers: headers}).subscribe(data => {
      if(data.json()!=null){
        this.loading.dismiss();
        //console.log(data.json());
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
