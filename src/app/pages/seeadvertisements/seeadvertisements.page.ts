import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import { SharingService } from 'src/app/services/sharing/sharing.service';

@Component({
  selector: 'app-seeadvertisements',
  templateUrl: './seeadvertisements.page.html',
  styleUrls: ['./seeadvertisements.page.scss'],
})
export class SeeadvertisementsPage implements OnInit {
  data: any;

  constructor(private route: ActivatedRoute,
    private sharing: SharingService) {
    this.route.queryParams.subscribe(params => {
      this.data = JSON.parse(params["data"]);
      console.log(this.data);

    })
  }

  ngOnInit() {}

  share() {
    this.sharing.sharing();
  }
}