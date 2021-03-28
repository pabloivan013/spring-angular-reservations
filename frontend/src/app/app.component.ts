import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { OverlayContainer } from '@angular/cdk/overlay'
import { FormControl } from '@angular/forms';

const THEME = {
  light : 'light-theme',
  dark  : 'dark-theme'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'frontend';
  theme = THEME.light;
  themeToggleControl = new FormControl(false);

  constructor(public auth: AuthService, private overlay: OverlayContainer) {}

  ngOnInit(): void {
    this.themeToggleControl.valueChanges.subscribe( (darkMode) => {
      let newTheme = darkMode ? THEME.dark : THEME.light
      this.setTheme(newTheme)
    })
  }

  setTheme(theme: string) {
    this.overlay.getContainerElement().classList.remove(this.theme)
    this.theme = theme;
    this.overlay.getContainerElement().classList.add(theme)
  }

}
