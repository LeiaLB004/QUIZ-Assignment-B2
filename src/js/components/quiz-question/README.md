# &lt;quiz-question&gt;

A web component that represents a quiz question with user interaction options, such as text input or multiple-choice answers.

## Usage
Include the <quiz-question> web component in your HTML file to create an interactive quiz question with customizable options.

```html
<quiz-question></quiz-question>
```

## Methods

### `setQuestionData(questionData, submitAnswer)`
This method sets the question data received from the API and the callback function for submitting the user's answer.

## Example

```js
const questionData = {
  question: 'What is the capital of France?',
  alternatives: {
    a: 'Berlin',
    b: 'Paris',
    c: 'Madrid'
  }
};

const submitAnswer = (answer) => {
  console.log(`User's answer: ${answer}`);
};

document.querySelector('quiz-question').setQuestionData(questionData, submitAnswer);
```

### `chosenAnswer()`
This method returns the user's chosen answer based on the question type (text input or multiple-choice).

## Example

```js
const answer = document.querySelector('quiz-question').chosenAnswer();
console.log(`Chosen answer: ${answer}`);
```

### `textInput()`
This method renders the input field for text-based questions.

### `multipleChoiceInput(alternatives)`
This method renders the multiple-choice input options based on the provided alternatives.

## Events

### `submitAnswer`
This component dispatches a custom event named submitAnswer when the user submits their answer. The event contains the user's answer in the event detail.

## Example

```js
document.querySelector('quiz-question').addEventListener('submitAnswer', (event) => {
  const userAnswer = event.detail.answer;
  console.log(`User submitted answer: ${userAnswer}`);
});
```
