import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import {capitalizeFirstLetter,diffrencePercent,percentage} from '../utils/tools'
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default class MapViewComponent extends Component {
  @service('analyzer') analyzer;
  @tracked configs = {
    container: 'map_view',
    openStreetInfo: {
      tile: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attrib:
        '&copy; <a href="https://openstreetmap.org/copyright">open street</a>',
    },
    maxZoom: 15,
    defaultLocation: [23.685, 90.3563],
    defaultZoomLevel: 10,
  };
  @tracked map = null;
  @tracked layerContainer = [];

  @action updateLayer(layer){
    if(this.layerContainer.length>0){
      this.layerContainer = [...this.layerContainer,layer]
    }else{
      this.layerContainer.push(layer);
    }
    this.layerContainer.forEach(e => {
      e.addTo(this.map);
    })
  }

  @action initView() {
    this.map = L.map(this.configs.container).setView(
      this.configs.defaultLocation,
      this.configs.defaultZoomLevel
    );
    const primaryLayer = L.tileLayer(this.configs.openStreetInfo.tile, {
      maxZoom: 14,
      attribution: this.configs.openStreetInfo.attrib
    });
    this.updateLayer(primaryLayer);
    this.renderDrawAble()

  }

  /*
  L.circle([23.794530129553795, 90.40098145581675], {
        color: '#2196F3',
        fillColor: '#2196F3',
        fillOpacity: 0.7,
        radius: 200
    })

  * */

  @action renderDrawAble(){
    const max_radius = 1000;
    let prevAffected = 0;
    let radius = 0;
    this.analyzer.analyzedSet.forEach((e,i)=>{
      const color = getRandomColor();
      let opacity = Math.floor(Math.random() * 10)/10
      if(opacity<0.4){
        opacity+=0.5;
      }
    if(i===0){
      radius=1000;
    }else{
      const percentToMinus = diffrencePercent(prevAffected,parseInt(e.data.Effected));
      radius = radius - percentage(radius,percentToMinus);

    }

    //Effected: 120 Location: "Cantonment, Dhaka"
      let layer =   L.circle([e.info.area.lat,e.info.area.lon], {
        color: color,
        fillColor: color,
        fillOpacity: opacity,
        radius: radius
      })
      const pop = L.popup()
        .setContent(`<div class="glass-radius apply-padding-a4p glass-box-shadow glass-backdrop clay-border display-flex flex-content-start flex-column">
                   <h4 class="text-bolder"> ${capitalizeFirstLetter(e.data.Location)}</h4>
                   <h6 class="text-bold">Effected: <em>${e.data.Effected}</em></h6>
            </div>`);


      layer.bindPopup(pop).openPopup();
      this.updateLayer(layer);
      prevAffected = parseInt(e.data.Effected)
      console.log(radius)
    })

  }




}
