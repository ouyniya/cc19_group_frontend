import React from "react";
import { Link } from "react-router";

function NotFound() {
  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
              <img src="src/assets/error.gif" alt="error" width="350px" />
            </h1>
            <p className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            ไม่พบหน้าที่คุณกำลังมองหา
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            ดูเหมือนว่าคุณจะหลงทาง...
            <br />ลองตรวจสอบ URL อีกครั้ง หรือไปที่หน้าแรกของเว็บไซต์
            </p>
            <Link to="/">
              <button className="btn text-white bg-[var(--blue)] border-[var(--darkblue)] hover:bg-[var(--blue)] hover:border-[var(--darkblue)]">
                กลับหน้าหลัก
              </button>
            </Link>
          </div>
        </div>
      </div>
      <a className="text-xs text-slate-300" href="https://www.flaticon.com/free-animated-icons/error" title="error animated icons">Error animated icons created by Freepik - Flaticon</a>
    </>
  );
}

export default NotFound;
