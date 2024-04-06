
import { Suspense } from "react";
import LoadingComponent from "./loading";
import { UserType } from "@/types/users";
import UserCard from "@/components/cards/UserCardComponent";
import { baseApi } from "@/constants/baseApi";
import { Button } from "flowbite-react";
import { ProductType } from "@/types/product";
import Link from "next/link";
import CardComponent from "@/components/cards/CardComponent";
import CardProductComponent from "@/components/cards/CardProductComponent";
import FooterComponent from "@/components/layouts/footer/FooterComponent";
import CarouselComponent from "@/components/CarouselComponent";

async function fetchProducts() {
  const products = await fetch(`${baseApi}products`, {
    cache: "no-store"
  });
  const res = await products.json();
  const rest = res.results;
  return rest;
}



export default async function Home() {
  // const sellerName ="Chhunhy Chhem"
  //  //const users = await fetchUsers();
  //const products = await fetchProducts(sellerName);
  const products = await fetchProducts();
  return (
    <> 
    <CarouselComponent/>
    <h1 className="mx-5 mb-5 max-w-screen-xl md:mx-auto text-4xl font-bold mt-9">Products</h1> 
      <div className="max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-screen-xl justify-center mx-auto gap-5 grid-cols-1 sm:grid-cols-2 grid md:grid-cols-3  lg:grid-cols-4">      
        <Suspense fallback={<LoadingComponent/>} >
          {
            products.map((product: ProductType) => {
              
              return (
                
                <Link href={`/product/${product.id}`} key={product.id}>
                  <CardProductComponent
                   
                    image={product.image} seller={product.seller} name={product.name} desc={product.desc} price={product.price} category={""} quantity={0} id={0} />
                   
                   
                </Link>
              );
            })
          }
        </Suspense>
      </div>
     
    </>
  );
}
