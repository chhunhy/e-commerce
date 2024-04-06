
import React from "react";
import styles from "./AboutUs.module.css"
import { Metadata} from "next";
import Image from "next/image";
export const metadata: Metadata = {
  title: "About us",
  description: "This is about us shop",
  keywords: ['shop', 'ecommerce', 'sell']
};
const page = () => {
 
  return (
    <>
    <section className=" dark:bg-gray-900 ">
        <div className="gap-8 items-center  py-4 sm:px-12 px-4 mx-auto max-w-screen-xl xl:gap-36 md:grid md:grid-cols-2 lg:px-6 xl:py-6 xl:px-0">
            <div className="mt-4 md:mt-0 ">
                <h2 className="mb-4 text-4xl  font-bold roboto-regular  dark:text-white text-transparent bg-clip-text bg-gradient-to-r to-[#8244FF] from-[#F926AE] ">Welcome to E-Coding</h2>
                <p className="mb-6 font-light roboto-light text-gray-400 md:text-lg dark:text-gray-400">Greeting for everyone Welcome from E-Coding. E-Coding is the website e-learning that have courses can help you. You can find courses that quality in E-Coding. we will provide you course more. You can buy course in E-Coding. It will help you a lot.</p>
                
            </div>
           <Image   src={"/assets/welcome.png"} width={600} height={600} alt=""/>    
        </div>
       </section>

        <section className=" dark:bg-gray-900">
            <div className="gap-8 items-center py-4 sm:px-12 px-4 mx-auto max-w-screen-xl xl:gap-12 md:grid md:grid-cols-2 lg:px-6 xl:py-3 xl:px-0">
                {/* <img className="w-full hidden md:block" src="../images/computer game.png" alt="vision image"> */}
           
                <Image className="w-full hidden md:block" src={"/assets/computer game.png"} height={500} width={500} alt="" />
                <div className="mt-4 md:mt-0">
                    <h2 className="mb-4 text-4xl  font-bold roboto-regular  dark:text-white text-transparent bg-clip-text bg-gradient-to-r to-[#8244FF] from-[#F926AE] ">Our Vision</h2>
                    <p className="mb-6 font-light roboto-light text-gray-400 md:text-lg dark:text-gray-400">I have taught millions of people how to code and become professional software engineers through my YouTube channel and online courses. I am humbled and thrilled to be a part of their programming journeys. When you join us you're joining a group of like-minded people who are all working towards the same goal.</p>
                    
                </div>
               
                <Image className="w-full block md:hidden" src={"/assets/computer game.png"} height={500} width={500} alt="" />
                {/* <img className="w-full block md:hidden" src="../images/d:\E-Coding\images\computer game.png" alt="vision image"> */}
                
            </div>
        </section>
    </>
  );
};

export default page;
