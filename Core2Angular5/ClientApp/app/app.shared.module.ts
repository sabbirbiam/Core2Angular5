import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { FpageComponent } from "./components/fpage/fpage.component";
import { SpageComponent } from "./components/spage/spage.component";
import { UpdatepageComponent } from "./components/updatepage/updatepage.component";
import { StudentService } from "../../Services/stdservice.service";

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        FpageComponent,
        SpageComponent,
        UpdatepageComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: "fpage", component: FpageComponent },
            { path: 'spage', component: SpageComponent },
            { path: "updatepage/:id", component: UpdatepageComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [StudentService] 
})
export class AppModuleShared {
}
