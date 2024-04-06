"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import style from "./style.module.css";
import { useState } from "react";
import {baseApi, ACCESS_TOKEN } from "@/constants/baseApi";

type CatageoryType = {
	name: string;
	icon: string;
};

type ProductPostType = {
	category: CatageoryType;
	name: string;
	desc: string;
	image: string;
	price: number;
	quantity: number;
};

const initialValues = {
	categoryName: "",
	categoryIcon: "",
	name: "",
	desc: "",
	image: "",
	price: 0,
	quantity: 0,
	fileIcon: null,
	fileProduct: null,
};

const FILE_SIZE = 1024 * 1024 * 2; // 2MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const validationSchema = Yup.object().shape({
	categoryName: Yup.string().required("Required"),
	name: Yup.string().required("Required"),
	desc: Yup.string().nullable(),
	price: Yup.number().required("Required"),
	quantity: Yup.number().required("Required"),
	fileIcon: Yup.mixed()
		.test("fileFormat", "Unsupported Format", (value: any) => {
			if (!value) {
				return true;
			}
			return SUPPORTED_FORMATS.includes(value.type);
		})
		.test("fileSize", "File Size is too large", (value: any) => {
			if (!value) {
				true;
			}
			return value.size <= FILE_SIZE;
		})

		.required("Required"),
	fileProduct: Yup.mixed()
		.test("fileFormat", "Unsupported Format", (value: any) => {
			if (!value) {
				return true;
			}
			return SUPPORTED_FORMATS.includes(value.type);
		})
		.test("fileSize", "File Size is too large", (value: any) => {
			if (!value) {
				true;
			}
			return value.size <= FILE_SIZE;
		})

		.required("Required"),
});

