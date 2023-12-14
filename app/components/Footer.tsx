function FooterTienda() {
    return (
        <div className="product-footer">
            <div className="container">
                <div className="product-footer-items flex" uk-grid="">
                    <div className="product-footer-item product-footer-payment-options">
                        <h5 className="product-footer-title">Medios de pago</h5>
                        <div className="product-footer-cards">
                            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/mercadopago.png" className="footer__top__icon" alt="Medio Pago" />
                            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/mastercard.png" className="footer__top__icon" alt="Medio Pago" />
                            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/visa.png" className="footer__top__icon" alt="Medio Pago" />
                            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/american-express.png" className="footer__top__icon" alt="Medio Pago" />
                            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/naranja.png" className="footer__top__icon" alt="Medio Pago" />
                            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/cabal.png" className="footer__top__icon" alt="Medio Pago" />
                            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/maestro.png" className="footer__top__icon" alt="Medio Pago" />
                            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/diners-club.png" className="footer__top__icon" alt="Medio Pago" />
                            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/nativa.png" className="footer__top__icon" alt="Medio Pago" />
                            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/argencard.png" className="footer__top__icon" alt="Medio Pago" />
                            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/pagofacil.png" className="footer__top__icon" alt="Medio Pago" />
                            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/rapipago.png" className="footer__top__icon" alt="Medio Pago" />
                            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/deposito.png" className="footer__top__icon" alt="Medio Pago" />
                            <img src="https://dk0k1i3js6c49.cloudfront.net/iconos-pago/acordar.png" className="footer__top__icon" alt="Medio Pago" />
                        </div>
                    </div>
                    <div className="product-footer-item">
                        <h5 className="footer__top__title text--primary">Nuestras redes sociales</h5>
                        <ul className="footer__top__social-media-list uk-flex uk-flex-row uk-flex-wrap">
                            <li className="footer__top__social-media-item text--primary">
                                <a href="https://instagram.com/fiebrediseno" className="footer__top__social-media-link" target="_blank" rel="noreferrer">
                                    <i className="fab fa-instagram footer__top__social-media-icon">Instagram</i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="product-footer-item">
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