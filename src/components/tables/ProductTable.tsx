"use client";

import {ACCESS_TOKEN,baseApi,} from "@/constants/baseApi";
import { ProductType } from "@/types/product";
import {Button,FileInput,Label,Modal,Textarea,TextInput,} from "flowbite-react";
import Image from "next/image";
import {useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { HiOutlineExclamationCircle } from "react-icons/hi";


export default function ProductTable() {
	const router = useRouter();
	const [openModal, setOpenModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [productDetails, setProductDetails] = useState<ProductType | null>(null);
	const [productId, setProductId] = useState(Number);
	const [productList, setProductList] = useState<ProductType[]>([]);
	const [editProductDetails, setEditProductDetails] =useState<ProductType | null>(null);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [imageData, setImageData] = useState<File | null>(null);
	const handleEdit = (product: ProductType) => {
		setEditProductDetails(product);
		setOpenEditModal(true);
	};
	const handleView = (product: ProductType) => {
		setProductDetails(product);
		setOpenModal(true);
	};

	const handleDelete = (product: ProductType) => {
		setProductId(product.id);
		setOpenDeleteModal(true);
	};



	const columnsData: TableColumn<ProductType>[] = [
		{
			name: "ID",
			selector: (row) => row.id,
			sortable: true,
		},
		{
			name: "Product Name",
			selector: (row) => row.name,
		},
		{
			name: "Price",
			selector: (row) => row.price,
		},
		{
			name: "Seller",
			selector: (row) => row.seller,
		},
		{
			name: "Image",
			selector: (row): any => (
				<Image
					src={row.image}
					alt={row.name}
					width={100}
					height={100}
				/>
			),
		},
		{
			name: "Action",
			selector: (row): any => (
				<div className="gap-2 flex">
					<button
						className="text-white bg-pink-500 px-2 py-3 rounded-lg font-semibold hover:bg-pink-600"
						onClick={() => handleView(row)}>
						View
					</button>
					<button
						className={`text-white px-2 py-3 rounded-lg font-semibold  ${
							row.seller === "Chhunhy Chhem"
								? "bg-blue-500 hover:bg-blue-700"
								: "bg-blue-600  text-black cursor-not-allowed"
						}`}
						onClick={() => {
							if (row.seller === "Chhunhy Chhem")
								handleEdit(row);
						}}>
						Edit
					</button>
					<button
						className={` bg-red-500 text-white py-3 px-3 rounded-lg font-semibold  ${
							row.seller === "Chhunhy Chhem"
								? "bg-red-500 hover:bg-red-700"
								: "bg-gray-300 text-black cursor-not-allowed"
						}`}
						onClick={() => {
							if (row.seller === "Chhunhy Chhem")
								handleDelete(row);
						}}>
						Delete
					</button>
				</div>
			),
		},
	];

	const handleUpdate = async () => {
		const productId = editProductDetails?.id;

		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
		myHeaders.append(
			"Cookie",
			"csrftoken=UafcJBTYw7ngeP1Ov1FF91N7OXlKVb4Wv8keKsf7fMiqDLZZLD52Z5fr4NPp9X50; sessionid=8r4cx104gr3c4t6tasqsfzts7jvkcov9"
		);

		const formdata = new FormData();
		formdata.append("name", "Love Shop");
		if (imageData) {
			formdata.append("image", imageData, imageData.name);
		}

		const requestOptions = {
			method: "POST",
			headers: {
				Authorization: `Bearer ${ACCESS_TOKEN}`,
			},
			body: formdata,
		};

		const imageUrl = await fetch(
			"https://store.istad.co/api/file/product/",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => result.image)
			.catch((error) => console.error(error));

		const formData = {
			id: editProductDetails?.id,
			category: {
				name: editProductDetails?.category,
				icon: "https://i.pinimg.com/564x/28/b7/b5/28b7b5f7f4c06563f1979d429f1e72a4.jpg",
			},
			name: editProductDetails?.name,
			desc: editProductDetails?.desc,
			image: imageUrl,
			price: editProductDetails?.price,
			quantity: editProductDetails?.quantity,
		};

		try {
			const response = await fetch(`${baseApi}products/${productId}/`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${ACCESS_TOKEN}`,
				},
				body: JSON.stringify(formData),
			});
			if (response.ok) {
				
				const updatedProductList = productList.map((product) => {
					if (product.id === productId) {
						return formData;
					}
					return product;
				});
				setProductList(updatedProductList as ProductType[]);
				setOpenEditModal(false);
			} else {
				
				console.error("Failed to update product.");
			}
		} catch (error) {
			console.error("Error updating product:", error);
		}
	};

	function deleteProduct(id: Number) {
		fetch(`${baseApi}products/${id}/`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${ACCESS_TOKEN}`,
			},
		});
	}

	
	useEffect(() => {
		async function fetchData() {
			const response = await fetch(`${baseApi}products/`);
			const data = await response.json();
			setProductList(data.results);
		}
		fetchData();
	}, []);

	return (
		<div className="mt-10">
			<DataTable columns={columnsData} data={productList} />

			<Modal
				dismissible
				show={openModal}
				onClose={() => setOpenModal(false)}>
				<Modal.Header>
					<p className="text-2xl"> Product Details</p>
				</Modal.Header>
				<Modal.Body>
					<div className="space-y-6">
						<div className="flex gap-10">
							<Image
								src={productDetails?.image || "images"}
								alt={productDetails?.name || "UNKNOWN"}
								width={250}
								height={250}
								className="rounded-lg "
							/>
							<div>
								<p className="text-lg font-bold">
									{productDetails?.name}
								</p>
								<p>${productDetails?.price}</p>
								<p>Instock : {productDetails?.quantity}</p>
								<p>Seller : {productDetails?.seller}</p>
								<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
							{productDetails?.desc || "Product does not describtion yet"}
						</p>
							</div>
						</div>
						
					</div>
				</Modal.Body>
			</Modal>

			<Modal
				show={openDeleteModal}
				size="md"
				onClose={() => setOpenDeleteModal(false)}
				popup>
				<Modal.Header />
				<Modal.Body>
					<div className="text-center">
						<HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
						<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
							Are you sure you want to delete this product?
						</h3>
						<div className="flex justify-center gap-4">
							<Button
								color="failure"
								onClick={() => {
									setOpenDeleteModal(false);
									deleteProduct(productId);
									window.location.reload();
								}}>
								{"Yes, I'm sure"}
							</Button>
							<Button
								color="gray"
								onClick={() => setOpenDeleteModal(false)}>
								No, cancel
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>

		
			<Modal
				show={openEditModal}
				size="md"
				onClose={() => setOpenEditModal(false)}
				popup>
				<Modal.Header>Edit Product</Modal.Header>
				<Modal.Body>
					<form method="POST">
						<div>
							<h2 className="text-center text-2xl">
								Update Product
							</h2>
							<div className="mb-2 block mt-5">
								<Label htmlFor="name" value="Product Name" />
							</div>
							<TextInput
								id="name"
								type="text"
								required
								value={editProductDetails?.name || ""}
								onChange={(e) =>
									setEditProductDetails((prevState) => ({
										...prevState,
										name: e.target.value,
										id: prevState?.id || 0,
										seller: prevState?.seller || "",
										category:
											String(prevState?.category) || "", // Ensure category is always a string
										desc: prevState?.desc || "",
										image: prevState?.image || "",
										price: prevState?.price || "",
										quantity: prevState?.quantity || 0,
									}))
								}
							/>
							<div className="mb-2 block mt-5">
								<Label htmlFor="price" value="Product Price" />
							</div>
							<TextInput
								id="price"
								type="text"
								placeholder="$500"
								required
								value={editProductDetails?.price || ""}
								onChange={(e) =>setEditProductDetails((prevState) => ({	...prevState,price: e.target.value,id: prevState?.id || 0,seller: prevState?.seller || "",
										category:
											prevState?.category.toString() ||
											"", 
										name: prevState?.name || "",
										desc: prevState?.desc || "",
										image: prevState?.image || "",
										quantity: prevState?.quantity || 0,
									}))
								}
							/>

							<div className="mb-2 block mt-5">
								<Label
									htmlFor="category"
									value="Product category"
								/>
							</div>
							<TextInput
								id="quantity"
								type="text"
								placeholder="20"
								required
								value={editProductDetails?.category || 0}
								onChange={(e) =>
									setEditProductDetails((prevState) => ({
										...prevState,
										category: e.target.value,
										id: prevState?.id || 0,
										seller: prevState?.seller || "",
										quantity: prevState?.quantity || 0,
										name: prevState?.name || "",
										desc: prevState?.desc || "",
										image: prevState?.image || "",
										price: prevState?.price || "",
									}))
								}
							/>
						</div>
						<div>
							<div className="mb-2 block mt-5">
								<Label
									htmlFor="description"
									value="Product Description"
								/>
							</div>
							<Textarea
								className="h-[150px]"
								id="description"
								placeholder="Comfortable and affordable Girls Shoes/sneakers Design idea for part and winter wear"
								required
								value={editProductDetails?.desc || ""}
								onChange={(e) =>
									setEditProductDetails((prevState) => ({
										...prevState,
										desc: e.target.value,
										id: prevState?.id || 0,
										seller: prevState?.seller || "",
										category:
											prevState?.category.toString() ||
											"", 
										name: prevState?.name || "",
										image: prevState?.image || "",
										price: prevState?.price || "",
										quantity: prevState?.quantity || 0,
									}))
								}
							/>
						</div>
						<div className="mb-2 block mt-5">
							<Label htmlFor="file" value="Upload file" />
						</div>
						<FileInput
							id="file"
							helperText="Product Images"
							onChange={(e) => {
								const file = e.target.files?.[0];
								setImageData(file || null);
								if (file) {
									const reader = new FileReader();
									reader.onload = (event) => {
									const imageDataUrl =event.target?.result;
								 	setEditProductDetails((prevState) => ({...prevState,image: imageDataUrl as string,id: prevState?.id || 0,name: prevState?.name || "",seller: prevState?.seller || "",
								category:
								prevState?.category.toString() ||
												"", 
											price: prevState?.price || "",
											quantity: prevState?.quantity || 0,
											desc: prevState?.desc || "",
										}));
									};
									reader.readAsDataURL(file);
								}
							}}
							name="file"
						/>
						<div className="mb-2 block mt-5">
							<Label htmlFor="image" value="Product Images" />
						</div>

					
						{editProductDetails && editProductDetails.image && (
							<Image
								src={editProductDetails.image}
								alt="Preview"
								className="mb-4 rounded-lg"
								style={{ maxWidth: "100%", height: "auto" }}
								width={500}
								height={500}
							/>
						)}
					</form>
				</Modal.Body>
				<Modal.Footer>
					<button
						color="primary"
						onClick={() => {
							handleUpdate();
							router.push("/dashboard");
							setOpenEditModal(false);
						}}>
						Update
					</button>
					<button
						color="gray"
						onClick={() => setOpenEditModal(false)}>
						Cancel
					</button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}




