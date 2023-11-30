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
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
    }
  }
)
