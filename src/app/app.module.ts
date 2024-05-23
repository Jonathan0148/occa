import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AgmCoreModule } from '@agm/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';

// Services/Providers
import { TranslateProvider, PropertyService } from './providers';

// Modal Pages
import { ImagePageModule } from './pages/modal/image/image.module';
import { SearchFilterPageModule } from './pages/modal/search-filter/search-filter.module';
import { Flashlight } from '@ionic-native/flashlight/ngx';
//import { Network } from '@ionic-native/network/ngx';
import { SignaturePadModule } from 'angular2-signaturepad';

import { Network } from '@ionic-native/network/ngx';

// Environment
import { environment } from '../environments/environment';

// Components
import { NotificationsComponent } from './components/notifications/notifications.component';

// Pipes
import { PipesModule } from './pipes/pipes.module';

//Propios
import { HttpModule } from '@angular/http';

import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { ReconocimientoPageModule } from './pages/asistencia/empleados/reconocimiento/reconocimiento.module';
import { MdetallePageModule } from './pages/minutas/mdetalle/mdetalle.module';
import { RonpuntosPageModule } from './pages/rondas/ronpuntos/ronpuntos.module';
import { PreguntasPageModule } from './pages/rondas/preguntas/preguntas.module';
import { VerreqPageModule } from './pages/rondas/verreq/verreq.module';
import { VisitagPageModule } from './pages/rondas/visitag/visitag.module';
import { NoaccesoPageModule } from './pages/rondas/noacceso/noacceso.module';
import { FacialbasPageModule } from './pages/rondas/facialbas/facialbas.module';
import { AccionPageModule } from './pages/rondas/accion/accion.module';
import { BaseptoPageModule } from './pages/rondas/basepto/basepto.module';
import { ReqdetallePageModule } from './pages/rondas/reqdetalle/reqdetalle.module';
import { NfcPageModule } from './pages/puntos/nfc/nfc.module';
import { ResumenPageModule } from './pages/minutas/resumen/resumen.module';
import { CapdetallePageModule } from './pages/capacitacion/capdetalle/capdetalle.module';
import { EmpleadosPageModule } from './pages/asistencia/empleados/empleados.module';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { InAppBrowser } from  '@ionic-native/in-app-browser/ngx';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { BackgroundGeolocation}  from '@ionic-native/background-geolocation/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, NotificationsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    IonicModule.forRoot(environment.config),
    AppRoutingModule,
    HttpClientModule,
    VerreqPageModule,
    VisitagPageModule,
    AccionPageModule,
    FacialbasPageModule,
    BaseptoPageModule,
    ReqdetallePageModule,
    SearchFilterPageModule,
    ReconocimientoPageModule,
    MdetallePageModule,
    RonpuntosPageModule,
    PreguntasPageModule,
    NfcPageModule,
    NoaccesoPageModule,
    CapdetallePageModule,
    ResumenPageModule,
    SignaturePadModule,
    IonicStorageModule.forRoot({
      name: '__ionproperty2',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBnTnX1cVqp8AbMAL6TNL50WV8pKPI6t7Q'
    }),
    PipesModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [NotificationsComponent],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    TranslateProvider,
    PropertyService,
    TextToSpeech,
    Flashlight,
    Network,
    Camera,
    SpeechRecognition,
    ImagePageModule,
    UniqueDeviceID,
    BluetoothSerial,
    Diagnostic,
    Uid,
    Geolocation,
    AndroidPermissions,
    CallNumber,
    LocalNotifications,
    InAppBrowser,
    BackgroundMode,
    NFC,
    Ndef,
    BackgroundGeolocation,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
