/**
 * The quiz-application web component module.
 *
 * @author Leia Lindberg <ll224np@student.lnu.se>
 * @version 1.1.0
 */

import '../nickname-form/index.js'
import '../quiz-question/index.js'

const template = document.createElement('template')
template.innerHTML = `

<style> 

</style>

<div id="quiz-container">
  <!-- Nickname form -->
  <nickname-form></nickname-form>

  <!-- Quiz question -->
  <quiz-question></quiz-question>
</div>
`

customElements.define('quiz-application',

  /**
   * Represents a quiz-application element.
   */
  class extends HTMLElement {
    /**
     * A quiz question element.
     */
    #quizQuestion

    /**
     * A nickname form element.
     */
    #nicknameForm

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      this.#nicknameForm = this.shadowRoot.querySelector('nickname-form')
      this.#quizQuestion = this.shadowRoot.querySelector('quiz-question')
    }
  }

)
