import { Component } from '@angular/core';

import * as constants from '../../shared/constants/page_not_found.constants';
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent {
  constants = constants.default;
}
