import Service from '@ember/service';
import {tracked} from "@glimmer/tracking";
import AreaExtraxct from "../utils/AreaExtraxct";
export default class AnalyzerService extends Service {
  @tracked input_dataset = [];
  @tracked analyzedSet = [];
  @tracked locationData = null;
  set data_set(args){
    this.input_dataset = [...args];
    this.input_dataset.forEach( e=>{
      const info = AreaExtraxct(e.Location,this.locationData[2],this.locationData[0])
      this.analyzedSet.push({info,data:e});
    });
    this.analyzedSet.sort((a,b)=> b.data.Effected - a.data.Effected)
  }



}
