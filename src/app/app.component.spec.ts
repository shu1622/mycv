import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
 it('integra las siete secciones del CV', async () => {
  await TestBed.configureTestingModule({ declarations: [AppComponent], schemas: [NO_ERRORS_SCHEMA] }).compileComponents();
  const fixture = TestBed.createComponent(AppComponent); fixture.detectChanges();
  for (const nombre of ['header','work-experience','education','skills','certificates','languages','interests']) {
   expect(fixture.nativeElement.querySelector('app-' + nombre)).toBeTruthy();
  }
 });
});
