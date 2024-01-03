/**
 * The quiz-question web component module.
 *
 * @author Leia Lindberg <ll224np@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
<style>
  input {
    display: box;
    padding: 10px;
    margin: 10px 0;
    border-radius: 10px;
    font-family:inherit;
    font-size: inherit;
    border: 2px solid grey;
  }

  input:hover {
    background-color: #fafafa;
    border: 2px solid lightgrey;
  }

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

  #answerOptions {
    margin-bottom: 20px;
  }

  #answerOptions input[type="radio"]{
    margin-left: 10px;
  }
</style>

<div id="container">
  <h3 id="question"></h3>
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

      this.#question = this.shadowRoot.getElementById('question')
      this.#answerOptions = this.shadowRoot.getElementById('answerOptions')
      this.#submitBtn = this.shadowRoot.getElementById('submitBtn')

      this.#submitBtn.addEventListener('click', this.#handleSubmit.bind(this))
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.#answerOptions.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault()
          this.#handleSubmit()
        }
      })
    }

    /**
     * A public method for setting question data recieved from the API.
     *
     * @param {object} questionData - An object with the data for the questions.
     * @param {string} submitAnswer - The user's answer to be submitted.
     */
    setQuestionData (questionData, submitAnswer) {
      this.#question.textContent = questionData.question

      this.#answerOptions.innerHTML = ''

      if (questionData.alternatives) {
        this.multipleChoiceInput(questionData.alternatives)
      } else {
        this.textInput()
      }

      // Save the method submitAnswer
      this.submitAnswer = submitAnswer
    }

    /**
     * Method for the questions with text input.
     */
    textInput () {
      const input = document.createElement('input')
      input.type = 'text'
      input.placeholder = 'Type here and press enter'

      // Clear existing optiones
      this.#answerOptions.innerHTML = ''
      this.#answerOptions.appendChild(input)
    }

    /**
     * Renders multiple-choice input options based on the provided alternatives.
     *
     * @param {object} alternatives - An object containing key-value pairs representing the alternatives for a multiple-choice question.
     */
    multipleChoiceInput (alternatives) {
      for (const [key, value] of Object.entries(alternatives)) {
        const radio = document.createElement('input')
        radio.type = 'radio'
        radio.name = 'answerOptions'
        radio.id = key
        radio.value = value

        const label = document.createElement('label')
        label.setAttribute('for', key)
        label.textContent = `${value}`

        this.#answerOptions.appendChild(radio)
        this.#answerOptions.appendChild(label)
      }
    }

    /**
     * Method for handling the submit button.
     */
    #handleSubmit () {
      const answer = this.chosenAnswer()
      // Call the method to submit the answer
      this.submitAnswer(answer)
    }

    /**
     * Method which returns the user's answer based on the question.
     *
     * @returns {string | null} The user's answer.
     */
    chosenAnswer () {
      const textInput = this.#answerOptions.querySelector('input[type="text"]')
      const selectedRadio = this.#answerOptions.querySelector('input[type="radio"]:checked')
      if (textInput) {
        return textInput.value
      } else if (selectedRadio) {
        return selectedRadio.id
      }
      return null
    }
  }
)
