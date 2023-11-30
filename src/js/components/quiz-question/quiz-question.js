/**
 * The quiz-question web component module.
 *
 * @author Leia Lindberg <ll224np@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
<style>
  button {
    display: block;
    appearance:none;
    -webkit-appearance:none;
    padding:10px;
    border:none;
    background-color:#3F51B5;
    color:#fff;
    font-weight:600;
    border-radius:5px;

  }

  button:hover {
    background-color: #5163c9;
  }
</style>

<div id="container">
  <h3 id="question">Hur många år är du?</h3>
  <div id="answerOptions"></div>
  <button id="submitBtn">Submit answer</button>
</div>
`
customElements.define('quiz-question',
  /**
   * Represents a nickname-form element.
   */
  class extends HTMLElement {
    /**
     * The question.
     */
    #question

    /**
     * The answer options.
     */
    #answerOptions

    /**
     * The submit button.
     */
    #submitBtn
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      this.#question = this.shadowRoot.getElementById('questionText')
      this.#answerOptions = this.shadowRoot.getElementById('answerOptions')
      this.#submitBtn = this.shadowRoot.getElementById('submitBtn')
    }
  }
)
