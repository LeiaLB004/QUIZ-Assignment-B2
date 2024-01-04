/**
 * The high-score web component module.
 *
 * @author Leia Lindberg <ll224np@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
<style>
    /* Add your styles here if needed */
    table {
      max-width: 600px;
      border-collapse: collapse;
      margin: 25px 0;
      font-size: 0.9em;
      font-family: sans-serif;
      min-width: 400px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

    }
    th, td {
      padding: 8px;
      text-align: left;
    }
  </style>
  <table>
    <thead>
      <tr>
        <th>Rank</th>
        <th>Username</th>
        <th>Time(s)</th>
      </tr>
    </thead>
    <tbody id="highscore-body">
      <tr></tr>
    </tbody>
  </table>
`

customElements.define('high-score',

  /**
   * Represents a high-score element.
   */
  class extends HTMLElement {
    /**
     * The highscore board's body.
     */
    #highscoreBody
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      this.#highscoreBody = this.shadowRoot.querySelector('#highscore-body')
    }

    /**
     * A method for setting the highscores.
     *
     * @param {object} highScores - An object with the player's username and total time.
     */
    setHighScores (highScores) {
      this.#highscoreBody.innerHTML = ''

      highScores.sort((a, b) => a.score - b.score)

      const displayedHighscores = [...highScores, ...Array(5 - highScores.length).fill({})]

      displayedHighscores.forEach((score, index) => {
        this.addRow(index + 1, score.username || '', score.score || '')
      })
    }

    /**
     * Add a row to the table.
     *
     * @param {number} rank - Rank of the high score.
     * @param {string} username - Username the score holder.
     * @param {number} time - The time of the high score in seconds.
     */
    addRow (rank, username, time) {
      const row = document.createElement('tr')
      row.innerHTML = `
        <td>${rank}</td>
        <td>${username}</td>
        <td>${time}</td>
      `
      this.#highscoreBody.appendChild(row)
    }
  }
)
