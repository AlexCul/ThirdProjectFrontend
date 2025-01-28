import styles from "./PageNotFound.module.css";

import Phones from "/src/assets/images/pictures/phones.png";

import NavBar from "/src/components/NavBar/NavBar.jsx";
import Footer from "/src/components/Footer/Footer.jsx";

export default function PageNotFound() {
    return (
    <>
        <div className="content">
            <NavBar />
            <div className={styles.error}>
                <img src={Phones} alt="" />
                <div className={styles.text}>
                    <h3>Oops! Page not found (404)</h3>
                    <p>{`We're sorry, but the page you're looking for doesn't seem to exist. If you typed the URL manually, please double-check the spelling. If you clicked on a link, it may be outdated or broken.`}</p>
                </div>
            </div>
        </div>
        <Footer />
    </>
    );
}
