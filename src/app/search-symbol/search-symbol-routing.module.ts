import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchSymbolPage } from './search-symbol.page';

const routes: Routes = [
  {
    path: '',
    component: SearchSymbolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchSymbolPageRoutingModule {}
