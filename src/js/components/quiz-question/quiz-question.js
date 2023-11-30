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
     * The type of question.
     */
    #questionType

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

    /**
     * Method for the questions with text input.
     */
    textInput () {
      const input = document.createElement('input')
      input.type = 'text'
      input.placeholder = 'Type your answer here'
      // Clear existing optiones
      this.#answerOptions.innerHTML = ''
      this.#answerOptions.appendChild(input)
    }

    /**
     * Method for the multiple-choice questions.
     *
     * @param {string[]} options - The options the user can choose.
     */
    multipleChoiceInput (options) {
      options.forEach((option, index) => {
        const radio = document.createElement('input')
        radio.type = 'radio'
        radio.name = 'answerOptions'
        radio.id = `option${index}`
        radio.value = option

        const label = document.createElement('label')
        label.setAttribute('for', `option${index}`)
        label.textContent = option

        this.#answerOptions.appendChild(radio)
        this.#answerOptions.appendChild(label)
      })
    }
  }
)
