# Angular Custom Modal

This library has been built to help you with the modals creation in your angular applications.

The usage is very similar to the one you can find in [Angular Material's Dialog](https://material.angular.io/components/dialog/overview).

### How to use

In order to use this library, all you need to do is import NgCustomModal module into your application's module, like this:

```javascript
@NgModule({
  ...,
  imports: [..., CustomModalModule]
  ...
})
```

This will automatically provide you with all you need in order to create dynamic components inside a dialog.

After that, you only need to open the component you will use to open your modal and inject `ModalService` imported from the library as well:

```javascript
import { ModalService } from 'ng-custom-modal';

...

@Component({
    ...config
})
export class TestComponent {
    constructor(private modalService: ModalService) {}
}
```

And then, in the method you create you only need to call `open` from `modalService` with the next parameters:

```javascript
openModal() {
    this.modalService.open<ComponentType, AdditionalDataType>(ComponentName, configObject);
}
```

**Generic parameters**:
You can pass both `ComponentType` and `AdditionalDataType` to your open method, this will automatically provide a type for the first parameter and also the `AdditionalDataType` for the `data` property in the `configObject`.

The configObject should look like this:

```json
{
  "data": AdditionalDataType,
  "width": string,
  "height": string
}
```

Width and height are not required properties and you can skip them, if you do so, the modal will be 50% width and 50% height.

After you've setup your `openModal` method all you need to do is go to the component that will be loaded inside the modal and accept some configurations.

**Configure child component:**

For this example the config object's data will be a string, which is defined in the ModalConfig injected in the constructor, and the second parameter is a reference to the modal.

```javascript
import { Component, OnInit } from '@angular/core';
import { ModalConfig, ModalRef } from 'ng-custom-modal';

@Component({
  selector: 'app-test-modal',
  template: `{{ data }}`,
  styleUrls: ['./test-modal.component.scss'],
})
export class TestModalComponent implements OnInit {
  data = '';
  constructor(public config: ModalConfig<string>, public modal: ModalRef) {}

  ngOnInit(): void {
    if (this.config?.data) {
      this.data = this.config.data;
    }
  }
}

```

In order to close the modal you only need to call `this.modal.close()` and it should automatically close.

If you need any data to the parent component, you can optionally add any value to the close method.

**Do actions on modal close:**
I can also store the recently opened modal in a variable and then subscribe to `afterClosed`, thus, I will be able to trigger an action when the modal is closed. Here's an example:

```javascript
// imports

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'test-modal-package';
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    const modalRef = this.modalService.open<TestModalComponent, string>(
      TestModalComponent,
      { data: 'this is a string', width: '400px', height: '250px' }
    );
    modalRef.afterClosed.subscribe((data) => {
      console.log(data);
      console.log('modal was closed');
    });
  }
}
```

For this to work, I will only need to pass a value to the close method in `TestModalComponent`:

```javascript
  onClose() {
    this.modal.close({ confirmed: true });
  }
```

And that would be it, I will try to apply some other improvements to the package so if you have any ideas or would like to contribute in any way, it would be awesome.
