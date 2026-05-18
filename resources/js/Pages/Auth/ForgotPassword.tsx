import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEvent } from "react";

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Mot de passe oublie" />

            <section className="authPage">
                <div className="authShell">
                    <div className="authIntro">
                        <span className="eyebrow">Recuperation</span>
                        <h1>Recevez un lien de reinitialisation et retrouvez rapidement votre espace client</h1>
                        <p>
                            Entrez l&apos;adresse email associee a votre compte et nous vous enverrons
                            un lien securise pour choisir un nouveau mot de passe.
                        </p>
                        <ul>
                            <li>Lien de reinitialisation envoye par email</li>
                            <li>Acces rapide a votre compte et a vos commandes</li>
                            <li>Procedure simple en quelques etapes</li>
                        </ul>
                    </div>

                    <div className="authCard">
                        <div className="authCardHead">
                            <h2>Mot de passe oublie ?</h2>
                            <p>Saisissez votre email pour recevoir un lien de reinitialisation.</p>
                        </div>

                        {status && <p className="authStatus">{status}</p>}

                        <form onSubmit={submit} className="authForm">
                            <label>
                                <span>Email</span>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    autoComplete="username"
                                    autoFocus
                                    onChange={(event) => setData("email", event.target.value)}
                                />
                                {errors.email && <small>{errors.email}</small>}
                            </label>

                            <button type="submit" disabled={processing} className="primaryAction">
                                {processing ? "Envoi..." : "Envoyer le lien"}
                            </button>
                        </form>

                        <div className="authLinks">
                            <Link href="/login">Retour a la connexion</Link>
                            <Link href="/register">Creer un compte</Link>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
