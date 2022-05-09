import { Component, Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  

  
  constructor(public navCtrl: NavController,private geolocation: Geolocation) {

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
  
        const KEY = "AIzaSyD8LFh53VddzDevOC6A5Jhln9KgpmpoExg";
        const LAT = resp.coords.latitude;
        const LNG = resp.coords.longitude;
        let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${LAT},${LNG}&key=${KEY}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            let parts = data.results[0].address_components;
            document.body.insertAdjacentHTML(
              "beforeend",
              `<p>Formatted: ${data.results[0].formatted_address}</p>`
            );
            parts.forEach(part => {
              if (part.types.includes("country")) {
                //we found "country" inside the data.results[0].address_components[x].types array
                document.body.insertAdjacentHTML(
                  "beforeend",
                  `<p>COUNTRY: ${part.long_name}</p>`
                );
              }
              if (part.types.includes("administrative_area_level_1")) {
                document.body.insertAdjacentHTML(
                  "beforeend",
                  `<p>PROVINCE: ${part.long_name}</p>`
                );
              }
              if (part.types.includes("administrative_area_level_3")) {
                document.body.insertAdjacentHTML(
                  "beforeend",
                  `<p>LEVEL 3: ${part.long_name}</p>`
                );
              }
            });
          })
          .catch(err => console.warn(err.message));
      });


    
  
  }


  }