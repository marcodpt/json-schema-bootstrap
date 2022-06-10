# json-schema-bootstrap
My json-schema bootstrap5 user interface

[Live demo](https://marcodpt.github.io/h/?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fmarcodpt%2Fjson-schema-bootstrap%2Fsamples.js)

## Usage
### Form sample
```js
import jsb from 'https://cdn.jsdelivr.net/gh/marcodpt/json-schema-bootstrap/index.js'

console.log(jsb({
  schema: {
    title: 'Docs Form',
    properties: {
      name: {},
      bio: {
        title: '',
        description: 'Say something about yourself...',
        format: 'text'
      }
    },
    default: {
      name: 'John'
    }
  },
  options: {
    resolve: data => console.log(JSON.stringify(data, undefined, 2))
  }
}))
```

```html
<form novalidate="">
  <fieldset>
    <legend>Docs Form</legend>
    <div class="row my-3">
      <div class="col-md-3">
        <label class="form-label">name</label>
      </div>
      <div class="col-md-9">
        <div>
          <input class="form-control" type="text" value="John">
          <div class="invalid-feedback"></div>
        </div>
      </div>
    </div>
    <div class="row my-3">
      <div class="col-md-12">
        <div>
          <textarea
            class="form-control"
            rows="6"
            placeholder="Say something about yourself..."
          ></textarea>
          <div class="invalid-feedback"></div>
        </div>
      </div>
    </div>
    <div class="row g-3 align-items-center">
      <div class="col-auto">
        <button class="btn btn-primary" type="button">
          <i class="fas fa-check"></i> Submit
        </button>
      </div>
    </div>
  </fieldset>
</form>
```

### Table sample
```js
import jsb from 'https://cdn.jsdelivr.net/gh/marcodpt/json-schema-bootstrap/index.js'

console.log(jsb({
  schema: {
    title: 'Docs Table',
    links: [
      {
        title: 'Post',
        href: '#/post',
        ui: 'btn btn-success',
        icon: 'fas fa-pencil-alt',
        rel: 'self'
      }
    ],
    items: {
      properties: {
        id: {},
        register: {
          format: 'date'
        },
        name: {
          href: '#?name={name}'
        }
      },
      links: [
        {
          href: '#/delete/{id}',
          rel: 'self',
          icon: 'fas fa-trash',
          ui: 'btn btn-danger btn-sm'
        }, {
          href: '#/edit/{id}',
          rel: 'self',
          icon: 'fas fa-edit',
          ui: 'btn btn-warning btn-sm'
        }
      ]
    },
    default: [
      {
        id: 1,
        register: '2021-03-02',
        name: 'Liam' 
      }, {
        id: 2,
        register: '2021-01-05',
        name: 'Olivia'
      }
    ]
  }
}))
```

```html
<table class="table table-bordered table-center table-striped table-hover">
  <thead>
    <tr>
      <th class="text-center" colspan="100%"><span>Docs Table</span></th>
    </tr>
    <tr>
      <th class="text-center" colspan="100%">
        <div class="row gx-1 justify-content-center">
          <div class="col-auto">
            <a class="btn btn-success" href="#/post">
              <i class="fas fa-pencil-alt"></i> Post
            </a>
          </div>
        </div>
      </th>
    </tr>
    <tr>
      <th class="text-center align-middle">
        <a class="btn btn-danger btn-sm disabled" href="">
          <i class="fas fa-trash"></i>
        </a>
      </th>
      <th class="text-center align-middle">
        <a class="btn btn-warning btn-sm disabled" href="">
          <i class="fas fa-edit"></i>
        </a>
      </th>
      <th class="text-center align-middle"><span>id</span></th>
      <th class="text-center align-middle"><span>register</span></th>
      <th class="text-center align-middle"><span>name</span></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="text-center align-middle">
        <a class="btn btn-danger btn-sm" href="#/delete/1">
          <i class="fas fa-trash"></i>
        </a>
      </td>
      <td class="text-center align-middle">
        <a class="btn btn-warning btn-sm" href="#/edit/1">
          <i class="fas fa-edit"></i>
        </a>
      </td>
      <td class="text-center align-middle">
        <span>1</span>
      </td>
      <td class="text-center align-middle">
        <span>3/1/2021</span>
      </td>
      <td class="text-center align-middle">
        <a href="#?name=Liam">Liam</a>
      </td>
    </tr>
    <tr>
      <td class="text-center align-middle">
        <a class="btn btn-danger btn-sm" href="#/delete/2">
          <i class="fas fa-trash"></i>
        </a>
      </td>
      <td class="text-center align-middle">
        <a class="btn btn-warning btn-sm" href="#/edit/2">
          <i class="fas fa-edit"></i>
        </a>
      </td>
      <td class="text-center align-middle">
        <span>2</span>
      </td>
      <td class="text-center align-middle">
        <span>1/4/2021</span>
      </td>
      <td class="text-center align-middle">
        <a href="#?name=Olivia">Olivia</a>
      </td>
    </tr>
  </tbody>
</table>
```

## Params
 - object `schema`: JSON schema (or hyperschema) of the element
 - object `options`: Optional object with config options, properties:
   - function `resolve`(`data`): A function that will be called with current 
      UI data every time user resolve it and pass validation.
   - function `reject`(`error`, `data`): A function that will be called with
      an error message and current data every time user resolve it and DO NOT
      pass validation.
   - function `loader`(`url`): A function that returns a promise with the
      result of fetch `url`.
   - boolean `showValid` (default: false): Wherever you want to use valid
      interface on user input.
   - string `language` (default: en): One of the available languages
      (`en`: English, `pt`: Portuguese). Please help us extend the supported 
      languages in the folder [lang](https://github.com/marcodpt/json-schema-bootstrap/tree/main/lang).
   - object `interfaces` (default: {}): User defined interfaces, properties:
     - string `keys`: name of the interface, to be used with `format` property.
     - function `values`(`schema`, `submit`(`data`), `options`): A function
      that defines a new user interface, where `schema` and `options` is the
      original variables passed, and `submit` is a function to update the
      the input value (in case `submit` is `null` it is a read only output).

## TODO
 - auto submit problem
 - after submit form, a DOM element should replace itself
 - showValid bug
