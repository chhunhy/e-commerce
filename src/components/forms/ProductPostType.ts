export type CatageoryType = {
	name: string;
	icon: string;
};

export type ProductPostType = {
	category: CatageoryType;
	name: string;
	desc: string;
	image: string;
	price: number;
	quantity: number;
};
