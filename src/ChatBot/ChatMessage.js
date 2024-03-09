import React from 'react'
import M from "materialize-css";

const ChatMessage = () => {
    const options = {
        // Add your modal options here
        onOpenStart: function () {
            document.title = "Your Modal Title";
        },
        onCloseEnd: function () {
            document.title = "Your Original Title";
        }
    };
    return (
        <>
            <div className="modal-header">
                <h4>Chat..</h4>
            </div>

            <div className="modal-content">
                <p>Coming Soon..</p>

                <div class="container">
                <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">textsms</i>
                                    <input id="autocomplete-input" type="text" className="autocomplete" />
                                    <label htmlFor="autocomplete-input">Any Suggestions</label>
                                </div>
                            </div>
                            <div className="row">
                                <button className="btn waves-effect waves-light" type="submit">
                                    Submit
                                    <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </form>
                </div>

            </div>

            <div className="modal-footer fixed-action-btn">
                <a href="#!" className="modal-close waves-effect waves-green btn-flat ">
                    Close
                </a>
            </div>
        </>

    )
}

export default ChatMessage