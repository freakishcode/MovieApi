import "./preloader.css";

function Preloader() {
  return (
    <>
      <div className='preloader'>
        <div className='spinner'></div>
        <p className='text'>Loading...</p>
      </div>
    </>
  );
}

export default Preloader;
