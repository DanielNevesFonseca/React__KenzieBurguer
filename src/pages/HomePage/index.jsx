import { useEffect, useState } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import { api } from "../../services/burguerApi";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";


export const HomePage = () => {
   const cartPreferences = localStorage.getItem("@KenzieBurguer:cartList");

   const [productList, setProductList] = useState([]);
   const [cartList, setCartList] = useState(cartPreferences !== null ? JSON.parse(cartPreferences) : []);
   const [pageLoading, setPageLoading] = useState(false);
   const [isCartModalOpen, setIsCartModalOpen] = useState(false);
   const [search, setSearch] = useState("");

   const cartListLength = cartList.length;

   useEffect(() => {
      const readProducts = async () => {
         try {
            setPageLoading(true);
            const { data } = await api.get("/products");
            const newProdList = data.map(product => ({ ...product, quantity: 1 }));
            setProductList(newProdList);
         } catch (error) {
            toast("Algum erro ocorreu");
         } finally {
            setPageLoading(false);
         }
      }
      readProducts();
   }, []);

   useEffect(() => {
      localStorage.setItem("@KenzieBurguer:cartList", JSON.stringify(cartList));
   }, [cartList]);

   const addProductToCart = (productSelected) => {
      if (!cartList.some(product => product.id === productSelected.id)) {
         productSelected.quantity = 1;
         setCartList([...cartList, productSelected]);
         toast.success("Item adicionado com sucesso!");
      } else {
         productSelected.quantity++;
         const modifiedList = cartList.map((product) => product.id === productSelected.id ? productSelected : product);
         setCartList(modifiedList);
      }
   }

   const removeOneUnit = (productSelected) => {
      if (productSelected.quantity > 1) {
         productSelected.quantity--;
         const modifiedList = cartList.map((product) => product.id === productSelected.id ? productSelected : product);
         setCartList(modifiedList);
      }
   }

   const removeProductFromCart = (productSelectedId) => {
      const listWithoutSelectedProduct = cartList.filter(product => product.id !== productSelectedId);
      setCartList(listWithoutSelectedProduct);
      toast.success("Produto removido!");
   }

   const removeAllProductsFromCart = () => {
      if (cartList.length === 0) {
         toast.warn("Não existe nenhum produto no carrinho!");
      } else {
         setCartList([]);
         toast.success("Todos os produtos foram removidos!");
      }
   }

   const filterResult = productList.filter(product => product.name.toLowerCase().includes(search.toLowerCase())
      || product.category.toLowerCase().includes(search.toLowerCase()));

   const products = search ? filterResult : productList;

   return (
      <>
         <Header cartListLength={cartListLength} setSearch={setSearch} setIsCartModalOpen={setIsCartModalOpen} />
         <main className={styles.mainContent}>
            {pageLoading
               ? <h3 className="title3">Carregando Produtos...</h3>
               : <ProductList products={products} addProduct={addProductToCart}
               />}
            
            {isCartModalOpen
               ? <CartModal
                  removeOneUnit={removeOneUnit}
                  addProductToCart={addProductToCart}
                  setCartList={setCartList}
                  cartList={cartList}
                  removeAll={removeAllProductsFromCart}
                  removeProduct={removeProductFromCart}
                  setIsCartModalOpen={setIsCartModalOpen}
               />
               : null}

         </main>
      </>
   );
};
