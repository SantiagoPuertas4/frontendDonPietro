import { useState } from "react";
import Help from "../components/Admin/Help";
import UserList from "../components/Admin/UserList";
import ProductList from "../components/Admin/ProductList";
import ProductForm from "../components/Admin/ProductForm";

import "../components/Admin/adminView.css";
import TableConfigForm from "../components/Admin/tableConfigForm";

const AdminView = () => {
  const [help, setHelp] = useState(true);
  const [productList, setProductList] = useState(false);
  const [productForm, setProductForm] = useState(false);
  const [userList, setUserList] = useState(false);
  const [tableConfig, setTableConfig] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);

  const handleProductList = () => {
    setHelp(false);
    setProductList(true);
    setProductForm(false);
    setUserList(false);
    setTableConfig(false);
  };

  const handleProductForm = () => {
    setHelp(false);
    setProductList(false);
    setProductForm(true);
    setUserList(false);
    setTableConfig(false);
  };

  const handleUserList = () => {
    setHelp(false);
    setProductList(false);
    setProductForm(false);
    setUserList(true);
    setTableConfig(false);
  };

  const handleTableConfig = () => {
    setHelp(false);
    setProductList(false);
    setProductForm(false);
    setUserList(false);
    setTableConfig(true);
  };

  const handleButtonClick = (button) => {
    setSelectedButton(button);
    if (button === "productList") {
      handleProductList();
    }
    if (button === "productForm") {
      handleProductForm();
    }
    if (button === "userList") {
      handleUserList();
    }
    if (button === "tableConfig") {
      handleTableConfig();
    }
  };

  return (
    <>
      <section className="h1-admin">
        <h1>Administración</h1>
      </section>
      <section className="d-flex justify-content-center flex-column align-items-center container my-2 mt-4">
        <article className="d-flex justify-content-center row w-100">
          <div className="col-12 col-md-6 col-lg-4 m-1 px-1">
            <button
              onClick={() => handleButtonClick("productList")}
              className={`btn btn-admin w-100 h-100 ${
                selectedButton === "productList" ? "btn-selected" : ""
              }`}
            >
              Ver productos
            </button>
          </div>
          <div className="col-12 col-md-6 col-lg-4 my-1 px-1">
            <button
              onClick={() => handleButtonClick("productForm")}
              className={`btn btn-admin w-100 h-100 ${
                selectedButton === "productForm" ? "btn-selected" : ""
              }`}
            >
              Cargar productos
            </button>
          </div>
          <div className="col-12 col-md-6 col-lg-4 my-1 px-1">
            <button
              onClick={() => handleButtonClick("userList")}
              className={`btn btn-admin w-100 h-100 ${
                selectedButton === "userList" ? "btn-selected" : ""
              }`}
            >
              Ver usuarios
            </button>
          </div>
          <div className="col-12 col-md-6 col-lg-4 my-1 px-1">
            <button
              onClick={() => handleButtonClick("tableConfig")}
              className={`btn btn-admin w-100 h-100 ${
                selectedButton === "tableConfig" ? "btn-selected" : ""
              }`}
            >
              Cantidad de mesas
            </button>
          </div>
        </article>
        <article className="w-100">
          {help === true && <Help />}
          {productList === true && <ProductList />}
          {productForm === true && <ProductForm />}
          {userList === true && <UserList />}
          {tableConfig === true && <TableConfigForm />}
        </article>
      </section>
    </>
  );
};

export default AdminView;
