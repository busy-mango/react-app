# ISelector

> Select components are used for collecting user provided information from a list of options.

```tsx
import { ISelector } from '@/components';

const options = [
  { value: 10, lable: 'Ten' },
  { value: 20, lable: 'Twenty' },
  { value: 30, lable: 'Thirty' },
];

function App() {
  return <ISelector options={options} />;
}
```

## Usage

### Basic select

Menus are positioned under their emitting elements, unless they are close to the bottom of the viewport.

```tsx
const options = [
  { value: 10, lable: 'Ten' },
  { value: 20, lable: 'Twenty' },
  { value: 30, lable: 'Thirty' },
];

function App() {
  return <ISelector options={options} />;
}
```

[![Open in Sandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/busy-mango/react-app/main?embed=1&file=%2Fsrc%2Fexamples%2Fselector%2Fbasic.tsx&showConsole=true)

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/busy-mango/react-app?file=src%2Fpages%2Findex.tsx)

### Advanced features

#### Multiple

The component can handle multiple selections. It's enabled with the `multiple` prop.

Like with the single selection, you can pull out the new value by accessing `value` in the `onChange` callback. It's always an array.

```tsx
const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const options = names.map((value) => ({ value }));

export default function MultipleSelect() {
  const [age, setAge] = useState<React.Key>();

  const onChange = function (value?: React.Key | React.Key[]) {
    setAge(iCompact(iArray(value)));
  };

  return (
    <form>
      <ISelector
        multiple
        options={options}
        separator=","
        value={age}
        onChange={onChange}
      />
    </form>
  );
}
```

[![Open in Sandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/busy-mango/react-app/main?embed=1&file=%2Fsrc%2Fexamples%2Fselector%2Fmultiple.tsx)

#### Controlling the open state

## API

| Name                 | Type                                           | Default      | Description                                                                                                                                                     |
| -------------------- | ---------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autoFocus`          | `boolean`                                      | `-`          | Whether to get focus by default.                                                                                                                                |
| `clear`              | `ReactNode`                                    | `true`       | Icon for the clear button, default is true to show the default icon, set false to disable the clear button.                                                     |
| `defaultValue`       | `string`                                       | `-`          | The default value. Use when the component is not controlled.                                                                                                    |
| `filter`             | `boolean` \| `ISelectorFilterParams`           | `-`          | Option filter configuration.                                                                                                                                    |
| `iFloatingClassName` | `string`                                       | `-`          | Floating element className.                                                                                                                                     |
| `iFloatingRoot`      | `QueryFloatingRootFunc`                        | `-`          | Floating are rendered to the root by default, or you can specify the root node using this method.                                                               |
| `isLoading`          | `boolean`                                      | `false`      | Control loading UI.                                                                                                                                             |
| `initialOpen`        | `boolean`                                      | `false`      | If true, floating will open on mount.                                                                                                                           |
| `keyword`            | `string`                                       | `-`          | Control search text state.                                                                                                                                      |
| `maxHeight`          | `string`                                       | `-`          | Set scrollable height.                                                                                                                                          |
| `measure`            | `string`                                       | `false`      | If true, scrollable will auto measure item height.                                                                                                              |
| `multiple`           | `boolean`                                      | `false`      | Callbacks for expanding scrollable.                                                                                                                             |
| `open`               | `boolean`                                      | `-`          | Control floating open state.                                                                                                                                    |
| `options`            | `string`                                       | `-`          | Select options.                                                                                                                                                 |
| `pattern`            | `ControlPattern`                               | `editable`   | Setting the control interaction mode                                                                                                                            |
| `prefix`             | `ReactNode`                                    | `-`          | Customized prefix icons.                                                                                                                                        |
| `separator`          | `ReactNode`                                    | `-`          | Separators for automatic word separation                                                                                                                        |
| `size`               | `ControlUISize`                                | `"medium"`   | Selection wrap size                                                                                                                                             |
| `status`             | `ControlUIStatus`                              | `"success"`  | Setting the calibration status                                                                                                                                  |
| `suffix`             | `ReactNode`                                    | `-`          | Customized suffix icons.                                                                                                                                        |
| `value`              | `React.Key[]` \| `React.Key`                   | `-`          | The input value. Providing an null will select no options. Set to an `null` if you don't want any of the available options to be selected.                      |
| `variant`            | `"filled"` \| `"standard"` \| `"bordered"`     | `"bordered"` | Morphological variant                                                                                                                                           |
| `render.chip`        | `IOptionRender`                                | `-`          | Rendering method for chip                                                                                                                                       |
| `render.option`      | `IOptionRender`                                | `-`          | Rendering method for option                                                                                                                                     |
| `render.scrollable`  | `(props: ScrollableProps) => ReactNode`        | `-`          | Rendering method for scrollable                                                                                                                                 |
| `onChange`           | `(value?: React.Key[] \| React.Key) => void`   | `-`          | Callback fired when a menu item is selected. <br/> Warning: This is a generic event, not a change event, unless the change event is caused by browser autofill. |
| `onOpenChange`       | `(open?: boolean) => void`                     | `-`          | -                                                                                                                                                               |
| `onScroll`           | `UIEventHandler<HTMLDivElement>`               | `-`          | Callbacks when scrolling a scrollable.                                                                                                                          |
| `onSearch`           | `(value?: string) => void`                     | `-`          | Callback when search value changes.                                                                                                                             |
| `onSelect`           | `(index: number, value?: React.Key[]) => void` | `-`          | Called when selected, parameter is the value (or key) of the selected item.                                                                                     |

## Troubleshooting
