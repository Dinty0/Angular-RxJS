import { Component, VERSION } from '@angular/core';
import { map, tap, take, of, from } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  ngOnInit() {
    of(2, 4, 6, 8)
      .pipe(
        map((item) => item * 2),
        tap((item) => console.log(item)),
        take(2)
      )
      .subscribe(console.log);

    from([20, 15, 10, 5])
      .pipe(
        tap((item) => console.log(`resulting item ... ${item}`)),
        map((item) => item * 2),
        map((item) => item - 10),
        map((item) => {
          if (item === 0) {
            throw new Error('zero deteted');
          }
          return item;
        }),
        take(3)
      )
      .subscribe(
        (item) => console.log(`resulting item ... ${item}`),
        (err) => console.error(`error occured .... ${err}`),
        () => console.log('complete')
      );

    of('Apple1', 'Apple2', 'Apple3').subscribe(
      (apple) => console.log(`Apple was emitted ${apple}`),
      (err) => console.log(`Error occured: ${err}`),
      () => console.log('No more apples, go home.')
    );
  }
}