export default function CreateUpdateForm() {
	const handleUploadeIcon = async (
		file: any,
		name: any,
		typeFile: "category" | "product"
	) => {
		const formData = new FormData();
		formData.append("name", name);
		formData.append("image", file);

		const rest = await fetch(`${baseApi}/api/file/${typeFile}/`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${ACCESS_TOKEN}`,
			},
			body: formData,
		});

		const data = await rest.json();
		return data.image;
	};

	const handleSubmitProudct = async (value: ProductPostType) => {
		const res = await fetch(`${baseApi}/api/products/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${ACCESS_TOKEN}`,
			},
			body: JSON.stringify(value),
		});

        const data = await res.json()

        console.log("product uploade: ", data)
	};

	return (
		<main className={`${style.container}`}>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={async (values) => {

					// upload file icon
					const fileIcon = values.fileIcon;
					const categoryIcon = await handleUploadeIcon(
						fileIcon,
						values.categoryName,
						"category"
					);

					// upload file product
					const fileProduct = values.fileProduct;
					const productImage = await handleUploadeIcon(
						fileProduct,
						values.name,
						"product"
					);
					
					// create product post
                    const productPost: ProductPostType = {
                        category: {
                            name: values.categoryName,
                            icon: categoryIcon,
                        },
                        name: values.name,
                        desc: values.desc,
                        image: productImage,
                        price: values.price,
                        quantity: values.quantity,
                    }

                    // post product
                    handleSubmitProudct(productPost)
				}}
			>
				{({ setFieldValue }) => (
					<Form className="bg-gray-100 p-4 rounded-lg w-96">
						<h1 className={`${style.title}`}>Create Product</h1>
						{/* Product Name */}
						<div className="mb-5">
							<label className={`${style.label}`} htmlFor="name">
								Product Name
							</label>
							<Field
								type="text"
								name="name"
								id="name"
								className={`${style.input}`}
							/>
							<ErrorMessage
								name="name"
								component="div"
								className={`${style.error}`}
							/>
						</div>

						{/* Product Description */}
						<div className="mb-5">
							<label className={`${style.label}`} htmlFor="desc">
								Product Description
							</label>
							<Field
								type="text"
								name="desc"
								id="desc"
								component="textarea"
								className={`${style.input}`}
							/>
							<ErrorMessage
								name="desc"
								component="div"
								className={`${style.error}`}
							/>
						</div>

						{/* Product Price */}
						<div className="mb-5">
							<label className={`${style.label}`} htmlFor="price">
								Product Price
							</label>
							<Field
								type="number"
								name="price"
								id="price"
								className={`${style.input}`}
							/>
							<ErrorMessage
								name="price"
								component="div"
								className={`${style.error}`}
							/>
						</div>

						{/* Product Quantity */}
						<div className="mb-5">
							<label className={`${style.label}`} htmlFor="price">
								Product Quantity
							</label>
							<Field
								type="number"
								name="quantity"
								id="quantity"
								className={`${style.input}`}
							/>
							<ErrorMessage
								name="quantity"
								component="div"
								className={`${style.error}`}
							/>
						</div>

						{/* Product Category */}
						<div className="mb-5">
							<label className={`${style.label}`} htmlFor="categoryName">
								Product Category Name
							</label>
							<Field
								type="text"
								name="categoryName"
								id="categoryName"
								className={`${style.input}`}
							/>
							<ErrorMessage
								name="categoryName"
								component="div"
								className={`${style.error}`}
							/>
						</div>

						{/* Product Category Icon*/}
						<div className="mb-5">
							<label className={`${style.label}`} htmlFor="categoryIcon">
								Product Category Icon
							</label>
							<Field
								type="file"
								name="fileIcon"
								id="fileIcon"
								component={CustomInput}
								setFieldValue={setFieldValue}
								className={`${style.input}`}
							/>
							<ErrorMessage
								name="fileIcon"
								component="div"
								className={`${style.error}`}
							/>
						</div>

						{/* Product Image*/}
						<div className="mb-5">
							<label className={`${style.label}`} htmlFor="fileProduct">
								Product Image
							</label>
							<Field
								type="file"
								name="fileProduct"
								id="fileProduct"
								component={CustomInput}
								setFieldValue={setFieldValue}
								className={`${style.input}`}
							/>
							<ErrorMessage
								name="fileProduct"
								component="div"
								className={`${style.error}`}
							/>
						</div>

						{/* button submit */}
						<button type="submit" className={`${style.button}`}>
							Submit
						</button>
					</Form>
				)}
			</Formik>
		</main>
	);
}

const CustomInput = ({ field, form, setFieldValue }: any) => {
	const [imagePreview, setImagePreview] = useState("");

	const handleUploadeFile = (e: any) => {
		const file = e.target.files[0];
		const localUrl = URL.createObjectURL(file);
		console.log(localUrl);
		setImagePreview(localUrl);

		setFieldValue(field.name, file);
	};
	return (
		<div>
			<input onChange={(e) => handleUploadeFile(e)} type="file" />
			{imagePreview && <img src={imagePreview} alt="preview" />}
		</div>
	);
};





// "use client";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import React, { useState } from "react";
// import * as Yup from "yup";
// import Image from "next/image";
// import axios from "axios";
// import { baseApi } from "@/constants/baseApi";
// type CatageoryType = {
// 	name: string;
// 	icon: string;
// };

// type ProductPostType = {
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


// const FILE_SIZE = 1024 * 1024 * 5; // 5MB
// const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];


// const validationSchema = Yup.object().shape({
//   categoryName: Yup.string().required("Required"),
// 	name: Yup.string().required("Required"),
// 	desc: Yup.string().nullable(),
// 	price: Yup.number().required("Required"),
// 	quantity: Yup.number().required("Required"),
//   image: Yup.mixed()
//     .test("fileSize", "File too large", (value: any) => {
//       if (!value) {
//         return true;
//       }
//       return value.size <= FILE_SIZE;
//     })
//     .test("fileFormat", "Unsupported Format", (value: any) => {
//       if (!value) {
//         return true;
//       }
//       return SUPPORTED_FORMATS.includes(value.type);
//     })
//     .required("Required"),
// });

// const fieldStyle = "border border-gray-300 rounded-md";

// const CreateProductForm = () => {
//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   myHeaders.append(
//     "Authorization",
//     "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0Mjg3MDg1LCJpYXQiOjE3MTIxMjcwODUsImp0aSI6IjZlNTZjZmVhMmYzNjQ5MWZiODBjNjQzMDUxMGNmYjBjIiwidXNlcl9pZCI6Mjd9.y7Q1_2jGpWzLIbNDS1eMdeybyi9Is4TfenCC3Fu3YYo"
//   );
//   myHeaders.append(
//     "Cookie",
//     "csrftoken=GRqwv2b5Hy7cdCEWxJ3awPkre0LuihlQN6iRxWggvNJNIjPhFcKwanvS3vNqYtLF; sessionid=qs5l7g6fua0us31wew30hxgkew3puisp"
//   );

//   const handleSubmitToServer = async (file: any,
// 		name: any,
// 		typeFile: "category" | "product"
// ) => {
//     // axios is used to make HTTP requests to the server
//     try {
//       const formData = new FormData();
// 		formData.append("name", name);
// 		formData.append("image", file);

//       const response = await axios.post(
//         `${baseApi}file/product/`,
//         formData
//       );
//       return response.data.image;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleCreateProduct = async (values:ProductPostType) => {
//     try {
//       const imageUrl = await handleSubmitToServer();
//       console.log("data: ", values);
//       const postData = await fetch(`${baseApi}products/`, {
//         method: "POST",
//         headers: myHeaders,
//         body: JSON.stringify({
//           ...values,
//           image: imageUrl,
//         }),
//       });
//       console.log("post data: ", postData);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="w-full pt-9">
//       <Formik
//         onSubmit={(values: any, { setSubmitting, resetForm }) => {
//           console.log(values);
//           const formData = new FormData();
//           formData.append("image", values.image);
//           //   handleSubmitToServer({ image: formData });
//           handleCreateProduct(values, { image: formData });
//           setSubmitting(false);
//           resetForm();
//         }}
//         validationSchema={validationSchema}
//         initialValues={initialValues }
//       >
//         {({ isSubmitting, setFieldValue }) => (
//           <Form className="flex m-[30px] flex-col gap-4">
//             {/* name */}
//             <div className="flex flex-col gap-2">
//               <label htmlFor="name">Product Name: </label>
//               <Field
//                 placeholder="T-shirt"
//                 className={fieldStyle}
//                 name="name"
//                 type="text"
//               />
//               {/* <ErrorMessage name="email">
//                 {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
//               </ErrorMessage> */}
//             </div>
//             {/* description */}
//             <div className="flex flex-col gap-2">
//               <label htmlFor="desc">Description: </label>
//               <Field
//                 placeholder="This is a t-shirt"
//                 className={fieldStyle}
//                 name="desc"
//                 type="text"
//               />
//               {/* <ErrorMessage name="email">
//                 {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
//               </ErrorMessage> */}
//             </div>
//             {/* price */}
//             <div className="flex flex-col gap-2">
//               <label htmlFor="price">Price: </label>
//               <Field
//                 placeholder="100"
//                 className={fieldStyle}
//                 name="price"
//                 type="number"
//               />
//               {/* <ErrorMessage name="email">
//                 {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
//               </ErrorMessage> */}
//             </div>
//             {/* quantity */}
//             <div className="flex flex-col gap-2">
//               <label htmlFor="price">Quantity: </label>
//               <Field
//                 placeholder="1"
//                 className={fieldStyle}
//                 name="quantity"
//                 type="number"
//               />
//               {/* <ErrorMessage name="email">
//                 {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
//               </ErrorMessage> */}

//               {/* Image  */}
//               <div>
//                 <Field
//                   name="image"
//                   className={fieldStyle}
//                   type="file"
//                   title="Select a file"
//                   setFieldValue={setFieldValue} // Set Formik value
//                   component={CustomInput} // component prop used to render the custom input
//                 />
//                 <ErrorMessage name="image">
//                   {(msg) => <div className="text-danger">{msg}</div>}
//                 </ErrorMessage>
//               </div>
//             </div>
//             <div>
//               <button
//                 type="submit"
//                 className="w-full px-4 py-3 bg-pink-600 text-white rounded-md"
//                 disabled={isSubmitting}
//               >
//                 Create
//               </button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default CreateProductForm;

// // custom Input
// function CustomInput({ field, form, setFieldValue, ...props }: any) {
//   const [previewImage, setPreviewImage] = useState<string | undefined>(
//     undefined
//   );
//   const name = field.name;
//   const onChange: any = (event: any) => {
//     console.log("event:", event.currentTarget.files);
//     const file = event.currentTarget.files[0];
//     setFieldValue(name, file);
//     setPreviewImage(URL.createObjectURL(file));
//   };

//   return (
//     <div className="flex flex-col gap-4 justify-center">
//       <input
//         type="file"
//         onChange={onChange}
//         {...props}
//         className="border border-gray-300 rounded-md"
//       />
//       {previewImage && (
//         <Image
//           className="rounded-md"
//           src={previewImage}
//           alt="preview Image"
//           width={100}
//           height={100}
//         />
//       )}
//     </div>
//   );
// }