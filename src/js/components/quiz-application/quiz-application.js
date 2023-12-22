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

  <h2></h2>

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
     * A header element.
     */
    #headerElement

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      this.#nicknameForm = this.shadowRoot.querySelector('nickname-form')
      this.#quizQuestion = this.shadowRoot.querySelector('quiz-question')
      this.#headerElement = this.shadowRoot.querySelector('h2')

      this.submitAnswer = this.submitAnswer.bind(this)

      this.#nicknameForm.addEventListener('startQuiz', async (event) => {
        try {
          this.fetchQuestion()
        } catch (error) {
          console.error('Error:', error.message)
        }
      })
    }

    /**
     * Method to fetch the questions and starting the quiz.
     */
    async fetchQuestion () {
      try {
        const response = await fetch('https://courselab.lnu.se/quiz/question/1')
        // Fetch the first question
        this.#questionData = await response.json()

        this.#nicknameForm.style.display = 'none'
        this.#quizQuestion.style.display = 'block'
        this.#headerElement.innerHTML = 'Welcome to the quiz ' + this.#nicknameForm.chosenNickname() + '!'

        this.#quizQuestion.setQuestionData(this.#questionData, this.submitAnswer)
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

        if (responseData.nextURL) {
          // Get the next response
          const nextResponse = await fetch(responseData.nextURL)
          // Get the data of the next question
          const nextQuestionData = await nextResponse.json()

          this.#questionData = nextQuestionData

          this.#quizQuestion.setQuestionData(this.#questionData, this.submitAnswer)
        } else {
          console.log('You completed the quiz!')
          this.endQuiz()
        }
      } catch (error) {
        console.error('Error fetching question:', error.message)
      }
    }

    /**
     * A method for ending the quiz.
     */
    async endQuiz () {
      this.#headerElement.innerHTML = 'Great! You finished the quiz!'
      this.#nicknameForm.style.display = 'block'
      this.#quizQuestion.style.display = 'none'
    }
  }

)
