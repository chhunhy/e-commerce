import React from "react";
import {Card, CardHeader, CardBody,CardFooter,Button, Image} from "@nextui-org/react";
import { ProductType } from "@/types/product";

export default function CardProductComponent({name, image,desc,price}: ProductType){
    return(
      <Card shadow="sm">
         <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt=""
              className="w-full object-cover h-[200px]"
              src={image}
            />
          </CardBody>
          <CardFooter className="text-small justify-between ">
          
           <div>
            <h1 className="text-xl font-bold py-2">{name}</h1>
            <p className="text-sm line-clamp-2 ">{desc}</p>
            <h3 className="text-xl font-bold pt-4">${price}</h3>
           </div>
          </CardFooter>

      </Card>
    //     <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
    //   <CardHeader className="absolute z-10 top-1 flex-col items-start">
    //   <Image
    //     removeWrapper
    //     alt="Card example background"
    //     className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
    //     src={image}
    //   />
    //   </CardHeader>
      
    //   <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
    //     <div>
    //       <p className="text-black text-tiny">Available soon.</p>
    //       <p className="text-black text-tiny">Get notified.</p>
    //     </div>
    //     <Button className="text-tiny" color="primary" radius="full" size="sm">
    //       Notify Me
    //     </Button>
    //   </CardFooter>
    // </Card>
    )
}