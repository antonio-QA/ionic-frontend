import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredeciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	creds: CredeciaisDTO = {
		email:"",
		senha:""
	}

	constructor(
		public navCtrl: NavController, 
		public menu: MenuController,
		public auth: AuthService
	) {	}

	ionViewWillEnter() {
		this.menu.swipeEnable(false);
	}
	
	ionViewDidLeave() {
		this.menu.swipeEnable(true);
	}

	login() {
		this.auth.authenticate(this.creds)
		.subscribe(response => {
			this.auth.successfullLogin(response.headers.get('Authorization'));
			this.navCtrl.setRoot('CategoriasPage');
		},
		error => {});
		
	}
}
