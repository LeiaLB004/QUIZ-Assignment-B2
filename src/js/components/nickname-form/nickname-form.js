/**
 * The nickname-form web component module.
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

</style>
<h2>Type in your nickname</h2>
<form id=nicknameForm>
    <input type="text" id="nickname" placeholder="Type here and press enter" required>
</form>

`

customElements.define('nickname-form',
  /**
   * Represents a nickname-form element.
   */
  class extends HTMLElement {
    /**
     * The users chosen nickname.
     */
    #nicknameInput

    /**
     * The nickname form.
     */
    #form

    /**
     * Handle enter key.
     */
    #handleEnter

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      this.#nicknameInput = this.shadowRoot.getElementById('nickname')
      this.#form = this.shadowRoot.getElementById('nicknameForm')
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // Add event listener to the form instead of the button
      this.#form.addEventListener('keydown',
        /**
         * Handles the submit event.
         *
         * @param {SubmitEvent} event The submit event.
         */
        this.#handleEnter = (event) => {
          if (event.key === 'Enter') {
            event.preventDefault()
            const nickname = this.chosenNickname()
            this.dispatchEvent(new CustomEvent('startQuiz', { detail: { nickname } }))
          }
        })
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      this.#form.removeEventListener('keydown', this.#handleEnter.bind(this))
    }

    /**
     * Public method that returns the nickname chosen by the user.
     *
     * @returns {string} The user's chosen nickname.
     */
    chosenNickname () {
      return this.#nicknameInput.value
    }

    /**
     * A method for clearing the nickname form's input.
     */
    clearInput () {
      this.#nicknameInput.value = ''
    }
  }
)
