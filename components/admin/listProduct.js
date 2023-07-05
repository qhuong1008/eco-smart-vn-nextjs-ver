import React, { useState, useEffect } from "react";
import { refresh, deletePost } from "@/lib/action";
import EditPost from "./editPost";
import style from "../../styles/admin.module.css";
import EditProduct from "./editProduct";
import { Modal, Button, Text } from "@nextui-org/react";

const ListProduct = ({ products, getProducts, brands }) => {
  const [selectProduct, setSelectProduct] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [selectedId, setSelectId] = useState("");
  const [product, setProduct] = useState(null);

  const handleDelete = async () => {
    await refresh();
    await deletePost(selectedId);
    getPosts();
    setConfirmModal(false);
  };
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 divide-y" style={{ marginTop: "40px" }}>
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
        >
          <Modal.Header>
            <Text id="modal-title" b size={18}>
              Choose language for editing
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Button
              auto
              flat
              color="secondary"
              onPress={closeHandler}
              onClick={() => {
                setEditModal(true);
                setSelectProduct({
                  id: product._id,
                  condition: product.condition,
                  images: product.images,
                  initialPrice: product.initialPrice,
                  salePrice: product.salePrice,
                  description: product.description,
                  email: product.email,
                  privacy: product.privacy,
                  name: product.name,
                  brand: product.brand,
                });
              }}
            >
              Vietnamese
            </Button>
            <Button
              auto
              flat
              color="warning"
              onPress={closeHandler}
              onClick={() => {
                setEditModal(true);
                setSelectProduct({
                  id: product._id,
                  condition: product.condition,
                  images: product.images,
                  initialPrice: product.initialPrice,
                  salePrice: product.salePrice,
                  description: product.description,
                  email: product.email,
                  privacy: product.privacy,
                  name: product.name,
                  brand: product.brand,
                });
              }}
            >
              English
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onPress={closeHandler}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product, index) => (
            <>
              <div>
                <div>
                  <a className="relative block group rounded-lg" href="#">
                    <img
                      className="absolute inset-0 object-cover rounded-lg
                                w-full h-full group-hover:opacity-50"
                      src={product.images[0]}
                    />
                    <div className="relative p-5 ">
                      <div className="mt-40">
                        <div className="transition-all transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                          <div className="p-2">
                            <p className="text-lg font-medium">
                              {product.name}
                            </p>
                            <button
                              onClick={() => {
                                handler();
                                setProduct(product);
                              }}
                              className="px-4 py-2 text-sm text-white rounded-lg"
                              style={{ backgroundColor: "rgb(64, 109, 89)" }}
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      {editModal ? (
        <>
          <div className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div
              className="relative w-auto my-6 mx-auto"
              style={{ width: "80%" }}
            >
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit product</h3>
                </div>
                {/*body and footer*/}
                <EditProduct
                  setOpenModal={setEditModal}
                  getProducts={getProducts}
                  product={selectProduct}
                  setProduct={setSelectProduct}
                  brands={brands}
                />
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default ListProduct;
