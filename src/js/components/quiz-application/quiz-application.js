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
  display: block;
}
quiz-question {
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

      this.submitAnswer = this.submitAnswer.bind(this)

      // Fetch the first question
      this.#nicknameForm.addEventListener('startQuiz', async (event) => {
        try {
          const response = await fetch('https://courselab.lnu.se/quiz/question/1')
          this.#questionData = await response.json()

          this.#nicknameForm.style.display = 'none'
          this.#quizQuestion.style.display = 'block'

          this.#quizQuestion.setQuestionData(this.#questionData, this.submitAnswer)
        } catch (error) {
          console.error('Error fetching question:', error.message)
        }
      })
    }

    /**
     * Submits the user's answer to the server.
     *
     * @param {string} a - The user's answer to be submitted.
     */
    async submitAnswer (a) {
      try {
        const response = await fetch(this.#questionData.nextURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            answer: a
          })
        })

        // Get the data of the response
        const responseData = await response.json()
        // Get the next response
        const nextResponse = await fetch(responseData.nextURL)
        // Get the data of the next question
        const nextQuestionData = await nextResponse.json()

        this.#questionData = nextQuestionData

        this.#quizQuestion.setQuestionData(this.#questionData, this.submitAnswer)
      } catch (error) {
        console.error('Error fetching question:', error.message)
      }
    }
  }

)
