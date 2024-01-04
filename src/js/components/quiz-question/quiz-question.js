/**
 * The quiz-question web component module.
 *
 * @author Leia Lindberg <ll224np@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
<style>
  h3 {
    font-size: 28px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    color: #4B6387;
  }
  input {
    padding: 10px;
    padding-right: 100px;
    margin: 10px 0;
    border-radius: 10px;
    font-size: 16px;
    border: 2px solid #8594A6;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }

  input:hover {
    background-color: #fafafa;
    border: 2px solid #3E4658;
  }

  label {

    padding-left: 10px;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 16px;
    color: #4B6387;
  }

  button {
    display: block;
    appearance:none;
    -webkit-appearance:none;
    padding:10px;
    border:none;
    background-color: #4B6387;
    color:#fff;
    font-weight:600;
    border-radius:5px;
  }

  button:hover {
    background-color: #A0B3C1;
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
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      this.#question = this.shadowRoot.getElementById('question')
      this.#answerOptions = this.shadowRoot.getElementById('answerOptions')
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
