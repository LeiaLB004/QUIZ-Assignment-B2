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
     * The timer's limit with 20 as default.
     */
    #limit = 20

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      this.#timer = this.shadowRoot.querySelector('.timer')
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
        this.#limit = newValue
      }
    }
  }
)
