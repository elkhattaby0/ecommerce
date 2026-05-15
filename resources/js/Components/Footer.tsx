export default function Footer() {
    return (
        <footer id="footer">
            <ul className="row top">
                <li><i className="fa-regular fa-credit-card"></i>Paiement sécurisé</li>
                <li><i className="fa-regular fa-building"></i>Entreprise Marocaine</li>
                <li><i className="fa-regular fa-clock"></i>14 jours pour changer d'avis</li>
            </ul>
            <section className="row middle">
                <div className="col">
                    <p>Espace client</p>
                    <ul>
                        <li><a href="#">Accueil de l’espace client</a></li>
                        <li><a href="#">Mon suivi de commande</a></li>
                        <li><a href="#">Se connecter</a></li>
                    </ul>
                </div>
                <div className="col">
                    <p>Nos services et engagements</p>
                    <ul>
                        <li><a href="#">Les modes et frais de livraison</a></li>
                        <li><a href="#">Les moyens de paiement</a></li>
                        <li><a href="#">Nos engagements RSE</a></li>
                        <li><a href="#">Devenir vendeur</a></li>
                    </ul>
                </div>
                <div className="col">
                    <p>Aide et support</p>
                    <ul>
                        <li><a href="#">Contact service client</a></li>
                        <li><a href="#">Notifier du contenu illicite</a></li>
                        <li><a href="#">Rappels de produits</a></li>
                        <li><a href="#">Qui sommes-nous ?</a></li>
                        <li><a href="#">Accessibilité numérique</a></li>
                    </ul>
                </div>
                <div className="col">
                    <p>Informations légales</p>
                    <ul>
                        <li><a href="#">Conditions générales de vente</a></li>
                        <li><a href="#">Conditions générales d’utilisation marketplace</a></li>
                        <li><a href="#">Mentions légales</a></li>
                        <li><a href="#">Référencement et classement</a></li>
                        <li><a href="#">Protection de la vie privée et des cookies</a></li>
                        <li><a href="#">Gérer mes cookies</a></li>
                        <li><a href="#">Eco-participation et reprise</a></li>
                        <li><a href="#">Rapport de transparence DSA</a></li>
                    </ul>
                </div>
            </section>
            <section className="row bottom">
                <p>© 2026 ecommerce entreprise Marocaine. Tous droits réservés.</p>
            </section>
        </footer>
    )
}