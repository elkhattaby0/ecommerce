import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEvent } from "react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Connexion" />

            <section className="authPage">
                <div className="authShell">
                    <div className="authIntro">
                        <span className="eyebrow">Espace client</span>
                        <h1>Connectez-vous pour suivre vos commandes et retrouver vos favoris</h1>
                        <p>
                            Accedez a votre panier, vos recherches recentes et vos informations de livraison
                            depuis un espace simple et centralise.
                        </p>
                        <ul>
                            <li>Suivi de commande plus rapide</li>
                            <li>Favoris et panier synchronises</li>
                            <li>Paiement et livraison simplifies</li>
                        </ul>
                    </div>

                    <div className="authCard">
                        <div className="authCardHead">
                            <h2>Se connecter</h2>
                            <p>Utilisez votre email et votre mot de passe pour acceder a votre compte.</p>
                        </div>

                        {status && <p className="authStatus">{status}</p>}

                        <form onSubmit={submit} className="authForm">
                            <label>
                                <span>Email</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    autoComplete="username"
                                    onChange={(event) => setData("email", event.target.value)}
                                />
                                {errors.email && <small>{errors.email}</small>}
                            </label>

                            <label>
                                <span>Mot de passe</span>
                                <input
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    onChange={(event) => setData("password", event.target.value)}
                                />
                                {errors.password && <small>{errors.password}</small>}
                            </label>

                            <label className="checkboxRow">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(event) => setData("remember", event.target.checked)}
                                />
                                <span>Se souvenir de moi</span>
                            </label>

                            <button type="submit" disabled={processing} className="primaryAction">
                                {processing ? "Connexion..." : "Se connecter"}
                            </button>
                        </form>

                        <div className="authLinks">
                            <Link href="/register">Creer un compte</Link>
                            {canResetPassword && <Link href={route("password.request")}>Mot de passe oublie ?</Link>}
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
