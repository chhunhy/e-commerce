
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
                <h2 className="mb-4 text-4xl  font-bold roboto-regular  dark:text-white text-transparent bg-clip-text bg-gradient-to-r to-[#8244FF] from-[#F926AE] ">Welcome to Love Shop</h2>
                <p className="mb-6 font-light roboto-light text-gray-400 md:text-lg dark:text-gray-400">Greeting for everyone Welcome from Love Shop. Love Shop is the website e-commerce that can help to find product that have qualitiy. You can find products that quality in Love Shop. we will provide you products more. You can buy products in Love Shop. It will help you a lot.</p>
                
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
                    <p className="mb-6 font-light roboto-light text-gray-400 md:text-lg dark:text-gray-400">With Love Shop, you have an infinite canvas that transforms how you use the apps you love. Arrange apps anywhere and scale them to the perfect size, making the workspace of your dreams a reality — all while staying present in the world around you. Browse the web in Safari, create a to-do list in Notes, chat in Messages, and seamlessly move between them with a glance.</p>
                    
                </div>
               
                <Image className="w-full block md:hidden" src={"/assets/computer game.png"} height={500} width={500} alt="" />
                {/* <img className="w-full block md:hidden" src="../images/d:\E-Coding\images\computer game.png" alt="vision image"> */}
                
            </div>
        </section>

        <section className="grid mb-48 max-w-screen-xl mt-5 grid-cols-2 h-10  gap-3  sm:grid-cols-3 sm:gap-3 md:grid-cols-5 md:gap-3 mx-auto xl:grid-cols-5  xl:h-10 items-center  justify-evenly xl:gap-16">
        <div className=" ">
           <Image className="" src={"/assets/e-commerce-5.png"} height={200} width={200} alt=""/>
        </div>
        <div className="">
           <Image src={"/assets/e-commerce-5.png"} height={200} width={200} alt="" />
        </div>
        <div className="h-full ">
           <Image src={"/assets/e-commerce-3.webp"} height={200} width={200} alt="" />
        </div>
        <div className=" h-full ">
           <Image src={"/assets/e-commerce-3.webp"}  height={200} width={200} alt="" />
        </div>
        <div className="">
           <Image src={"/assets/e-commerce-4.jpg"} alt="" width={200} height={200} />
        </div>
       </section>
       
    </>
  );
};

export default page;
