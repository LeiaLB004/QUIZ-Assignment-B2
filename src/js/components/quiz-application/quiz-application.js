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
nickname-form {
  display: none;
}
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

      this.fetchQuestion()
    }

    /**
     * A method which fetches the first question.
     */
    async fetchQuestion () {
      try {
        const response = await fetch('https://courselab.lnu.se/quiz/question/1')
        const questionData = await response.json()

        this.#quizQuestion.setQuestionData(questionData)
      } catch (error) {
        console.error('Error fetching question:', error.message)
      }
    }
  }

)
