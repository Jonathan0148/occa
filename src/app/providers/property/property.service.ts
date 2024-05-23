import { Injectable } from '@angular/core';
import properties from './mock-properties';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  favoriteCounter = 0;
  favorites: Array<any> = [];
  properties: Array<any> = properties;

  findAll() {
    return Promise.resolve(properties);
  }

  getProperties() {
    return this.properties;
  }

  findById(id) {
    return Promise.resolve(properties[id - 1]);
  }

  getItem(id) {
		for (let i = 0; i < this.properties.length; i++) {
			if (this.properties[i].id === parseInt(id)) {
				return this.properties[i];
			}
		}
		return null;
  }


  findByName(searchKey: string) {
    const key: string = searchKey.toUpperCase();
    return Promise.resolve(this.properties.filter((property: any) =>
        (property.title +  ' ' +property.address +  ' ' + property.city + ' ' + property.description).toUpperCase().indexOf(key) > -1));
  }

  findByNameTurnoAbierto(searchKey: string) {
    const key: string = searchKey.toUpperCase();
    return Promise.resolve(this.properties.filter((property: any) =>
        (property.turno).toUpperCase().indexOf(key) > -1));
  }

  findByNameTurnoCerrado(searchKey: string) {
    const key: string = searchKey.toUpperCase();
    return Promise.resolve(this.properties.filter((property: any) =>
        (property.turnoC).toUpperCase().indexOf(key) > -1));
  }

  getFavorites() {
    return Promise.resolve(this.favorites);
  }

  favorite(property) {
    this.favoriteCounter = this.favoriteCounter + 1;
    this.favorites.push({id: this.favoriteCounter, property: property});
    return Promise.resolve();
  }

  unfavorite(favorite) {
    const index = this.favorites.indexOf(favorite);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
    return Promise.resolve();
  }
}
