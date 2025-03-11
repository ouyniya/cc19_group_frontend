import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import FAQs from "../../components/FAQs";
import HeadingSection from "../../components/HeadingSection";
import "../../../src/index.css";
import Stat from "../../components/Stat";
import AssetBoxesEQ from "../../components/AssetBoxesEQ";
import AssetBoxesFI from "../../components/AssetBoxesFI";
import Hero from "../../components/Hero";
import { Link } from "react-router";

function Home() {
  const topic = [
    "เลือกกองทุนตามประเภทสินทรัพย์ลงทุน",
    "กองทุนน่าจับตามอง",
    "สถิติกองทุน",
    "FAQs",
  ];

  // const funds = [
  //   {
  //     name: "K-BANKING",
  //     nav: 20.15,
  //     wishlistCount: 150,
  //     ffs: "https://secdocumentstorage.blob.core.windows.net/fundfactsheet/M0003_2563.pdf",
  //   },
  //   {
  //     name: "T-Stock",
  //     nav: 15.75,
  //     wishlistCount: 135,
  //     ffs: "https://secdocumentstorage.blob.core.windows.net/fundfactsheet/M0003_2563.pdf",
  //   },
  //   {
  //     name: "B-Fixed",
  //     nav: 10.9,
  //     wishlistCount: 120,
  //     ffs: "https://secdocumentstorage.blob.core.windows.net/fundfactsheet/M0003_2563.pdf",
  //   },
  //   {
  //     name: "B-Fixed",
  //     nav: 10.9,
  //     wishlistCount: 110,
  //     ffs: "https://secdocumentstorage.blob.core.windows.net/fundfactsheet/M0003_2563.pdf",
  //   },
  //   {
  //     name: "B-Fixed",
  //     nav: 10.9,
  //     wishlistCount: 100,
  //     ffs: "https://secdocumentstorage.blob.core.windows.net/fundfactsheet/M0003_2563.pdf",
  //   },
  // ];

  const faqs = [
    {
      question: "ทำไมต้องลงทุนใน Mutual fund",
      answer:
        "Mutual fund ช่วยกระจายความเสี่ยงในการลงทุน โดยมีผู้จัดการกองทุนบริหารให้ เหมาะสำหรับผู้ที่ต้องการลงทุนแต่ไม่มีเวลาหรือความเชี่ยวชาญในการเลือกหุ้นเอง",
    },
    {
      question: "เว็บไซต์นี้ช่วยอะไรได้บ้าง?",
      answer:
        "เว็บไซต์นี้ช่วยให้คุณสามารถคัดกรองกองทุนตามเงื่อนไขที่ต้องการ เพิ่มกองทุนลงใน Wishlist และศึกษาข้อมูลกองทุนเพื่อการเรียนรู้ โดยไม่มีวัตถุประสงค์เพื่อการแนะนำการลงทุน",
    },
    {
      question: "การเพิ่มกองทุนลงใน Wishlist มีประโยชน์อย่างไร?",
      answer:
        "การเพิ่มกองทุนลงใน Wishlist ช่วยให้คุณสามารถติดตามกองทุนที่สนใจ และเปรียบเทียบข้อมูลได้ง่ายขึ้นโดยไม่ต้องค้นหาใหม่ทุกครั้ง",
    },
    {
      question: "ข้อมูลในเว็บไซต์นี้เชื่อถือได้หรือไม่?",
      answer:
        "ข้อมูลในเว็บไซต์นี้จัดทำขึ้นเพื่อการศึกษาและอ้างอิงจากแหล่งข้อมูลที่น่าเชื่อถือ อย่างไรก็ตาม โปรดตรวจสอบข้อมูลจากแหล่งข้อมูลทางการก่อนตัดสินใจลงทุน",
    },
    {
      question: "เว็บไซต์นี้มีค่าใช้จ่ายหรือไม่?",
      answer:
        "เว็บไซต์นี้ให้บริการฟรีสำหรับการศึกษาข้อมูลเกี่ยวกับกองทุน ไม่มีค่าธรรมเนียมในการใช้งาน",
    },
  ];

  return (
    <>
      <Hero />
      <div className="-mt-[20px] flex flex-col">
        {/* <div className="bg-gradient-to-b from-blue-200 to-white -mt-[5px]">
          <div className="max-w-7xl min-w-[300px] m-auto pt-[48px] xl:pt-0">
            <Header />
          </div>
        </div> */}

        <div className="max-w-7xl min-w-[300px] m-auto">
          <SearchBar />
          <div className="absolute right-1/2 translate-x-1/2 ">
            <Link to="/fund">
              <button className="btn btn-lg rounded-full btn-primary">
                ไปหน้าค้นหากองทุน
              </button>
            </Link>
          </div>
          {/* <div className="mt-[180px]">
            <ExampleWeb />
          </div> */}

          <div className="mt-[200px]">
            <HeadingSection text={topic[2]} />
            <Stat />
          </div>

          {/* <FundHot funds={funds} /> */}
        </div>
      </div>

      {/* กองทุนรวมประเภทต่างๆ */}
      <div className="mt-[120px]">
        <AssetBoxesFI />
        <AssetBoxesEQ />
      </div>

      <div className="max-w-7xl min-w-[300px] m-auto ">
        <HeadingSection text={topic[3]} />
        <FAQs faqs={faqs} />
      </div>

      {/* <div className="max-w-7xl min-w-[300px] m-auto text-xs mt-[100px]">
        <p className="font-bold">credits section</p>
        <a href="https://www.flaticon.com/free-icons/bonds" title="bonds icons">
          Bonds icons created by Vlad Szirka - Flaticon
        </a>
      </div> */}
    </>
  );
}

export default Home;
