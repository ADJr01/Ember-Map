import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MapRenderComponent extends Component {
  @tracked fileNotSelected = true;
  @service('analyzer') analyzer;
  @action filePicked(oEvent) {
    this.analyzer.locationData = this.args.dataset
    // Get The File From The Input
    let selected = oEvent.target.files[0];
    let sFilename = selected.name;
    // Create A File Reader HTML5
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(selected);
    fileReader.onload = (event) => {
      let data = event.target.result;
      let workbook = XLSX.read(data, { type: 'binary' });
      workbook.SheetNames.forEach((sheet) => {
        let rowObject = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet]
        );
        this.analyzer.data_set = rowObject;
        this.fileNotSelected = false;
        console.log(rowObject)
      });
    };
  }

  @action fileHandler(element) {
    element.addEventListener('change', this.filePicked, false);
  }
}
