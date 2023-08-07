import { useState } from "react";
import Logo from "../../assets/Logo.svg";
import { MdSearch, MdShoppingCart } from "react-icons/md";
import styles from "./styles.module.scss";

export const Header = ({setIsCartModalOpen, setSearch, cartListLength}) => {
   const [value, setValue] = useState("");
   
   const submit = (event) => {
      event.preventDefault();
      setSearch(value);
      setValue("");
   }

   return (
      <header className={styles.Header}>
         <img src={Logo} alt="Logo Kenzie Burguer" />
         <div>
            <button onClick={() => setIsCartModalOpen(true)} className={styles.cartButton}>
               <MdShoppingCart size={24} color="#828282" />
               <span>{cartListLength}</span>
            </button>
         </div>
         <form onSubmit={submit}>
            <input
               className="searchInput"
               type="text"
               value={value}
               onChange={(e) => setValue(e.target.value)}
               placeholder="Digitar Pesquisa de Item"
            />
            <button className="greenButton smallButton" type="submit">
               <MdSearch size={21} />
            </button>
         </form>
      </header>
   );
};
