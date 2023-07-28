import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './pages/main-view/main-view.component';
import { NavbarComponent } from './components/navbar/navbar.component';

// angular material
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HomeViewComponent } from './pages/home-view/home-view.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BoardHeaderComponent } from './components/board-header/board-header.component';
import { BoardWrapperComponent } from './components/board-wrapper/board-wrapper.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { BoardListComponent } from './components/board-list/board-list.component';
import { PopupFormComponent } from './components/popup-form/popup-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    NavbarComponent,
    HomeViewComponent,
    BoardHeaderComponent,
    BoardWrapperComponent,
    TaskListComponent,
    BoardListComponent,
    PopupFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    MatMenuModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
