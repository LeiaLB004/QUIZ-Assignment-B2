# &lt;quiz-application&gt;

The Quiz Application Web Component is a customizable and reusable web component built using web technologies like HTML, CSS, and JavaScript. It allows users to participate in a quiz by answering questions and provides features such as a countdown timer, high score tracking, and the ability to restart the quiz.

## Usage
Include the <quiz-application> web component in your HTML file.

```html
<quiz-application></quiz-application>
```

## Dependencies
This component relies on the following external components:

Nickname Form: Responsible for collecting user nicknames.
Quiz Question: Handles the presentation and submission of quiz questions.
Countdown Timer: Manages the countdown for each question.
High Score: Displays the top high scores.

Ensure that these components are also included in your project for the Quiz Application to function correctly.

## Methods

### `timer()`
Sets the initial limit for the countdown timer based on the current question data.

### `userTime()`
Calculates the player's total time taken to complete the quiz.

### `storeHighScore(totalTime)`
Stores the player's high score in the local storage and updates the high score board.

### `showHighScoreBoard()`
Displays the high score board with the top 5 high scores.

### `endQuiz()`
Ends the quiz, displaying appropriate messages and handling UI changes.

### `restartQuiz()`
Listens for the restart button click and resets the quiz for a new session.

## Events

### `startQuiz`
Fired when the user submits a nickname to start the quiz.

### `timeOut`
Fired when the countdown timer reaches zero, indicating the end of the quiz session.
