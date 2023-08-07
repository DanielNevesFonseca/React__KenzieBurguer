import { ProductCard } from "./ProductCard";
import styles from "./styles.module.scss";


export const ProductList = ({ addProduct, products }) => {
   return (
      <ul className={styles.productsContainer}>
         {products.length === 0 ? <h2>Nenhum produto encontrado...</h2> : products.map((product) => (
            <ProductCard key={product.id} product={product} addProduct={addProduct} />
         ))}
      </ul>
      );
};
