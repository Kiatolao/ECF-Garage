import React from 'react'
import {SocialMedia} from './Socialmedia'
import layer from '../assets/layer.jpg';
import logo2 from '../assets/parrot-logo.png';

export const Privacy = () => {
  return (
    <>
        <SocialMedia />
            <img src={layer} alt="fond navbar" className="h-[70px] w-full bg-cover shadow-xl bg-opacity-80 "/>
            <div className="flex-grow border-t border-black"></div>
            <div className="relative flex py-3 items-center p-5 pt-5">
            <div className="flex-grow border-t border-red-700"></div>
            <img src={logo2} className="h-[50px]" alt="logo garage parrot" />
            <div className="flex-grow border-t border-red-700"></div>
            </div>
            <div className="text-gray-800 m-10">
            <h1 className="text-2xl font-bold mb-4">Politique de confidentialité du site de garage</h1>

            <p className="mb-4">
            La confidentialité des visiteurs de notre site web est extrêmement importante pour nous. Cette politique de
            confidentialité décrit les types d'informations personnelles collectées et enregistrées par notre site de garage et
            comment nous les utilisons.
            </p>

            <h2 className="text-xl font-bold mb-2">Collecte d'informations personnelles</h2>

            <p className="mb-4">
            Lorsque vous visitez notre site de garage, nous pouvons collecter certaines informations personnelles vous
            concernant, telles que votre nom, votre adresse e-mail, votre numéro de téléphone, votre adresse postale, etc. Ces
            informations sont collectées volontairement de votre part lorsque vous remplissez des formulaires, vous inscrivez à
            un service, passez une commande ou interagissez avec notre site de quelque manière que ce soit.
            </p>

            <h2 className="text-xl font-bold mb-2">Utilisation des informations</h2>

            <p className="mb-4">
            Nous utilisons les informations personnelles que vous nous fournissez pour les finalités suivantes :
            </p>

            <ul className="list-disc list-inside mb-4">
            <li>Répondre à vos demandes de renseignements et vous fournir les informations, produits ou services que vous avez demandés.</li>
            <li>Traiter vos commandes et vous fournir les services demandés.</li>
            <li>Communiquer avec vous concernant les mises à jour, les offres spéciales, les promotions ou les nouvelles informations relatives à notre site de garage, si vous avez choisi de recevoir de telles communications.</li>
            <li>Améliorer l'expérience des utilisateurs sur notre site et personnaliser le contenu et les offres en fonction de vos intérêts et préférences.</li>
            <li>Répondre à des obligations légales ou réglementaires.</li>
            </ul>

            <h2 className="text-xl font-bold mb-2">Protection des informations</h2>

            <p className="mb-4">
            Nous prenons des mesures de sécurité appropriées pour protéger vos informations personnelles contre tout accès non
            autorisé, utilisation abusive ou divulgation. Nous utilisons des protocoles sécurisés (tels que HTTPS) pour la
            transmission des données sensibles.
            </p>

            <h2 className="text-xl font-bold mb-2">Cookies</h2>

            <p className="mb-4">
            Notre site de garage utilise des cookies pour améliorer l'expérience des utilisateurs, analyser les tendances,
            administrer le site et collecter des informations démographiques sur nos utilisateurs dans leur ensemble. Les
            cookies sont de petits fichiers texte stockés sur votre ordinateur par votre navigateur web. Vous pouvez contrôler
            ou refuser les cookies via les paramètres de votre navigateur, mais cela peut affecter certaines fonctionnalités
            de notre site.
            </p>

            <h2 className="text-xl font-bold mb-2">Partage d'informations</h2>

            <p className="mb-4">
            Nous ne vendons pas, ne louons pas et ne partageons pas vos informations personnelles avec des tiers, sauf dans les
            cas suivants :
            </p>

            <ul className="list-disc list-inside mb-4">
            <li>Lorsque cela est nécessaire pour fournir les services que vous avez demandés.</li>
            <li>Lorsque nous sommes tenus de le faire par la loi ou dans le cadre d'une procédure légale.</li>
            <li>Lorsque cela est nécessaire pour protéger nos droits, notre propriété ou notre sécurité, ainsi que ceux de nos utilisateurs ou du public.</li>
            </ul>

            <h2 className="text-xl font-bold mb-2">Liens externes</h2>

            <p className="mb-4">
            Notre site de garage peut contenir des liens vers des sites externes qui ne sont pas couverts par cette politique de
            confidentialité. Nous ne sommes pas responsables des pratiques de confidentialité ou du contenu de ces sites externes. Nous vous encourageons àconsulter les politiques de confidentialité de ces sites avant de fournir toute information personnelle.
            </p>

            <h2 className="text-xl font-bold mb-2">Consentement</h2>

            <p className="mb-4">
            En utilisant notre site de garage, vous consentez à notre politique de confidentialité et à la collecte et l'utilisation de vos informations personnelles comme décrit dans cette politique.
            </p>

            <h2 className="text-xl font-bold mb-2">Mise à jour de la politique de confidentialité</h2>

            <p className="mb-4">
            Nous nous réservons le droit de mettre à jour ou de modifier notre politique de confidentialité à tout moment. Toute modification sera publiée sur cette page avec une date de révision mise à jour.
            </p>

            <p className="mb-4">
            Si vous avez des questions supplémentaires concernant notre politique de confidentialité ou si vous souhaitez exercer vos droits liés à vos informations personnelles, veuillez nous contacter via les coordonnées fournies sur notre site.
            </p>

            <p className="text-sm italic">Dernière mise à jour : [14/11/2023]</p>
            </div>
</>
  )
}
