import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Config } from '../models/config.model';

@Injectable()
export class ConfigService {
  configDoc: AngularFirestoreDocument<Config>;
  config: Observable<Config>;
  // Id único de la coleccion de configuracion de la bd
  id = '1';

  constructor(
    private db: AngularFirestore
  ) {
  }

  getConfig(): Observable<Config> {
    this.configDoc = this.db.doc<Config>(`configuracion/${this.id}`);
    this.config = this.configDoc.valueChanges();
    return this.config;
  }

  editConfig(config: Config) {
    this.configDoc = this.db.doc<Config>(`configuracion/${this.id}`);
    this.configDoc.update(config);
  }
}
