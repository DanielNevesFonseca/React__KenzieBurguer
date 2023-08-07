import { MdDelete } from "react-icons/md";
import styles from "./styles.module.scss";


export const CartItemCard = ({ product, removeProduct, addProductToCart, removeOneUnit }) => {
   
   return (
      <li className={styles.productItem}>
         <div className={styles.productInfoBox}>
            <img src={product.img} alt={product.name} />
            <div className={styles.quantityBox}>
               <h3 className="title3">{product.name}</h3>
               <div>
                  <button onClick={() => removeOneUnit(product)}>-</button>
                  <span className="bodyText">{product.quantity}</span>
                  <button onClick={() => addProductToCart(product)}>+</button>
               </div>
            </div>
         </div>
         <button aria-label="delete" title="Remover item">
            <MdDelete size={21} onClick={() => removeProduct(product.id)} />
         </button>
      </li>
   );
};
