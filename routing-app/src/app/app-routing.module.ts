import { Injectable, NgModule } from '@angular/core';
import { ResolveFn, RouterModule, RouterStateSnapshot, Routes, TitleStrategy, provideRouter, withComponentInputBinding } from '@angular/router';
import { FirstComponent } from './components/first/first.component';
import { SecondComponent } from './components/second/second.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ChildAComponent } from './components/child-a/child-a.component';
import { ChildBComponent } from './components/child-b/child-b.component';
import { Title } from '@angular/platform-browser';


  @Injectable({providedIn: 'root'})
  export class TemplatePageTitleStrategy extends TitleStrategy {
    constructor(private readonly title: Title) {
      super();
    }

    override updateTitle(routerState: RouterStateSnapshot) {
      const title = this.buildTitle(routerState);
      if (title !== undefined) {
        this.title.setTitle(`Routing app | ${title}`);
      }
    }
  }


const resolvedChildATitle: ResolveFn<string> = () => Promise.resolve('child a');

export const routes: Routes = [ 
  { path: 'first-component', title: 'First component', component: FirstComponent,
  children: [
    {
      path: 'child-a', /* child route path*/ title: resolvedChildATitle, component: ChildAComponent, // child route component that the router renders
    },
    {
      path: 'child-b',/* child route path*/ title: 'Child B',component: ChildBComponent, // another child route component that the router renders
    },
  ],
  },
  
  { path: 'second-component', component: SecondComponent },
  { path: '', redirectTo: '/first-component', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent },  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    {provide: TitleStrategy, useClass: TemplatePageTitleStrategy},
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

