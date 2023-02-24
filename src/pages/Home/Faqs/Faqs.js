import React from "react";

const Faqs = () => {
  return (
    <div className="p-5">
      <h1 className="font-bold text-4xl">FAQS</h1>
      <p className="mt-3">FAQ about shoes</p>
      <hr className="mt-3"/>
      <div className="mt-10">
        <div
          tabIndex={0}
          className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box lg:w-1/2 mx-auto"
        >
          <div className="collapse-title text-xl font-medium">
          My son's feet size is 22. Can he wear size 24 shoes?
          </div>
          <div className="collapse-content">
            <p>His walking and sports shoes should only be bigger by 10 - 13 mm, or one size, than his feet. Tight-fitting shoes are not recommended for sports. The old shoemaker's advice is: "longer and narrower is better". "Narrower" here applies to the volume across the toe joints, not in the boot tip. No shoes stretch in length, natural material shoes sometimes stretch in width.</p>
          </div>
        </div>


        <div
          tabIndex={0}
          className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box lg:w-1/2 mx-auto mt-10"
        >
          <div className="collapse-title text-xl font-medium">
          Hand-down shoes, yes or no?
          </div>
          <div className="collapse-content">
            <p>Not recommended for hygiene reasons. Mycosis, eczema and other skin conditions may be transmitted.</p>
          </div>
        </div>



        <div
          tabIndex={0}
          className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box lg:w-1/2 mx-auto mt-10"
        >
          <div className="collapse-title text-xl font-medium">
          My child has flat feet. What can I do for the healthy development of their feet?
          </div>
          <div className="collapse-content">
            <p>The human feet start to develop fully around the age of one. This is the time to prepare for treatment of orthopaedic problems. Apart from suitable footwear and orthopaedic aids, a professional doctor - orthopaedist - should also be consulted.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
