import { Component, OnInit } from "@angular/core";
import {ngxLoadingAnimationTypes} from 'ngx-loading'
import { HttpService }  from '../../http.service';
import { ToastrService } from "ngx-toastr";
declare var mapboxgl: any;

@Component({
  moduleId: module.id,
  selector: "maps-cmp",
  templateUrl: "maps.component.html",
})
export class MapsComponent implements OnInit {

  public loading = false;
  public usertype = ''
  public NGOId = null;
  public NGOKey = null;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  FamilyData = [];
  NGOData = [];

  constructor(private _httpService:HttpService,private toastr: ToastrService) {
    this.usertype = localStorage.getItem("ACCESS_TOKEN");
    this.NGOId = localStorage.getItem("NGOID");
    this.NGOKey = localStorage.getItem("NGOKEY");
  }

  ngOnInit() {
    
    if(this.usertype == "government"){
      this.getNGOLatLngData();
    }else{
      this.getFamilyDataFromDB();
    }
    
    
  }

  getFamilyDataFromDB(){
      this.loading = true;
      this._httpService.getFamilyLatLng(this.NGOKey).subscribe(data=>{
      if(data['success'] != 1){
        this.toastr.error(
          '<span data-notify="icon" class="nc-icon nc-simple-remove"></span><span data-notify="message">Maps Data not loaded properly</span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: "toast-bottom-right"
          }
        );
        this.loading = false
      }
      else{
        this.FamilyData = data['data'];
        this.loading = false
        this.renderMap();
      }
    })
  }

  getNGOLatLngData(){
    this.loading = true;
      this._httpService.getNGOLatLng().subscribe(data=>{
      if(data['success'] != 1){
        this.toastr.error(
          '<span data-notify="icon" class="nc-icon nc-simple-remove"></span><span data-notify="message">Maps Data not loaded properly</span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: "toast-bottom-right"
          }
        );
        this.loading = false
      }
      else{
        var ngo = data['data'];
        this._httpService.getFamilyLatLngForGovernment().subscribe(data=>{
          if(data['success'] != 1){
            this.toastr.error(
              '<span data-notify="icon" class="nc-icon nc-simple-remove"></span><span data-notify="message">Maps Data not loaded properly</span>',
              "",
              {
                timeOut: 4000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-danger alert-with-icon",
                positionClass: "toast-bottom-right"
              }
            );
            this.loading = false
          }
          else{
            var family = data['data'];
            this.NGOData = ngo.concat(family);
            console.log(this.NGOData)
            this.loading = false
            this.renderMap();
          }
        })
      }
    });
   

    
  }

  createGeoJSON() {
    var geojson = {
      type: "FeatureCollection",
      features: [],
    };
    if(this.usertype == 'government'){
      console.log(this.NGOData);
      this.NGOData.map(function (val, i) {
        geojson.features.push({
          type: "Feature",
          properties:{
              "details": val.Name != undefined? '0' : '1',
              "content": val.Name != undefined? val.Name : val.Family_id,
              "content2":val.NO_OF_PACKAGES
          },
          geometry: {
            type: "Point",
            coordinates: [val.Long, val.Lat],
          },
        });
      });
    }else{
      this.FamilyData.map(function (val, i) {
        geojson.features.push({
          type: "Feature",
          properties:{
            "details": val.Name != undefined? '0' : '1',
            "content": val.Name != undefined? val.Name : val.Family_id,
            "content2":val.NO_OF_PACKAGES
          },
          geometry: {
            type: "Point",
            coordinates: [val.Long, val.Lat],
          },
        });
      });
    }
    return geojson
  }

  renderMap(){
    const component = this;
    mapboxgl.accessToken =
      "pk.eyJ1IjoibmFqYW11c3NhcWliIiwiYSI6ImNrOWxpOGQ4eDA1eWszbHBjbmNudXc4a2YifQ.MF9jlflmWYKF-WEyWYJ8iQ";
    var map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: { lat: 30.3753, lng: 69.3451 },
      zoom: 4.5,
    });

    map.addControl(new mapboxgl.NavigationControl());

      map.on("load", function () {
        map.addSource("beneficiaries", {
          type: "geojson",
          data:component.createGeoJSON()
        });

        map.addLayer({
          id: "beneficiaries-location",
          type: "circle",
          source: "beneficiaries",
          paint: {
            'circle-radius': {
                'base': 1.75,
                'stops': [
                    [12, 3],
                    [24, 180]
                ]
            },
            'circle-color': [
              'match',
              ['get', 'details'],
              '1',
              '#e55e5e',
              '0',
              '#233B53',
              '#ccc'
              ]
          },
          filter: ["==", "$type", "Point"],
        });

        map.on('click', 'beneficiaries-location', function(e) {
          var htmlcontentNGO = e.features[0].properties.details == '0'?'<h6 class="title">NGO Details</h6><blockquote><p class="mb-0">'+e.features[0].properties.content+'</p><footer class="blockquote-footer">Phone : <cite title="Source Title">+9221-3598234'+Math.floor(Math.random()*5+1)+'</cite></footer></blockquote>'
          :'<h6 class="title">Family Details</h6><blockquote><p class="mb-0">Family '+e.features[0].properties.content+' has been delivered '+e.features[0].properties.content2+' ration Bag(s)</p></blockquote>'
          var htmlcontentFamily = '<h6 class="title">Family Details</h6><blockquote><p class="mb-0">Family '+e.features[0].properties.content+' has been delivered '+e.features[0].properties.content2+' ration Bag(s)</p></blockquote>'
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(component.usertype=='government'?htmlcontentNGO:htmlcontentFamily)
            .addTo(map);
            });
             
            // Change the cursor to a pointer when the mouse is over the states layer.
            map.on('mouseenter', 'beneficiaries-location', function() {
            map.getCanvas().style.cursor = 'pointer';
            });
             
            // Change it back to a pointer when it leaves.
            map.on('mouseleave', 'beneficiaries-location', function() {
            map.getCanvas().style.cursor = '';
            });
      });

  }
}