import styles from './styles.module.scss';

export const ProductCard = ({ product, addProduct }) => {
    return (
        <li className={styles.productItem}>
            <img src={product.img} alt={product.name} />
            <div>
                <h3 className="title3">{product.name}</h3>
                <span className="captionText">{product.category}</span>
                <span className="greenText bodyText bold">{product.price.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</span>
                <button className="greenButton mediumButton" onClick={() => addProduct(product)}>Adicionar</button>
            </div>
        </li>
    )
}