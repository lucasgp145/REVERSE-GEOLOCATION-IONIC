import { Component, Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  

  
  constructor(public navCtrl: NavController,private geolocation: Geolocation) {
    this.retornarEndereco();

   

  }
    
  //   retornarEndereco(){
    
  //     this.geolocation.getCurrentPosition().then((resp) => {
  //      let latitude = resp.coords.latitude
  //      let longitude = resp.coords.longitude

  //      let geocoding = require('reverse-geocoding');
  //      let config = {
  //       'latitude': latitude,
  //       'longitude': longitude
  //   }

  //   geocoding(config, function (err, data){
  //     if(err){
  //         console.log(err);
  //     }else{
  //         console.log(data);
  //     }
  // });

  //       console.log(resp.coords.latitude, resp.coords.longitude)

  //      }).catch((error) => {
  //        console.log('Error getting location', error);
  //      });
     

       
   

  //   }

  retornarEndereco(){
  
       this.geolocation.getCurrentPosition().then((resp) => {
      //  let latitude = resp.coords.latitude;
      //  let longitude = resp.coords.longitude;

        console.log(resp.coords.latitude, resp.coords.longitude)
  
        const KEY = "AIzaSyD9QgOMBZjo_f3dHEMK_0R7aHyAhd4sVv8";
        const LAT = resp.coords.latitude;
        const LNG = resp.coords.longitude;
        let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${LAT},${LNG}&key=${KEY}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            console.log(data.results[1].formatted_address);
            
            
            return data.results[1].formatted_address;
            
          })
          .catch(err => console.warn(err.message));
      });


    
  
  }


  }