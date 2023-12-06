import React from 'react';
import SushiImage from '../../assets/sushi2.jpg';
import styles from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
    return <React.Fragment>
        <header className={styles.header}>
            <h1>Япона Кухня</h1>
            <HeaderCartButton onClick={props.onShowCart} />
        </header>
        <div className={styles['main-image']}>
            <img src={SushiImage} alt="Блюда японской кухни" />
        </div>
    </React.Fragment>
}

export default Header;