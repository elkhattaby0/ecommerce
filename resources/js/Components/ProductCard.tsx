import { Product } from "@/types"

type Props = {
    product: Product
}

export default function ProductCard({ product }: Props) {
    return (
        <a href="/details" className="card">
            <button className="wishlist">
                <i className="fa-regular fa-heart"></i>
            </button>

            {product.flags?.length > 0 && (
                <ul className="flags">
                    {product.flags.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            )}

            <img
                src={product.image}
                alt={product.title}
            />

            <h3 className="title">
                {product.title}
            </h3>

            <div className="avis">
                <span className="note">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                </span>

                <span className="reviews">
                    {product.nbrAvis} avis
                </span>
            </div>

            <ul className="info">
                {product.info?.map((item, index) => (
                    <li key={index}>
                        <i className="fa-solid fa-caret-right"></i>
                        {item}
                    </li>
                ))}
            </ul>

            {(product.variant || product.colorDots?.length || product.trust) && (
                <div className="meta">
                    {product.variant && (
                        <p className="variant">
                            <i className="fa-solid fa-layer-group"></i>
                            {product.variant}
                        </p>
                    )}

                    {product.colorDots?.length ? (
                        <div className="colors" aria-label="Couleurs disponibles">
                            {product.colorDots.map((color, index) => (
                                <span
                                    key={`${color}-${index}`}
                                    className="dot"
                                    style={{ backgroundColor: color }}
                                ></span>
                            ))}
                        </div>
                    ) : null}

                    {product.trust && (
                        <p className="trust">
                            <i className="fa-solid fa-shield-heart"></i>
                            {product.trust}
                        </p>
                    )}
                </div>
            )}

            {product.oldPrice && (
                <p className="price old">
                    {product.oldPrice}

                    <span className="currency">
                        {product.currency}
                    </span>
                </p>
            )}

            <p className="price">
                {product.price}

                <span className="currency">
                    {product.currency}
                </span>
            </p>
            <button className="panier"><i className="fa-solid fa-basket-shopping"></i> Ajouter au panier</button>
        </a>
    )
}
