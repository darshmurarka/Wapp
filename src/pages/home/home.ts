import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weather_data: any;
  date: any;
  dates: any=[];
  days: any=[];
  temp: any=[];
  averages_temp: any=[];
  averages_feels: any=[];
  pressure: any=[];
  humidity: any=[];
  wind: any=[]; 
  constructor(public navCtrl: NavController, private http: Http) {
    this.date = new Date()
    this.http.get("https://api.openweathermap.org/data/2.5/forecast?id=2964574&APPID=be7ca5c2465ad321a21d1c3249e73ad4").map(res=> res.json())
    .subscribe(data => {
      console.log(data);
      this.weather_data = data;
      for(var i = 0; i<=5; i++){
        this.days.push(this.datefilter(this.weather_data.list,i));
      }
      console.log(this.days)
      console.log(this.dates)
      console.log(this.averages_temp)
      console.log(this.averages_feels)
    })
  }
  datefilter(items, day){
    let newdate = new Date();
    newdate.setDate( this.date.getDate() + day);
    this.dates.push(newdate.toUTCString().substring(0,16))
    let datestring = newdate.toISOString().substring(0,10);
    var temp: any=[];
    for(let item of items){
      if(datestring == (item.dt_txt.substring(0,10))){
        item.main.temp = (item.main.temp-273.15).toFixed(0)
        item.main.feels_like = (item.main.feels_like - 273.15).toFixed(0)
        item.main.temp_min = (item.main.temp_min - 273.15).toFixed(0)
        item.main.temp_max = (item.main.temp_max - 273.15).toFixed(0)
        temp.push(item)
      }
    }
    let temp2_temp = 0;
    let temp2_feels = 0;
    let temp2_pre = 0;
    let temp2_hum = 0;
    let temp2_win = 0;
    for(let item of temp){
      temp2_temp = temp2_temp + parseInt(item.main.temp)
      temp2_feels = temp2_feels + parseInt(item.main.feels_like)
      temp2_pre = temp2_pre + item.main.pressure;
      temp2_hum = temp2_hum + item.main.humidity;
      temp2_win = temp2_win + item.wind.speed;
    }
    temp2_temp = Math.round(temp2_temp / temp.length)
    temp2_feels = Math.round(temp2_feels / temp.length)
    temp2_pre = Math.round(temp2_pre / temp.length)
    temp2_hum = Math.round(temp2_hum / temp.length)
    temp2_win = Math.round(temp2_win / temp.length)
    this.pressure.push(temp2_pre)
    this.humidity.push(temp2_hum)
    this.wind.push(temp2_win)
    this.averages_temp.push(temp2_temp)
    this.averages_feels.push(temp2_feels)

    return temp;

  }
  

}
