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
      width: 600px;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      border: 1px solid #ddd;
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
    <tbody id="highscore-body"></tbody>
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
     * Add a row to the table.
     *
     * @param {*} rank - Rank of the high score.
     * @param {*} username - Username the score holder.
     * @param {*} time - The time of the high score in seconds.
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
