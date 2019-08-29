import { NgModule } from '@angular/core';

import { TemperaturePipe } from './temperature.pipe';

@NgModule({
  declarations: [
    TemperaturePipe
  ],
  exports: [
    TemperaturePipe
  ]
})
export class TemperaturePipeModule { }
