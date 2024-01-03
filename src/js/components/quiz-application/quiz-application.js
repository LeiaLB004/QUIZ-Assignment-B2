/**
 * The quiz-application web component module.
 *
 * @author Leia Lindberg <ll224np@student.lnu.se>
 * @version 1.1.0
 */

import '../nickname-form/index.js'
import '../quiz-question/index.js'
import '../countdown-timer/index.js'
import '../high-score/index.js'

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

nickname-form {
  display: block;
}
quiz-question {
  display: none;
}

countdown-timer {
  display: none;
}

high-score {
  display: none;
  margin-bottom: 20px;
}

#restartButton {
  display: none;
}
</style>

<div id="quizContainer">
  <h1>The Quiz</h1>
  <!-- Nickname form -->
  <nickname-form></nickname-form>

  <h2></h2>

  <countdown-timer></countdown-timer>
  <!-- Quiz question -->
  <quiz-question></quiz-question>
  
  <high-score></high-score>
  <button id="restartButton">Restart Quiz</button>

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
     * A countdown timer.
     */
    #countdownTimer

    /**
     * A high score board.
     */
    #highScore

    /**
     * A restart button.
     */
    #restartButton

    /**
     * Is true if the quiz is completed.
     */
    #completeQuiz = false

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      this.#nicknameForm = this.shadowRoot.querySelector('nickname-form')
      this.#quizQuestion = this.shadowRoot.querySelector('quiz-question')
      this.#countdownTimer = this.shadowRoot.querySelector('countdown-timer')
      this.#highScore = this.shadowRoot.querySelector('high-score')
      this.#restartButton = this.shadowRoot.querySelector('#restartButton')

      this.submitAnswer = this.submitAnswer.bind(this)

      this.#nicknameForm.addEventListener('startQuiz', async (event) => {
        try {
          this.fetchQuestion()
        } catch (error) {
          console.error('Error:', error.message)
        }
      })

      this.#countdownTimer.addEventListener('timeOut', () => {
        this.endQuiz()
        this.#nicknameForm.style.display = 'none'
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
        this.#countdownTimer.style.display = 'block'
        this.#nicknameForm.style.display = 'none'
        this.#quizQuestion.style.display = 'block'

        // Show the countdown timer
        this.#quizQuestion.setQuestionData(this.#questionData, this.submitAnswer)
        this.timer()
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

        // Do this if the player answer wrong.
        if (!response.ok) {
          console.log('Jaha, det gick ju inte värst bra..')
          this.#completeQuiz = false
          this.endQuiz()
          // If the player answer right, do this.
        } else {
          // Get the data of the response
          const responseData = await response.json()

          if (responseData.nextURL) {
          // Get the next response
            const nextResponse = await fetch(responseData.nextURL)
            // Get the data of the next question
            const nextQuestionData = await nextResponse.json()

            this.#questionData = nextQuestionData

            this.#quizQuestion.setQuestionData(this.#questionData, this.submitAnswer)
            this.timer()
            // Do this if the player finished the quiz.
          } else {
            this.#completeQuiz = true
            this.endQuiz()
          }
        }
      } catch (error) {
        console.error('Error fetching question:', error.message)
      }
    }

    /**
     * Sets the timer limit based on the question data.
     */
    timer () {
      // Set the initial limit for the countdown timer based on the question data.
      const limit = this.#questionData.limit || 20
      this.#countdownTimer.setAttribute('limit', limit)
    }

    /**
     * A method for ending the quiz.
     */
    endQuiz () {
      if (this.#completeQuiz) {
        console.log('Yes, You did it!')
      }
      this.#countdownTimer.disconnectedCallback()
      this.#quizQuestion.style.display = 'none'
      this.#countdownTimer.style.display = 'none'
      this.#highScore.style.display = 'block'
      this.#restartButton.style.display = 'block'

      this.restartQuiz()
    }

    /**
     * A method for restarting the quiz.
     */
    restartQuiz () {
      this.#restartButton.addEventListener('click', () => {
        this.#nicknameForm.clearInput()
        this.#nicknameForm.style.display = 'block'
        this.#highScore.style.display = 'none'
        this.#restartButton.style.display = 'none'
      })
    }
  }
)
