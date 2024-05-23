import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams, NavController } from '@ionic/angular';
import { LoadingService } from '../../../loading.service';
import {Http, Headers} from '@angular/http';


@Component({
  selector: 'app-Reqdetalle',
  templateUrl: './Reqdetalle.page.html',
  styleUrls: ['./Reqdetalle.page.scss'],
})
export class ReqdetallePage implements OnInit {
  public apiUrl: string;
  dataAux: any;
  stRPto: string;
  stRIDMinuta: string;
  stLTipo: string;
  stLATM: string;
  stLNombreATM: string;
  stLCategoria: string;
  stLSubCategoria: string;
  stLNovedad: string;
  stLFoto: string;
  stLDescripcion: string;


  constructor(private nav: NavController,
    private modalCtrl: ModalController,
    public loading: LoadingService,
    public http: Http,
    public navParams: NavParams) {
      this.stRPto = navParams.get("stRPto");
      this.stRIDMinuta = navParams.get("stRIDMinuta");

    }

  ngOnInit() {
    this.getRequerimientos();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  private getRequerimientos()
  {
      this.loading.present();
    this.SrBuscaRequerimientos().then(data => {

              if(data["Table"] != null) {
                this.dataAux=data["Table"];


                this.stLTipo=this.dataAux[0].MIN_TIPO_NOMBRE;
                this.stLATM=this.dataAux[0].PUNTO_ATM;
                this.stLNombreATM=this.dataAux[0].PUNTO_NOMBRE;
                this.stLCategoria=this.dataAux[0].MIN_CAT_NOMBRE;
                this.stLSubCategoria=this.dataAux[0].MIN_SUBCAT_NOMBRE;
                this.stLNovedad=this.dataAux[0].MIN_NOVEDA_NOMBRE;
                this.stLDescripcion=this.dataAux[0].MINUTA_DESCRIPCION;
                this.stLFoto= "data:image/jpeg;base64," + this.dataAux[0].FOTO;
              }
                this.loading.dismiss();

        });

  }
  private SrBuscaRequerimientos() {
        this.apiUrl = 'http://wsoberon.azurewebsites.net/WSIdentificacion.asmx/getVerReqFoto';
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let params = 'stRPunto=' + this.stRPto + '&stRMinutaID=' + this.stRIDMinuta;
        console.log(params);
        //let params='';
        return new Promise(resolve => {
            //this.http.post('http://192.168.3.8:1368/icwebmobile/consulta_puestos.php', creds, {headers: headers})
            this.http.post(this.apiUrl,params,{headers: headers}).subscribe(data => {
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
