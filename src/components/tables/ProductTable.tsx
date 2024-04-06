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
	const [productList, setProductList] = useState<ProductType[]>([]);
	const [openModal, setOpenModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [productDetails, setProductDetails] = useState<ProductType | null>(null);
	const [productId, setProductId] = useState(Number);
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
								onChange={(e) =>
									setEditProductDetails((prevState) => ({
										...prevState,
										price: e.target.value,
										id: prevState?.id || 0,
										seller: prevState?.seller || "",
										category:
											prevState?.category.toString() ||
											"", // Convert category to string
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
								placeholder="Air Jordan 1 is a sneaker designed by Peter Moore, Michael Jordan's first signature shoe. It was created for the 1984-85 season and later banned by the NBA for breaking uniform regulations."
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
											"", // Convert category to string
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
										const imageDataUrl =
											event.target?.result;
										setEditProductDetails((prevState) => ({
											...prevState,
											image: imageDataUrl as string,
											id: prevState?.id || 0,
											name: prevState?.name || "",
											seller: prevState?.seller || "",
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
							<Label htmlFor="image" value="Product Image" />
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




// "use client";
// import LoadingComponent from "@/app/loading";
// import { UserType } from "@/types/users";
// import * as Yup from "yup";
// import { Input} from "@nextui-org/react";
// import React from "react";
// import style from "../forms/style.module.css";

// import {
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
//   Button,
// } from "@nextui-org/react";
// import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
// import { useState, useEffect } from "react";
// import DataTable, { TableColumn } from "react-data-table-component";
// import { IoEllipsisHorizontal } from "react-icons/io5";
// import Image from "next/image";
// import { ProductType } from "@/types/product";
// import { baseApi,ACCESS_TOKEN } from "@/constants/baseApi";
// import { open } from "fs";
// import { ErrorMessage, Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
// const customStyles = {
  
//   rows: {
//     style: {
//       maxWidth:"1250px",
//       minwidth:"10px",
//       minHeight: "72px", // override the row height
//     },
//   },
//   headCells: {
//     style: {
//       paddingLeft: "8px", // override the cell padding for head cells
//       paddingRight: "8px",
//     },
//   },
//   cells: {
//     style: {
     
//       paddingLeft: "8px", // override the cell padding for data cells
//       paddingRight: "8px",
//     },
//   },
// };

// type CatageoryType = {
// 	name: string;
// 	icon: string;
// };

// type ProductUpdateType = {
//   id:number | string,
// 	category: CatageoryType;
// 	name: string;
// 	desc: string;
// 	image: string;
// 	price: number;
// 	quantity: number;
// };

// const initialValues = {
// 	categoryName: "",
// 	categoryIcon: "",
// 	name: "",
// 	desc: "",
// 	image: "",
// 	price: 0,
// 	quantity: 0,
// 	fileIcon: null,
// 	fileProduct: null,
// };
// const FILE_SIZE = 1024 * 1024 * 2; // 2MB
// const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

// const validationSchema = Yup.object().shape({
// 	categoryName: Yup.string().required("Required"),
// 	name: Yup.string().required("Required"),
// 	desc: Yup.string().nullable(),
// 	price: Yup.number().required("Required"),
// 	quantity: Yup.number().required("Required"),
// 	fileIcon: Yup.mixed()
// 		.test("fileFormat", "Unsupported Format", (value: any) => {
// 			if (!value) {
// 				return true;
// 			}
// 			return SUPPORTED_FORMATS.includes(value.type);
// 		})
// 		.test("fileSize", "File Size is too large", (value: any) => {
// 			if (!value) {
// 				true;
// 			}
// 			return value.size <= FILE_SIZE;
// 		})

// 		.required("Required"),
// 	fileProduct: Yup.mixed()
// 		.test("fileFormat", "Unsupported Format", (value: any) => {
// 			if (!value) {
// 				return true;
// 			}
// 			return SUPPORTED_FORMATS.includes(value.type);
// 		})
// 		.test("fileSize", "File Size is too large", (value: any) => {
// 			if (!value) {
// 				true;
// 			}
// 			return value.size <= FILE_SIZE;
// 		})

// 		.required("Required"),
// });
// // const customStyles = {
  
// //   table:{
// //      style:{
// //        maxWidth:"full"
// //      }
// //   },
  
// //     rows: {
// //       style: {
// //         // minWidth: "1000px",
// //         maxWidth: "50px",
// //         minHeight: "10px", // override the row height
// //       },
// //     },
// //     headCells: {
// //       style: {
       
// //         paddingLeft: "8px", // override the cell padding for head cells
// //         paddingRight: "8px",
// //       },
// //     },
   
// //   };

// const ProductsTable =()=>{
//     const [getProduct, setProduct] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState([]);
//   const {isOpen, onOpen, onOpenChange} = useDisclosure();
//   const [productDetail, setProductDetail] = useState({} as ProductType)
//   const [updateProduct,setUpdateProduct]=useState({} as ProductType)
//   function handleDetail(value: ProductType) {
//     onOpen();
//     setProductDetail(value)
    
//   }

//   function handleProductUpdate(value:ProductType){
//      onOpen();
//      setUpdateProduct(value)
//   }
//   const [productId, setProductId] = useState();
  
  

//   const columnsData: TableColumn<ProductType>[] = [
//     {
//       name: "ID",
//       selector: (row): any => (
//         <div className=" font-bold text-blue-600">{row.id}</div>
//       ),
//       sortable: true,
//     },
//     {
//       name: "Name",
//       selector: (row) => row.name,
//       sortable: true,
//     },
//     {
//       name: "Category",
//       selector: (row) => row.category,
//       sortable: true,
//     },
//     {
//         name: "Price",
//         selector: (row) => row.price,
//         sortable: true,

//     },
   
//     {
//         name: "Description",
//         selector: (row) => row.desc,
//         sortable: true,
//     },
//     {
//       name: "Image",
//       selector: (row): any => (
//         <Image src={row.image} width={70} height={70} alt="user" />
//       ),
//     },
//     {
//       name: "Action",
//       cell: (row) => {
//         return (
//           <div>
//             <Dropdown>
//               <DropdownTrigger>
//                 <button>
//                   <IoEllipsisHorizontal />
//                 </button>
//               </DropdownTrigger>
//               <DropdownMenu aria-label="Static Actions">
//                 <DropdownItem
//                   key="detail"
//                   onClick={()=> handleDetail(row)}
//                 >
//                   View Detail
//                 </DropdownItem>

//                 <DropdownItem key="edit" onClick={()=>handleProductUpdate(row)}>Edit</DropdownItem>
//                 <DropdownItem
//                   key="delete"
//                   className="text-danger"
//                   color="danger"
//                 >
//                   Delete
//                 </DropdownItem>
//               </DropdownMenu>
//             </Dropdown>
//           </div>
//         );
//       },
//     },
//   ];
//   useEffect(() => {
//     async function fetchData() {
//       const data = await fetch(`${baseApi}products`);
//       const response = await data.json();
//       setProduct(response.results);
//       setFilter(response.results);
//     }
//     fetchData();
//     setIsLoading(false);
//   }, []);
//   useEffect(() => {
//     if (!search) {
//       setFilter(getProduct);
//       return;
//     }
//     const result = getProduct.filter((item: ProductType) => {
//       return item.name?.toLowerCase().includes(search.toLowerCase());
//     });
//     setFilter(result);
//   }, [getProduct, search]);
//    useEffect(()=>{
//     async function updateProducts(){
//         const data = await fetch(`${baseApi}products`);

//     }
//    })
//   const paginationComponentOptions = {
//     rowsPerPageText: "row in per page",
//     rangeSeparatorText: "of",
//     selectAllRowsItem: true,
//     selectAllRowsItemText: "all",
//   };

//   const handleUploadeIcon = async (
// 		file: any,
// 		name: any,
// 		typeFile: "category" | "product"
// 	) => {
// 		const formData = new FormData();
// 		formData.append("name", name);
// 		formData.append("image", file);

// 		const rest = await fetch(`${baseApi}/api/file/${typeFile}/`, {
// 			method: "PUT",
// 			headers: {
// 				Authorization: `Bearer ${ACCESS_TOKEN}`,
// 			},
// 			body: formData,
// 		});

// 		const data = await rest.json();
// 		return data.image;
// 	};

// 	const handleSubmitProudct = async (value: ProductUpdateType) => {
// 		const res = await fetch(`${baseApi}api/products/${value.id}`, {
// 			method: "PUT",
// 			headers: {
// 				"Content-Type": "application/json",
// 				Authorization: `Bearer ${ACCESS_TOKEN}`,
// 			},
// 			body: JSON.stringify(value),
// 		});

//         const data = await res.json()

//         console.log("product uploade: ", data)
// 	};
//   return (
//     <div className="">
//       <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
//               <ModalBody>
//                 <p> 
//                   {productDetail.name}
//                 </p>
//                 <Image src={productDetail.image} width={200} height={200} alt="products" />
//                 <p>
//                   {productDetail.desc}
//                 </p>
               
              
//               </ModalBody>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
   
//       <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
//         <ModalContent>
//           {(onClose) => (
//             <>
//             <Formik
// 				initialValues={initialValues}
// 				validationSchema={validationSchema}
// 				onSubmit={async (values) => {

// 					// upload file icon
// 					const fileIcon = values.fileIcon;
// 					const categoryIcon = await handleUploadeIcon(
// 						fileIcon,
// 						values.categoryName,
// 						"category"
// 					);

// 					// upload file product
// 					const fileProduct = values.fileProduct;
// 					const productImage = await handleUploadeIcon(
// 						fileProduct,
// 						values.name,
// 						"product"
// 					);
					
// 					// create product post
//                     const productUpdate: ProductUpdateType = {
//                       category: {
//                         name: values.categoryName,
//                         icon: categoryIcon,
//                       },
//                       name: values.name,
//                       desc: values.desc,
//                       image: productImage,
//                       price: values.price,
//                       quantity: values.quantity,
//                       id: ""
//                     }

//                     // post product
//                     handleSubmitProudct(productUpdate)
// 				}}
// 			>
// 				{({ setFieldValue }) => (
// 					<Form className="bg-gray-100 p-4 rounded-lg w-96">
// 						<h1 className={`${style.title}`}>Create Product</h1>
// 						{/* Product Name */}
// 						<div className="mb-5">
// 							<label className={`${style.label}`} htmlFor="name">
// 								Product Name
// 							</label>
// 							<Field
// 								type="text"
// 								name="name"
// 								id="name"
// 								className={`${style.input}`}
              
// 							/>
// 							<ErrorMessage
// 								name="name"
// 								component="div"
// 								className={`${style.error}`}
// 							/>
// 						</div>

// 						{/* Product Description */}
// 						<div className="mb-5">
// 							<label className={`${style.label}`} htmlFor="desc">
// 								Product Description
// 							</label>
// 							<Field
// 								type="text"
// 								name="desc"
// 								id="desc"
// 								component="textarea"
// 								className={`${style.input}`}
// 							/>
// 							<ErrorMessage
// 								name="desc"
// 								component="div"
// 								className={`${style.error}`}
// 							/>
// 						</div>

// 						{/* Product Price */}
// 						<div className="mb-5">
// 							<label className={`${style.label}`} htmlFor="price">
// 								Product Price
// 							</label>
// 							<Field
// 								type="number"
// 								name="price"
// 								id="price"
// 								className={`${style.input}`}

// 							/>
// 							<ErrorMessage
// 								name="price"
// 								component="div"
// 								className={`${style.error}`}
// 							/>
// 						</div>

// 						{/* Product Quantity */}
// 						<div className="mb-5">
// 							<label className={`${style.label}`} htmlFor="price">
// 								Product Quantity
// 							</label>
// 							<Field
// 								type="number"
// 								name="quantity"
// 								id="quantity"
// 								className={`${style.input}`}
// 							/>
// 							<ErrorMessage
// 								name="quantity"
// 								component="div"
// 								className={`${style.error}`}
// 							/>
// 						</div>

// 						{/* Product Category */}
// 						<div className="mb-5">
// 							<label className={`${style.label}`} htmlFor="categoryName">
// 								Product Category Name
// 							</label>
// 							<Field
// 								type="text"
// 								name="categoryName"
// 								id="categoryName"
// 								className={`${style.input}`}
// 							/>
// 							<ErrorMessage
// 								name="categoryName"
// 								component="div"
// 								className={`${style.error}`}
// 							/>
// 						</div>

// 						{/* Product Category Icon*/}
// 						<div className="mb-5">
// 							<label className={`${style.label}`} htmlFor="categoryIcon">
// 								Product Category Icon
// 							</label>
// 							<Field
// 								type="file"
// 								name="fileIcon"
// 								id="fileIcon"
// 								component={CustomInput}
// 								setFieldValue={setFieldValue}
// 								className={`${style.input}`}
// 							/>
// 							<ErrorMessage
// 								name="fileIcon"
// 								component="div"
// 								className={`${style.error}`}
// 							/>
// 						</div>

// 						{/* Product Image*/}
// 						<div className="mb-5">
// 							<label className={`${style.label}`} htmlFor="fileProduct">
// 								Product Image
// 							</label>
// 							<Field
// 								type="file"
// 								name="fileProduct"
// 								id="fileProduct"
// 								component={CustomInput}
// 								setFieldValue={setFieldValue}
// 								className={`${style.input}`}
// 							/>
// 							<ErrorMessage
// 								name="fileProduct"
// 								component="div"
// 								className={`${style.error}`}
// 							/>
// 						</div>

// 						{/* button submit */}
// 						<button type="submit" className={`${style.button}`}>
// 							Submit
// 						</button>
// 					</Form>
// 				)}
// 			</Formik>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
   

//       <DataTable
      
//         progressPending={isLoading}
//         columns={columnsData}
//         fixedHeader={true}
//         fixedHeaderScrollHeight="500px"
//         selectableRows
//         pagination
//         subHeader
//          customStyles={customStyles}
//         subHeaderComponent={
//           <input
//           className="border-[1px] px-4 py-2 w-full rounded-md border-blue-400"
//           placeholder="Search products..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           ></input>
//         }
//         paginationComponentOptions={paginationComponentOptions}
//         onSelectedRowsChange={() => console.log("row selected")}
//         progressComponent={<LoadingComponent />}
       
//         data={filter}
        
//       />
//     </div>
//   );


// }  
// export default ProductsTable;

// const CustomInput = ({ field, form, setFieldValue }: any) => {
// 	const [imagePreview, setImagePreview] = useState("");

// 	const handleUploadeFile = (e: any) => {
// 		const file = e.target.files[0];
// 		const localUrl = URL.createObjectURL(file);
// 		console.log(localUrl);
// 		setImagePreview(localUrl);

// 		setFieldValue(field.name, file);
// 	};
// 	return (
// 		<div>
// 			<input onChange={(e) => handleUploadeFile(e)} type="file" />
// 			{imagePreview && <img src={imagePreview} alt="preview" />}
// 		</div>
// 	);
// };