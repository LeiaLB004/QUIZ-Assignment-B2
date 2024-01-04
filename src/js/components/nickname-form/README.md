# &lt;nickname-form&gt;

A web component that allows users to choose a nickname for participating in a quiz.

## Usage
Include the <nickname-form> web component in your HTML file to create a form where users can enter their nickname for the quiz.

## Example

```html
<nickname-form></nickname-form>
```

## Events

### `startQuiz`
This component dispatches a custom event named startQuiz when the user presses Enter after entering their nickname. The event contains the chosen nickname in the event detail.

## Example

```js
document.querySelector('nickname-form').addEventListener('startQuiz', (event) => {
  const nickname = event.detail.nickname;
  console.log(`Quiz will start with the nickname: ${nickname}`);
});
```

## Methods

### `chosenNickname()`
This public method returns the nickname chosen by the user. You can use it to retrieve the chosen nickname programmatically.

## Example

```js
const nickname = document.querySelector('nickname-form').chosenNickname();
console.log(`Chosen nickname: ${nickname}`);
```

### `clearInput()`

This method clears the input field, allowing you to reset the form programmatically.

## Example

```js
document.querySelector('nickname-form').clearInput();
```
