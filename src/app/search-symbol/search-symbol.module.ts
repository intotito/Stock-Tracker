import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchSymbolPageRoutingModule } from './search-symbol-routing.module';

import { SearchSymbolPage } from './search-symbol.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchSymbolPageRoutingModule
  ],
  declarations: [SearchSymbolPage]
})
export class SearchSymbolPageModule {
  found: boolean = false;
}
