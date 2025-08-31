import { useRef } from "react";
import "./Dialog.css";

function Dialog() {
  //   A reference to the actual DOM dialog element
  const dialogRef = useRef(null);

  const ToggleModal = () => {
    // condition to check if dialog has an Open attribute do this:
    if (dialogRef.current.hasAttribute("open")) {
      dialogRef.current.setAttribute("closing", "");

      // added close attribute for dialog animation
      dialogRef.current.addEventListener(
        "animationend",
        () => {
          dialogRef.current.removeAttribute("closing");
          dialogRef.current.close();
        },
        { once: true }
      );
      /* condition to prevent scroll when dialog is active */
      document.body.classList.remove("active-modal");
    } else {
      dialogRef.current.showModal();
      /* condition to add back scroll when dialog is not active */
      document.body.classList.add("active-modal");
    }

    // using ternary operation
    // dialogRef.current.hasAttribute("open")
    //   ? dialogRef.current.close()
    //   : dialogRef.current.showModal();
  };

  return (
    <>
      {/* button to access modal pop up */}
      <button className='open-modal-Btn' onClick={ToggleModal}>
        OPEN
      </button>

      {/* Modal pop up using HTML syntax: dialog */}
      <dialog ref={dialogRef} className='dialog-content'>
        <h2>Hello People</h2>
        <p>
          This is a practical use of modal pop up in react jsx. we to start this
          project we are going to use vite which is the fastest way to work on
          react js than using create react app, after installing the dependence
          using install npm. we can now start coding our project, we are going
          to use start not ref
        </p>
        <button className='closeBtn' onClick={ToggleModal}>
          &times; close
        </button>
      </dialog>
    </>
  );
}

export default Dialog;
