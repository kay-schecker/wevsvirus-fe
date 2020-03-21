import {Component} from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  public isSuccess: boolean;
  public isError: boolean;
  public isWarning: boolean;
  public canProceed: boolean;
  public pages: Array<{ title: string, thumb: string, description: string, link: any }>;

  public   slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  public item = {}

  constructor() {
    this.pages = [
      {
        title: 'About',
        thumb: './assets/images/about.png',
        description: 'Who we are. What we do. Why we’re here',
        link: '/about'
      },
      {
        title: 'Contact Us',
        thumb: './assets/images/contact.png',
        description: 'Drop us a line and get in touch we’d love to hear from you!',
        link: '/contact'
      },
      {
        title: 'Technologies',
        thumb: './assets/images/tech.png',
        description: 'Third party resources used by this app',
        link: '/technology'
      },
      {
        title: 'Tweets',
        thumb: 'assets/images/twitter.png',
        description: 'The latest news updates from our Twitter account',
        link: 'TweetsPage'
      }
    ];
  } // End of constructor

  edit(page) {
    console.log(`I could do a lot more than just print out this message for the ${page} page to the browser console`);
  }


  share(page) {
    console.log(`I could do a lot more than just print out this message for the ${page} page to the browser console`);
  }


  delete(page) {
    console.log(`Yep, I’m an under-performer for the ${page} page too :(`);
  }

}
