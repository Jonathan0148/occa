import { Injectable } from '@angular/core';
import brokers from './mock-brokers';

@Injectable({
  providedIn: 'root'
})
export class BrokerService {
  favoriteCounter = 0;
  favorites: Array<any> = [];
  brokers: Array<any> = brokers;

  constructor() { }

  findAll() {
      return this.brokers;
  }

  findById(id) {
      return Promise.resolve(this.brokers[id - 1]);
  }

  getItem(id) {
    for (let i = 0; i < this.brokers.length; i++) {
      if (this.brokers[i].id === parseInt(id)) {
        return this.brokers[i];
      }
    }
    return null;
  }

  getFavorites() {
    return Promise.resolve(this.favorites);
  }

  favorite(broker) {
    this.favoriteCounter = this.favoriteCounter + 1;
    // this.favoriteCounter += 1;
    this.favorites.push({ id: this.favoriteCounter, broker: broker });
    return Promise.resolve();
  }

  unfavorite(favorite) {
    const ind = this.favorites.indexOf(favorite);
    if (ind > -1) {
      this.favorites.splice(ind, 1);
    }
    return Promise.resolve();
  }

}
