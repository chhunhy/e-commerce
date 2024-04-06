
import { Carousel } from "flowbite-react";
import React from "react";
import Image from "next/image";

export default function CarouselComponent() {
	return (
		<div className="h-56 sm:h-64 xl:h-80 2xl:h-[600px]">
			<Carousel pauseOnHover>
				<Image src="/assets/shirts.webp" alt="shoes" width={1000} height={1000}/>
				<Image src="/assets/dress.jpg" alt="headphone"  width={1000} height={1000}/>
				<Image src="/assets/black-shirt-for-women.jpg" alt="phone" width={500} height={500}/>
			</Carousel>
		</div>
	);
}