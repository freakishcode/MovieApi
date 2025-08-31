import "./Modal.css";

// To create div Modal outside of App component
import { createPortal } from "react-dom";

// eslint-disable-next-line react/prop-types
function Model({ isOpen, onCancel }) {
  // condition to check if onCancel is present: if not return null
  if (!onCancel) return;

  /* condition to prevent scroll when Modal pop up is active */
  if (isOpen) {
    document.body.classList.add("active-modal");
  } else {
    // document.body.style.animation("fade-in 500ms forwards");
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      {/*Customizing background Overlay of Model POP UP*/}

      {isOpen &&
        createPortal(
          <div
            className='Overlay'
            onClick={(e) => {
              // condition to click only overLay not actual modal body expect closeBtn
              if (e.target.className === "Overlay") {
                onCancel(false);
              }
            }}
          >
            {/*Model pop up*/}
            <div className='Modal'>
              {/* action button to close model pop up*/}
              <button className='CancelBtn' onClick={() => onCancel(false)}>
                &times;
              </button>
              {/* title */}
              <h3 className='title'>Pop up model </h3>
              {/* body  */}
              <p className='body'>Are you sure you want to continue ?</p>
              {/* action button Field to close model pop up*/}
              <div className='footerBtn'>
                <button className='continueBtn'>Continue</button>
                <button className='closeBtn' onClick={() => onCancel(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default Model;
