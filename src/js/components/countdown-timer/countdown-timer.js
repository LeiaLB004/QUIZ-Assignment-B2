/**
 * The countdown-timer web component module.
 *
 * @author Leia Lindberg <ll224np@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
<div id='timer'></div>
`
customElements.define('countdown-timer',
  /**
   * Represents a countdown-timer element.
   */
  class extends HTMLElement {
    /**
     * The timer.
     */
    #timer

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      this.#timer = this.shadowRoot.querySelector('#timer')
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['limit']
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name of the attribute.
     * @param {any} oldValue the old attribute value.
     * @param {any} newValue the new attribute value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'limit') {
        this.resetTimer(newValue || 20)
      }
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.resetTimer(this.getAttribute('limit') || 20)
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      clearInterval(this.intervalId)
    }

    /**
     * Resets the countdown timer with a new limit and starts the countdown.
     *
     * @param {string} limit - The new limit for the countdown timer.
     */
    resetTimer (limit) {
      this.#timer.textContent = limit
      clearInterval(this.intervalId)
      this.intervalId = setInterval(() => {
        this.#timer.textContent = limit
        if (limit === 0) {
          clearInterval(this.intervalId)
          this.dispatchEvent(new Event('timeOut'))
        } else {
          limit--
        }
      }, 1000)
    }
  }
)
