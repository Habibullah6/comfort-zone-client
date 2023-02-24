import React from "react";

const DisplayModal = ({title, message, successAction, closeModal, data}) => {
  return (
    <>
    <input type="checkbox" id="my-modal-6" className="modal-toggle" />
<div className="modal modal-bottom sm:modal-middle">
  <div className="modal-box text-accent">
    <h3 className="font-bold text-lg">{title}</h3>
    <p className="py-4">{message}</p>
    <div className="modal-action">
      <button onClick={()=> successAction(data._id)} className="btn btn-primary">Delete</button>
      <button onClick={closeModal} className="btn btn-accent">Cancel</button>
    </div>
  </div>
</div>
    </>
  );
};

export default DisplayModal;
