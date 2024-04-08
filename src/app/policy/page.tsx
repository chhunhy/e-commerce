
import React from "react";
import styles from "./AboutUs.module.css"
import { Metadata} from "next";
import Image from "next/image";
export const metadata: Metadata = {
  title: "Policy Page",
  description: "This is policy page",
  keywords: ['shop', 'ecommerce', 'sell']
};
const page = () => {

  return (
    <>
    <div className=" dark:bg-gray-900 ">
        <div className="gap-8 items-center  py-4 sm:px-12 px-4 mx-auto max-w-screen-xl xl:gap-36 md:grid md:grid-cols-2 lg:px-6 xl:py-6 xl:px-0">
            <div className="mt-4 md:mt-0 ">
                <h2 className="mb-4 text-4xl  font-bold roboto-regular  dark:text-white text-transparent bg-clip-text bg-pink-500 ">Welcome</h2>
                
                <p className="mb-6 font-light roboto-light text-gray-400 md:text-lg dark:text-gray-400">On the legal side of things if you want to make your Online Business well protected and increase trust between you and your customer base having a Privacy Policy is very important. While it should be a legal document it should also be easy to understand for a customer and/or visitor that interacts with your website.
               </p>
            </div>
           <Image   src={"/assets/welcome.png"} width={600} height={600} alt=""/>    
        </div>
       </div>

        <div className=" dark:bg-gray-900">
            <div className="gap-8 items-center py-4 sm:px-12 px-4 mx-auto max-w-screen-xl xl:gap-12 md:grid md:grid-cols-2 lg:px-6 xl:py-3 xl:px-0">
                {/* <img className="w-full hidden md:block" src="../images/computer game.png" alt="vision image"> */}
           
                <Image className="w-full hidden md:block" src={"/assets/computer game.png"} height={500} width={500} alt="" />
                <div className="mt-4 md:mt-0">
                    <h2 className="mb-4 text-4xl  font-bold roboto-regular  dark:text-white text-transparent bg-clip-text bg-pink-500">Policy</h2>
                    <p className="mb-6 font-light roboto-light text-gray-400 md:text-lg dark:text-gray-400">This Privacy Policy describes how your personal information is collected used and shared when you visit or make a purchase from.

</p>
                    
                </div>
               
                <Image className="w-full block md:hidden" src={"/assets/computer game.png"} height={500} width={500} alt="" />
                {/* <img className="w-full block md:hidden" src="../images/d:\E-Coding\images\computer game.png" alt="vision image"> */}
                
            </div>
        </div>
    </>
  );
};

export default page;
