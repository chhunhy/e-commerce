import { describe } from "node:test";
import { title } from "process";
import Image from "next/image";
import React from "react";
import { Button, image } from "@nextui-org/react";
export type ParamProps = {
  params: {
    id: number;
  };
};

async function getDetail(id: number) {
  const productDetail = await fetch(`https://store.istad.co/api/products/${id}/`);
  return productDetail.json();
}

export async function generateMetadata({params}: any) {
  const id = params.id
  const product = await getDetail(id);
  return {
    title: product?.title,
    describe: product.description,
    openGraph: {
      images: product.thumbnail,
    },
  }
}


async function page({ params }: ParamProps) {
  const id = params.id;
  const productDetail = await getDetail(id);
  return (
    <div className="mb-32 sm:max-w-2xl sm:h-[500px] md:max-w-4xl md:mx-5 xl:ml-32 lg:max-w-5xl md:h-[500px] lg:h-[500px]  xl:max-w-screen-xl rounded-xl xl:mt-8 xl:h-[600px] bg-white md:bg-pink-50 mx-auto  sm:flex sm:justify-between">
      <div className="w-96 h-[700px] block sm:w-[700px]  md:w-[800px] sm:h-[400px] md:mt-9 lg:w-[900px] lg:mt-9 xl:w-[1100px] xl:h-[425px] xl:mt-20 sm:flex mx-auto  bg-blue-100 rounded-lg ">
      <Image className="rounded-lg w-96 " src={productDetail.image}  alt={""} width={350} height={350} />
      <div className="w-1/2 ml-7  sm:ml-16 ">
        <div className="flex gap-4 h-18 mt-3 items-center">
        <Image className="rounded-full" width={60} height={60} src="https://i.pinimg.com/736x/65/99/b8/6599b8973f8faa5ef0a9c4fa042cadc9.jpg" alt=""/>
        <h1>{productDetail.seller}</h1>
        </div>
     <div className=" mt-4 ">
     <h1 className="text-3xl pb-4">{productDetail.name}</h1>
      <p>{productDetail.desc}</p>
      <p className="text-3xl pt-4">${productDetail.price}</p>
      <Button  className="bg-pink-500 text-white mt-3">Buy Product</Button>
     </div>
      </div>
      </div>
    </div>

  );
}

export default page;
