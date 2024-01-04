# &lt;countdown-timer&gt;

A web component that represents a countdown timer with a customizable time limit. The timer updates at regular intervals and dispatches a timeOut event when the countdown reaches zero.

## Usage
Include the <countdown-timer> web component in your HTML file to create a countdown timer with a specified time limit.

## Example

```html
<countdown-timer limit="60"></countdown-timer>
```

## Attributes

### `limit`
A numeric attribute representing the initial time limit in seconds. This attribute is dynamic, and changes to it will trigger the countdown timer to reset.

## Example

```html
<countdown-timer limit="60"></countdown-timer>
```

## Methods

### `resetTimer(limit)`
This method resets the countdown timer with a new time limit.

## Example

```js
const countdownTimer = document.querySelector('countdown-timer');
countdownTimer.resetTimer(120);
```

### `startTimer(limit)`
Starts the countdown timer and updates the display at regular intervals. It calculates the elapsed time and continuously updates the current limit based on that elapsed time. The timer's display is updated every second, and when the timer reaches or passes 0, it stops the interval and dispatches a timeOut event.

### `stopCountdown()`
This method stops the countdown timer. It clears the interval and halts the countdown

## Example

```js
const countdownTimer = document.querySelector('countdown-timer');
countdownTimer.stopCountdown();
```
## Events

### `timeOut`
This component dispatches a custom event named timeOut when the countdown reaches or passes zero. You can listen for this event and perform any necessary actions when the timer runs out.

## Example

```js
document.querySelector('countdown-timer').addEventListener('timeOut', () => {
  console.log('Countdown timer has reached zero!');
  // Perform actions when the timer runs out
});
```