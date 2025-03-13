import React from "react";

function Footer() {
  return (
    <>
      {/* footer */}
      <div className="mt-5">
        <div className="h-60 w-full bg-[#97BEE2]">
          <div className="flex justify-center gap-100  ">
            {/* left text */}
            <div className="w-100 mt-22 text-white text-xl">
              <p>
                VOYAGER: A website that compiles information on tourist
                attractions in Thailand
              </p>
            </div>
            {/* right text */}

            <div className="flex flex-col mt-22 text-white text-xl">
              <p>Advertising Inquiries:</p>
              <p>Email: voyager@mail.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
