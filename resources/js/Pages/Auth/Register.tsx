import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEvent } from "react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Inscription" />

            <section className="authPage">
                <div className="authShell">
                    <div className="authIntro">
                        <span className="eyebrow">Nouveau client</span>
                        <h1>Creez votre compte pour enregistrer vos produits et passer commande plus vite</h1>
                        <p>
                            Un seul compte pour enregistrer vos adresses, conserver vos coups de coeur
                            et suivre vos achats sans friction.
                        </p>
                        <ul>
                            <li>Panier conserve entre vos visites</li>
                            <li>Acces rapide aux produits consultes</li>
                            <li>Gestion simple de vos commandes</li>
                        </ul>
                    </div>

                    <div className="authCard">
                        <div className="authCardHead">
                            <h2>Creer un compte</h2>
                            <p>Renseignez vos informations pour ouvrir votre espace client.</p>
                        </div>

                        <form onSubmit={submit} className="authForm">
                            <label>
                                <span>Nom complet</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    autoComplete="name"
                                    onChange={(event) => setData("name", event.target.value)}
                                />
                                {errors.name && <small>{errors.name}</small>}
                            </label>

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
                                    autoComplete="new-password"
                                    onChange={(event) => setData("password", event.target.value)}
                                />
                                {errors.password && <small>{errors.password}</small>}
                            </label>

                            <label>
                                <span>Confirmation du mot de passe</span>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    autoComplete="new-password"
                                    onChange={(event) => setData("password_confirmation", event.target.value)}
                                />
                                {errors.password_confirmation && <small>{errors.password_confirmation}</small>}
                            </label>

                            <button type="submit" disabled={processing} className="primaryAction">
                                {processing ? "Creation..." : "Creer mon compte"}
                            </button>
                        </form>

                        <div className="authLinks">
                            <Link href="/login">J'ai deja un compte</Link>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
