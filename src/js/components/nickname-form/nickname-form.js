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
    border: 0;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
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

  input:hover {
    background-color: #fafafa;
    border:0;
    box-shadow:0 0 2px rgba(0,0,0,0.3);
  }

  button:hover {
    background-color: #5163c9;
  }

</style>
<h2>Type in your nickname</h2>
<form id=nicknameForm>
    <input type="text" id="nickname" placeholder="Type here" required>
    <button type="submit">Submit</button>
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
     * Hanedle submit.
     */
    #handleSubmit

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
      this.#form.addEventListener('submit',
        /**
         * Handles the submit event.
         *
         * @param {SubmitEvent} event The submit event.
         */
        this.#handleSubmit = (event) => {
          event.preventDefault()
          const nickname = this.chosenNickname()
          console.log('Form submitted with nickname: ' + nickname)
          this.dispatchEvent(new CustomEvent('startQuiz', { detail: { nickname } }))
        })
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      this.#form.removeEventListener('submit', this.#handleSubmit)
    }

    /**
     * Public method that returns the nickname chosen by the user.
     *
     * @returns {string} The user's chosen nickname.
     */
    chosenNickname () {
      return this.#nicknameInput.value
    }
  }
)
