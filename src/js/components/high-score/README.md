# &lt;high-score&gt;

A web component that represents a high-score table. This component is designed to display the rankings of players based on their usernames and total time scores. It provides a clean and organized table format for showcasing high scores.

## Usage
Include the <high-score> web component in your HTML file to create a high-score table.

```html
<high-score></high-score>
```

## Methods

### `setHighScores(highScores)`
This method sets the high scores in the high-score table. It takes an array of objects with player information, including username and score. The table is automatically sorted based on the scores in ascending order.

## Example

```js
const highScoreTable = document.querySelector('high-score');
const sampleHighScores = [
  { username: 'Player1', score: 120 },
  { username: 'Player2', score: 90 },
  // ... additional high scores
];
highScoreTable.setHighScores(sampleHighScores);
```

### `addRow(rank, username, time)`

The addRow method is used to dynamically add a row to the high-score table. This method is responsible for populating the table with information about a player's rank, username, and total time.

## Example

```js
const highScoreBoard = document.querySelector('high-score');

// Add a row for a player with rank 1, username 'Player1', and total time 120 seconds.
highScoreBoard.addRow(1, 'Player1', 120);
```
