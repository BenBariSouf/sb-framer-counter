<br>

<div align="center">
  <img src="/src/assets/demo.gif" alt="framer-counter Demo">
</div>

<br>

<h1 align="center">framer-counter</h1>
<h3 align="center">A lightweight counter component for <a href="https://reactjs.org">React</a>. Inspired by Ehsan Rahimi's <a href="https://dribbble.com/shots/16434514-Tally-Counter-Micro-Interaction">Tally Counter Micro-Interaction</a> Dribbble shot, and built using typescript, Framer Motion, and styled components. </h3>

<br>

## 📖 Table of Contents

- [🚀 Getting Started](#-getting-started)
  - [🐇 Jump Start](#-jump-start)
  - [💻 Live Demo](#-live-demo)
- [⚙️ Configuration](#%EF%B8%8F-configuration)
- [♿️ Accessibility](#%EF%B8%8F-accessibility)
- [👨🏼‍⚖️ License](#%EF%B8%8F-license)

## 🚀 Getting Started

### 🐇 Jump Start

With NPM:

```shell
npm i sb-framer-counter
```

With Yarn:

```shell
yarn add sb-framer-counter
```

```jsx
import { useState } from "react";
import { FramerCounter } from "sb-framer-counter";

function Example() {
	const [value, setValue] = useState(10);
	return (
		<FramerCounter
			minimumValue={10}
			maximumValue={100}
			stepValue={10}
			initialValue={0}
			size="md"
			inactiveTrackColor="#fed7aa"
			activeTrackColor="#fddec0"
			activeButtonColor="#ffedd5"
			inactiveIconColor="#fb923c"
			hoverIconColor="#ea580c"
			activeIconColor="#9a3412"
			disabledIconColor="#fdba74"
			thumbColor="#f97316"
			thumbShadowAnimationOnTrackHoverEnabled={false}
			focusRingColor="#fff7ed"
			onChange={(value) => {
				setValue(value);
			}}
		/>
	);
}
```

### 💻 Live Demo

[![Open in CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/dazzling-colden-o47bi0?file=%2Fsrc%2FApp.tsx)

## ⚙️ Configuration

`FramerCounter` supports the following props:

| Prop                                        | Type     | Default value             | Description                                                                                                                                                                 |
| ------------------------------------------- | -------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| minimumValue                                | number   | `0`                       | The minimum value.                                                                                                                                                          |
| maximumValue                                | number   | `Number.MAX_SAFE_INTEGER` | The maximum value.                                                                                                                                                          |
| stepValue                                   | number   | `1`                       | The step increment value.                                                                                                                                                   |
| initialValue                                | number   | `minimumValue`            | The initial value.                                                                                                                                                          |
| onChange                                    | Function | `undefined`               | The callback invoked when the value changes.                                                                                                                                |
| size                                        | string   | `sm`                      | The size of the numeric counter. There are 4 available sizes:<ul><li>`xs` — 92.5x37px</li><li>`sm` — 185x74px</li><li>`md` — 277.5x111px</li><li>`lg` — 370x148px</li></ul> |
| inactiveTrackColor                          | string   | `#2b2b2b`                 | The color of the track while the thumb is not being horizontally dragged.                                                                                                   |
| activeTrackColor                            | string   | `#1f1f1f`                 | The color of the track while the thumb is being horizontally dragged and is at the maximum trackable distance from the track's center.                                      |
| hoverButtonColor                            | string   | `transparent`             | The color of the decrement/increment button in a hover state.                                                                                                               |
| activeButtonColor                           | string   | `#ececec`                 | The color of the decrement/increment button in an active state.                                                                                                             |
| inactiveIconColor                           | string   | `#858585`                 | The color of the decrement/increment button icon in an inactive state.                                                                                                      |
| hoverIconColor                              | string   | `#ffffff`                 | The color of the decrement/increment button icon in a hover state.                                                                                                          |
| activeIconColor                             | string   | `#000000`                 | The color of the decrement/increment button icon in an active state.                                                                                                        |
| disabledIconColor                           | string   | `#383838`                 | The color of the decrement/increment button icon in a disabled state.                                                                                                       |
| thumbColor                                  | string   | `#444444`                 | The color of the thumb.                                                                                                                                                     |
| thumbLabelColor                             | string   | `#ffffff`                 | The color of the thumb's label.                                                                                                                                             |
| thumbShadowAnimation<br>OnTrackHoverEnabled | boolean  | `true`                    | If `true`, the thumb's shadow will animate when hovering over the track.                                                                                                    |
| focusRingColor                              | string   | `#ececec`                 | The color of the focus ring of the interactive elements.                                                                                                                    |

In order to customise the thumb's font settings, we can use CSS, like so:

```css
[data-testid="framer-counter-thumb"] {
	font-family: "Times New Roman", Times, serif;
	font-style: italic;
	font-weight: 800;
}
```

## ♿️ Accessibility

In order to comply with the web accessibility standards, we must make use of the `decrementButtonAriaLabel` and `incrementButtonAriaLabel` props, like so:

```jsx
function AccessibleExample() {
	return <FramerCounter decrementButtonAriaLabel="Decrement" incrementButtonAriaLabel="Increment" />;
}
```

Also, we can use a `thumbAriaLabel` prop to provide a description for the value rendered inside a thumb, like so:

```jsx
function EnhancedThumbAccessibilityExample() {
	const [value, setValue] = useState(0);
	return (
		<FramerCounter
			thumbAriaLabel={`${value} items`}
			onChange={(value) => {
				setValue(value);
			}}
		/>
	);
}
```

## 👨🏼‍⚖️ License

[MIT](https://github.com/BenBariSouf/sb-framer-counter/blob/main/LICENSE)
