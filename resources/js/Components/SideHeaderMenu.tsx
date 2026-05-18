
export default function SideHeaderMenu() {
    return (
        <div id="SideHeaderMenu">
            <div className="content">
                <p>OUR MENU</p>
                <ul>
                    <li><a href="#">Nouveautés</a></li>
                    <li><a href="#">Meilleures ventes</a></li>
                    <li><a href="#">Promotions</a></li>
                    <li><a href="#">Femme</a></li>
                    <li><a href="#">Homme</a></li>
                    <li><a href="#">Enfants</a></li>
                    <li><a href="#">Vêtements</a></li>
                    <li><a href="#">Chaussures</a></li>
                    <li><a href="#">Accessoires</a></li>
                    <li><a href="#">Maison</a></li>
                    <li><a href="#">Technologie</a></li>
                    <li><a href="#">Beauté</a></li>
                    <li><a href="#">Sport</a></li>
                    <li><a href="#">Marques</a></li>
                    <li><a href="#">Cartes cadeaux</a></li>
                    <li><a href="#">Outlet</a></li>
                </ul>
            </div>
            <button className="closeBtn"
                onClick={()=> {
                    document.getElementById('SideHeaderMenu')?.classList.remove("active");
                }}
            >
                <i className="fa-solid fa-xmark"></i>
            </button>
        </div>
    )
}