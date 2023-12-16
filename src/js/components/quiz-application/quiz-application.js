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
     * The current question data.
     */
    #questionData

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      this.#nicknameForm = this.shadowRoot.querySelector('nickname-form')
      this.#quizQuestion = this.shadowRoot.querySelector('quiz-question')

      // Initialize #questionData
      this.#questionData = null

      // Bind methods to the current instance
      this.fetchQuestion = this.fetchQuestion.bind(this)
      this.submitAnswer = this.submitAnswer.bind(this)

      // Fetch the first question
      this.fetchQuestion()
    }

    /**
     * A method which fetches the first question.
     */
    async fetchQuestion () {
      try {
        const response = await fetch('https://courselab.lnu.se/quiz/question/1')
        this.#questionData = await response.json()

        this.#quizQuestion.setQuestionData(this.#questionData, this.submitAnswer.bind())
      } catch (error) {
        console.error('Error fetching question:', error.message)
      }
    }

    /**
     * Submits the user's answer to the server.
     *
     * @param {string} a - The user's answer to be submitted.
     */
    async submitAnswer (a) {
      try {
        await fetch(this.#questionData.nextURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            answer: a
          })
        })
      } catch (error) {
        console.error('Error fetching question:', error.message)
      }
    }
  }

)
