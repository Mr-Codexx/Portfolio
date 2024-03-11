import React from 'react'
import M from "materialize-css";
import NavigationLinks from '../TEST/Links';

const ChatMessage = () => {
    const options = {
        // Add your modal options here
        onOpenStart: function () {
            document.title = "Links";
        },
        onCloseEnd: function () {
            document.title = "Imp inks";
        }
    };
    return (
        <>
            <div className="modal-header">
                <h4>Chat..</h4>
            </div>

            <div className="modal-content">
              <NavigationLinks/>
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