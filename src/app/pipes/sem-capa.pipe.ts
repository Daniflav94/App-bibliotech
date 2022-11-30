import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'semCapa'
})
export class SemCapaPipe implements PipeTransform {

  transform(value: string | undefined): string {
    if(value == undefined || value == null || value == ""){
      return "assets/images/sem-capa.jpg"
    }
    return value
  }

}
