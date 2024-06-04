import React, { useState } from "react";
import Sidenav from "../../components/adminhomepage/Sidenav";
import { Col, Row } from "react-bootstrap";
import AppHeader from "../../components/adminhomepage/AppHeader";
import FirstLayer from "../../components/adminhomepage/FirstLayer";
import InputField from "../../components/Adminproduct/InputField";
import { FormAddProduct } from "../../components/Adminproduct/FormAddProduct";
import ProductField from "../../components/Adminproduct/ProductField";
import axios from "axios";
import { useDispatch } from "react-redux";
import { uploadAddProduct } from "../../features/addProduct/addProductSlice";

const AdminAddProduct = () => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState({
    title: "",
    category: "",
    description: "",
    date: "",
    price: "",
    gender: "",
    size: "",
  });

  const { title, category, description, date, price, gender, size } =
    formFields;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => setPreviewUrl(e.target.result);
    setImage(file);
  };

  const handleClose = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "la5xwjjh");
    try {
      setImageLoading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dl0wmamcy/image/upload",
        data
      );
      setImageLoading(false);
      return response?.data.url;
    } catch (error) {
      console.log(error);
      setImageLoading(false);
    }
  };

  const handleAddProduct = async () => {
    if (!image) {
      console.error("Please select an image before adding product");
      return;
    }

    const imageUrl = await uploadImage(); // Upload image and get the URL

    if (!imageUrl) {
      console.error("Failed to upload image");
      return;
    }

    const productData = {
      title,
      category,
      description,
      date,
      price,
      gender,
      size,
      image: imageUrl, // Add uploaded image URL
    };
    try {
      dispatch(uploadAddProduct(productData));
      console.log("Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      <Row className="d-flex">
        <Col className="p-0 m-0" xl={2} lg={5}>
          <Sidenav />
        </Col>
        <Col className="p-0 m-0" xl={10} lg={7}>
          <AppHeader />
          <FirstLayer />
          <Row className="p-4">
            <Col xl={3} lg={12}>
              <p>Upload Image</p>
              <InputField
                image={image}
                setImage={setImage}
                handleClose={handleClose}
                uploadImage={uploadImage}
                handleImageChange={handleImageChange}
                setPreviewUrl={setPreviewUrl}
                previewUrl={previewUrl}
              />
            </Col>
            <Col xl={6} lg={12}>
              <p>Title</p>
              <FormAddProduct
                formFields={formFields}
                setFormFields={setFormFields}
                handleAddProduct={handleAddProduct}
              />
            </Col>
            <Col xl={3} lg={12}>
              <p>Product Image</p>
              <ProductField
                previewUrl={previewUrl}
                formFields={formFields}
                setFormFields={setFormFields}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default AdminAddProduct;
