import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './pages/main-view/main-view.component';
import { HomeViewComponent } from './pages/home-view/home-view.component';
import { BoardListComponent } from './components/board-list/board-list.component';

const routes: Routes = [
  { path: '', component: HomeViewComponent },
  { path: 'board/:id', component: MainViewComponent },
  { path: 'boards', component: BoardListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
