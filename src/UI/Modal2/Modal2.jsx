import { useState } from "react";
import "./modal2.css";

// To create div Modal outside of App component
import { createPortal } from "react-dom";

function Modal2() {
  // state to store boolean condition of buttons
  const [isOpen, setIsOpen] = useState(false);

  const ToggleModal = () => {
    setIsOpen(!isOpen);
  };

  /* condition to prevent scroll when Modal pop up is active */
  isOpen
    ? document.body.classList.add("active-modal")
    : document.body.classList.remove("active-modal");

  return (
    <>
      {/* button to access modal pop up */}
      <button className='open-modal' onClick={ToggleModal}>
        OPEN
      </button>

      {/* Condition to check if modal is open display Modal-Container */}
      {isOpen &&
        createPortal(
          //   Actual Modal pop up
          <div className='modal-container'>
            {/* Background Overlay */}
            <div className='overlay' onClick={ToggleModal}>
              <div className='modal-content'>
                <h2>Hello People</h2>
                <p>
                  This is a practical use of modal pop up in react jsx. we to
                  start this project we are going to use vite which is the
                  fastest way to work on react js than using create react app,
                  after installing the dependence using install npm. we can now
                  start coding our project, we are going to use start not ref
                </p>
                {/* button TO Close Modal */}
                <button className='closeBtn' onClick={ToggleModal}>
                  &times; CLOSE
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default Modal2;
