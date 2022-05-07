import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'select-stock',
    loadChildren: () => import('./select-stock/select-stock.module').then( m => m.SelectStockPageModule)
  },
  {
    path: 'quote-viewer',
    loadChildren: () => import('./quote-viewer/quote-viewer.module').then( m => m.QuoteViewerPageModule)
  },
  {
    path: 'search-symbol',
    loadChildren: () => import('./search-symbol/search-symbol.module').then( m => m.SearchSymbolPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
