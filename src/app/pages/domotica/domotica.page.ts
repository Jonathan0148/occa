import { Component, OnInit } from '@angular/core';
import { TranslateProvider } from '../../providers';
import { ModalController } from '@ionic/angular';
import { NavParams, NavController, ToastController } from '@ionic/angular';
import { LoadingService } from '../../loading.service';
import {Http, Headers} from '@angular/http';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@Component({
  selector: 'app-domotica',
  templateUrl: './domotica.page.html',
  styleUrls: ['./domotica.page.scss'],
})
export class DomoticaPage implements OnInit {
  public apiUrl: string;
  public stRPto: string;
  public stRNombre: string;
  public stRTAGID:string;
  pairedList: pairedlist;
  dataAux: any;
  listToggle: boolean = false;
  pairedDeviceID: number = 0;
  public address: any;

  constructor(private translate: TranslateProvider,
    private nav: NavController,
    private modalCtrl: ModalController,
    private loading: LoadingService,
    private http: Http,
    private tts: TextToSpeech,
    private bluetoothSerial: BluetoothSerial, private toastCtrl: ToastController) {
        this.checkBluetoothEnabled();
    }

  ngOnInit() {
  }

  checkBluetoothEnabled() {
      this.bluetoothSerial.isEnabled().then(success => {
        this.listPairedDevices();
      }, error => {
        this.showError("Por Favor Habilite el Dispositivo")
      });
    }

    listPairedDevices() {
      this.bluetoothSerial.list().then(success => {
        this.pairedList = success;
        this.listToggle = true;
      }, error => {
        this.showError("Por Favor Habilite el Dispositivo")
        this.listToggle = false;
      });
    }

    selectDevice(stRDato) {
      //let connectedDevice = this.pairedList[this.pairedDeviceID];
      //this.showToast(this.pairedList[this.pairedDeviceID]);
      let connectedDevice = this.pairedList["0"];
      if (!connectedDevice.address) {
        this.showError('Seleccione el Dispositivo');
        return;
      }
      this.address = connectedDevice.address;
      let name = connectedDevice.name;
      //this.showError(address);
      this.connect(stRDato);
      //this.connect("00:21:13:01:91:F8");
    }

    connect(stRDato) {
      // Attempt to connect device with specified address, call app.deviceConnected if success
      this.bluetoothSerial.connect(this.address).subscribe(success => {
        this.deviceConnected();
        this.showToast("Successfully Connected");
        this.sendData(stRDato);
      }, error => {
        this.showError("Error:Connecting to Device");
      });
    }



    deviceConnected() {
      // Subscribe to data receiving as soon as the delimiter is read
      this.bluetoothSerial.subscribe('\n').subscribe(success => {
        this.handleData(success);
        this.showToast("Connected Successfullly");
      }, error => {
        this.showError(error);
      });
    }

    deviceDisconnected() {
      // Unsubscribe from data receiving
      this.bluetoothSerial.disconnect();
      this.showToast("Device Disconnected");
    }

    handleData(data) {
      this.showToast(data);
    }

    sendData(stRDato) {
      //this.dataSend+='\n';
      //this.showToast("Abriend);
      //this.connect(this.address);
      //this.selectDevice();
      //let connectedDevice = this.pairedList["OBERON80766"];
      this.bluetoothSerial.write(stRDato).then(success => {
        if(stRDato=='@1#')
        {
          this.showToast("Sala Abierta");
          this.deviceDisconnected();
          this.tts.speak({
              text: 'Bienvenido ' + this.loading.m_Nombres + ' ' +  this.loading.m_Apellidos + ' a la Sala OBERÓN',
              rate: 1,
              locale: 'es-CO'
              })
          .then(() => console.log('Success'))
          .catch((reason: any) => console.log(reason));
        }

        if(stRDato=='@2#')
        {
          this.showToast("Caja Fuerte Abierta");
          this.deviceDisconnected();
        }

        if(stRDato=='@3#')
        {
          this.showToast("Apagar Todo");
          this.deviceDisconnected();
        }

        if(stRDato=='@4#')
        {
          this.showToast("Encender Luz");
          this.deviceDisconnected();
        }

        if(stRDato=='@5#')
        {
          this.showToast("Apagar Luz");
          this.deviceDisconnected();
        }

        //if(stRDato=='0')
        //{
          //this.showToast("Caja Cerrada");
        //}

      }, error => {
        this.showToast("Error en la Apertura");
      });
    }

    showError(error) {
      this.showToast("Error: " + error);
    }

    async showToast(msj) {
         const toast = await this.toastCtrl.create({
           message: msj,
           duration: 4000
         });
         toast.present();
       }


  }

  interface pairedlist {
    "class": number,
    "id": string,
    "address": string,
    "name": string
  }
