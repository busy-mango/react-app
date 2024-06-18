# IOverlay

> Provides base styling for a fixed overlay element.

* This is useful to dim content or block pointer events behind a floating element, in addition to locking the body scroll.

``` tsx
import { IOverlay } from '@/components';
```

## Usage

### Basic select

It renders a `<div>` with base styling.

``` typescript
function App() {
  return (
    <>
      <IOverlay />
      <div>Floating element</div>
    </>
  );
}
```

### Advanced features

#### Advanced scroll lock

> If you need a more advanced solution, `react-remove-scroll` is a great option.

## API

``` tsx
<IOverlay scroll={false}>
  {/* floating element */}
</IOverlay>
```

| Name | Type | Default | Description |
|-------|-------|-------|-------|
| `scroll` | `boolean` | `true` | Whether the `<body>` is prevented from scrolling while the overlay is rendered. Uses a robust technique that works on iOS and handles horizontal scrolling. |

## Troubleshooting

### Sibling Overlay 

When using anchor positioning and the overlay in scrollable contexts, prefer making the overlay a sibling of the floating element rather than a parent container.

This will ensure the floating element does not get contained by the overlay, allowing it to be positioned out of its bounds, preventing scroll issues. It also allows the overlay to be independently animated.
