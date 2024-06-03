function FooterTienda() {
    return (
        <div className="product-footer">
            <div className="container">
                <div className="product-footer-items flex gap-4 items-start" uk-grid="">
                    <div className="">
                        <h5 className="product-footer-title">Medios de pago</h5>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit...
                    </div>
                    <div>
                        <h5 className="footer__top__title text--primary">Nuestras redes sociales</h5>
                        <ul className="footer__top__social-media-list uk-flex uk-flex-row uk-flex-wrap">
                            <li className="footer__top__social-media-item text--primary">
                                <a href="https://instagram.com/fiebrediseno" className="footer__top__social-media-link" target="_blank" rel="noreferrer">
                                    <i className="fab fa-instagram footer__top__social-media-icon">Instagram</i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="footer__top__title text--primary">Contacto</h5>
                        <div className="product-footer-icons uk-flex uk-flex-row uk-flex-wrap">
                            <ul className="footer__top__info-list uk-flex uk-flex-column">
                                <li className="footer__top__info-item text--primary">
                                    <a href="mailto:fiebredg@hotmail.com" className="footer__top__info-link" target="_blank" rel="noreferrer">
                                        <i className="fas fa-envelope footer__top__info-icon"></i> fiebredg@hotmail.com
                                    </a>
                                </li>
                                <li className="footer__top__info-item text--primary">
                                    <a href="#regret-modal" uk-toggle="">
                                        <i className="fas fa-chevron-right footer__top__info-icon"></i> Botón de arrepentimiento
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default FooterTienda