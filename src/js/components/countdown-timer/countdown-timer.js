/**
 * The countdown-timer web component module.
 *
 * @author Leia Lindberg <ll224np@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `

<style>
  p {
    font-size: 20px;
    font-family: font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    color: #4B6387;
  }
</style>
<p>Seconds left: <span id='timer'></span></p>
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
        this.resetTimer(newValue)
      }
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.resetTimer(this.getAttribute('limit'))
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    stopCountdown () {
      clearInterval(this.intervalId)
    }

    /**
     * Resets the countdown timer with a new limit and starts the countdown.
     *
     * @param {number|string} limit - The new limit for the countdown timer. It can be a number or a string that represents an integer.
     */
    resetTimer (limit) {
      limit = parseInt(limit, 10)

      // Set the initial content of the timer element.
      this.#timer.textContent = limit

      // Clear any existing interval.
      clearInterval(this.intervalId)

      // Start timer.
      setTimeout(() => this.#startTimer(limit), 0)
    }

    /**
     * Starts the countdown timer and updates the display at regular intervals.
     *
     * @param {number} limit - The limit for the countdown timer.
     */
    #startTimer (limit) {
      // Initialize the current limit.
      let currentLimit = limit

      // Get the start time of the countdown timer.
      const startTime = performance.now()

      this.intervalId = setInterval(() => {
        // Calculate the elapsed seconds.
        const elapsedSeconds = Math.floor((performance.now() - startTime) / 1000)

        // Update the current limit based on elapsed time.
        currentLimit = limit - elapsedSeconds

        console.log(currentLimit)
        // Update the display of the countdown timer.
        this.#timer.textContent = currentLimit

        // Check if the timer has reached or passed 0.
        if (currentLimit <= 0) {
          clearInterval(this.intervalId)
          this.dispatchEvent(new Event('timeOut'))
        } else {
          currentLimit--
        }
      }, 1000)
    }
  }
)
