# ISelector

> Select components are used for collecting user provided information from a list of options.


``` tsx
import { ISelector } from '@/components';

const options = [
  { value: 10, lable: 'Ten' },
  { value: 20, lable: 'Twenty' },
  { value: 30, lable: 'Thirty' },
];

function App() {
  return (
    <ISelector options={options} />
  );
}
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/busy-mango/react-app?file=src%2Fpages%2Findex.tsx)

## Usage

### Basic select

Menus are positioned under their emitting elements, unless they are close to the bottom of the viewport.

``` tsx
const options = [
  { value: 10, lable: 'Ten' },
  { value: 20, lable: 'Twenty' },
  { value: 30, lable: 'Thirty' },
];

function App() {
  return (
    <ISelector options={options} />
  );
}
```

### Advanced features

#### Multiple

The component can handle multiple selections. It's enabled with the `multiple` prop.

Like with the single selection, you can pull out the new value by accessing `value` in the `onChange` callback. It's always an array.

#### Controlling the open state

## API

| Name | Type | Default | Description |
|-------|-------|-------|-------|
| `autoFocus` | `boolean` | - | Whether to get focus by default. |
| `clear` | `ReactNode` | `true` | Icon for the clear button, default is true to show the default icon, set false to disable the clear button. |
| `defaultValue` | `string` | - | The default value. Use when the component is not controlled. |
| `filter` | `boolean` \| `ISelectorFilterParams` | - | Option filter configuration. |
| `iFloatingRoot` | `QueryFloatingRootFunc` | - | Floats are rendered to the root by default, or you can specify the root node using this method. |
| `multiple` | `boolean` | `false` | If true, value must be an array and the menu will support multiple selections. |
| `onChange` | `func` | - | Callback fired when a menu item is selected. <br/> Warning: This is a generic event, not a change event, unless the change event is caused by browser autofill. |
| `open` | `boolean` | - | If true, the component is shown |
| `value` | `boolean` | - | The input value. Providing an null will select no options. Set to an `null` if you don't want any of the available options to be selected. |

## Troubleshooting
