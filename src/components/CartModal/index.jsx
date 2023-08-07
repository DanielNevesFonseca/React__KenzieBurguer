import { MdClose } from "react-icons/md";
import { CartItemCard } from "./CartItemCard";
import styles from "./styles.module.scss";
import { useEffect, useRef } from "react";

export const CartModal = ({ cartList, removeProduct, removeAll, setIsCartModalOpen, addProductToCart, removeOneUnit }) => {
   const total = cartList.reduce((prevValue, product) => {
      return prevValue + product.price * product.quantity;
   }, 0);

   const modalRef = useRef(null);
   useEffect(() => {
      const handleOutClick = (event) => {
         if (!modalRef.current?.contains(event.target)) {
            setIsCartModalOpen(false);
         }
      }
      window.addEventListener("mousedown", handleOutClick);
      return () => {
         window.removeEventListener("mousedown", handleOutClick);
      }
   }, []);

   const buttonRef = useRef(null);
   useEffect(() => {
      const handleKeyDown = (event) => {
         if(event.key === "Escape"){
            buttonRef.current?.click();
         }
      }
      window.addEventListener("keydown", handleKeyDown);
      return () => {
         window.removeEventListener("keydown", handleKeyDown);
      }
   })

   return (
      <div className={styles.modalController} role="dialog">
         <div ref={modalRef} className={styles.modalContainer} >
            <div className={styles.headerModalBox}>
               <h2 className="title3">Carrinho de compras</h2>
               <button ref={buttonRef} className={`greenButton ${styles.buttonCloseModal}`} aria-label="close" title="Fechar" onClick={() => setIsCartModalOpen(false)}>
                  <MdClose size={21} />
               </button>
            </div>

            {cartList.length === 0
               ? <h3 className={`title3 ${styles.emptyCartMessage}`}>Nenhum produto por aqui...</h3>
               : <div className={styles.renderProductsBox}>
                  <ul>
                     {cartList.map((product) => (
                        <CartItemCard removeOneUnit={removeOneUnit} addProductToCart={addProductToCart} removeProduct={removeProduct} key={product.id} product={product} />
                     ))}
                  </ul>
               </div>}

            <div className={styles.totalValueBox}>
               <div>
                  <span className="headlineText bold">Total</span>
                  <span className="bodyText">{total.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</span>
               </div>
               <button onClick={() => removeAll()} >Remover todos</button>
            </div>
         </div>
      </div>
   );
};
