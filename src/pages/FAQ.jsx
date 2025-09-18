import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState({});

  const faqData = [
    {
      category: "Commandes et Livraison",
      questions: [
        {
          id: 1,
          question: "Quels sont les délais de livraison ?",
          answer: "Nous livrons généralement sous 2-3 jours ouvrés en France métropolitaine. Pour les autres destinations, comptez 5-7 jours ouvrés. Vous recevrez un email de confirmation avec le numéro de suivi dès l'expédition de votre commande."
        },
        {
          id: 2,
          question: "Quels sont les frais de livraison ?",
          answer: "La livraison est gratuite pour toute commande supérieure à 35€. En dessous, les frais de livraison sont de 4,90€ en France métropolitaine. Pour les autres destinations, les frais varient selon la zone géographique."
        },
        {
          id: 3,
          question: "Puis-je modifier ou annuler ma commande ?",
          answer: "Vous pouvez modifier ou annuler votre commande dans les 2 heures suivant la validation, en nous contactant directement. Passé ce délai, votre commande sera en cours de préparation et ne pourra plus être modifiée."
        },
        {
          id: 4,
          question: "Comment suivre ma commande ?",
          answer: "Dès l'expédition de votre commande, vous recevrez un email avec le numéro de suivi. Vous pourrez suivre votre colis directement sur le site de notre transporteur ou dans votre espace client."
        }
      ]
    },
    {
      category: "Produits et Qualité",
      questions: [
        {
          id: 5,
          question: "D'où viennent vos thés ?",
          answer: "Nos thés proviennent directement des meilleures plantations du monde : Chine, Inde, Sri Lanka, Japon, et bien d'autres. Nous travaillons en direct avec les producteurs pour vous garantir une qualité exceptionnelle et une traçabilité complète."
        },
        {
          id: 6,
          question: "Vos thés sont-ils biologiques ?",
          answer: "Une grande partie de notre sélection est certifiée biologique. Chaque produit indique clairement ses certifications sur sa fiche descriptive. Nous privilégions les thés issus de l'agriculture biologique et du commerce équitable."
        },
        {
          id: 7,
          question: "Comment conserver mes thés ?",
          answer: "Conservez vos thés dans un endroit sec, à l'abri de la lumière et des odeurs fortes. Utilisez de préférence des boîtes hermétiques. Évitez le réfrigérateur qui pourrait altérer les arômes. Bien conservés, nos thés gardent leurs qualités pendant 2-3 ans."
        },
        {
          id: 8,
          question: "Quelle est la différence entre vos différents grades de thé ?",
          answer: "Nous proposons différents grades selon la qualité des feuilles : les thés 'Premium' sont composés de feuilles entières de première récolte, les 'Classiques' de feuilles brisées de bonne qualité, et les 'Découverte' parfaits pour débuter."
        }
      ]
    },
    {
      category: "Personnalisation et Mélanges",
      questions: [
        {
          id: 9,
          question: "Comment fonctionne la personnalisation de thé ?",
          answer: "Notre outil de personnalisation vous permet de créer votre mélange unique en choisissant une base de thé et en y ajoutant les ingrédients de votre choix : fruits, fleurs, épices, herbes. Vous pouvez nommer votre création et la commander dans différents grammages."
        },
        {
          id: 10,
          question: "Puis-je sauvegarder mes recettes personnalisées ?",
          answer: "Oui ! Une fois votre compte créé, toutes vos recettes personnalisées sont automatiquement sauvegardées dans votre espace client. Vous pouvez les retrouver, les modifier et les recommander à tout moment."
        },
        {
          id: 11,
          question: "Y a-t-il des limites dans la personnalisation ?",
          answer: "Vous pouvez choisir une base de thé principale et ajouter jusqu'à 8 ingrédients complémentaires. Le matcha peut être ajouté en complément d'une autre base. Certains ingrédients premium peuvent avoir un supplément de prix."
        },
        {
          id: 12,
          question: "Puis-je partager mes créations avec d'autres ?",
          answer: "Absolument ! Vous pouvez partager vos recettes avec la communauté Rêves en Feuilles. Les créations les plus appréciées peuvent même être ajoutées à notre catalogue permanent avec votre nom !"
        }
      ]
    },
    {
      category: "Compte et Fidélité",
      questions: [
        {
          id: 13,
          question: "Comment créer un compte ?",
          answer: "Cliquez sur l'icône utilisateur en haut à droite du site, puis sur 'Créer un compte'. Renseignez vos informations et validez votre email. Votre compte sera immédiatement actif et vous pourrez profiter de tous nos services."
        },
        {
          id: 14,
          question: "Quels sont les avantages d'avoir un compte ?",
          answer: "Avec un compte, vous pouvez sauvegarder vos recettes personnalisées, suivre vos commandes, accéder à votre historique d'achats, recevoir des recommandations personnalisées et bénéficier d'offres exclusives."
        },
        {
          id: 15,
          question: "Comment modifier mes informations personnelles ?",
          answer: "Connectez-vous à votre espace client et cliquez sur 'Mon profil'. Vous pourrez modifier toutes vos informations : adresse, téléphone, préférences de communication, etc. N'oubliez pas de sauvegarder vos modifications."
        }
      ]
    },
    {
      category: "Préparation et Dégustation",
      questions: [
        {
          id: 16,
          question: "Comment bien préparer mon thé ?",
          answer: "Chaque thé a ses spécificités. En général : thé noir 95°C pendant 3-5 min, thé vert 70-80°C pendant 2-3 min, thé blanc 75°C pendant 4-6 min. Consultez les instructions sur chaque emballage pour des conseils précis."
        },
        {
          id: 17,
          question: "Quelle quantité de thé utiliser ?",
          answer: "Comptez généralement 2-3g de thé (1 cuillère à café) pour 150ml d'eau. Pour les thés plus délicats comme le thé blanc, vous pouvez augmenter légèrement la quantité. Ajustez selon vos goûts personnels."
        },
        {
          id: 18,
          question: "Puis-je réutiliser les feuilles de thé ?",
          answer: "Oui, surtout pour les thés de qualité supérieure ! Les thés verts et blancs peuvent être infusés 2-3 fois, les oolongs jusqu'à 5-6 fois. Augmentez légèrement le temps d'infusion à chaque utilisation."
        }
      ]
    },
    {
      category: "Retours et Satisfaction",
      questions: [
        {
          id: 19,
          question: "Que faire si je ne suis pas satisfait de ma commande ?",
          answer: "Votre satisfaction est notre priorité ! Si un produit ne vous convient pas, contactez-nous dans les 14 jours suivant la réception. Nous trouverons ensemble une solution : échange, avoir ou remboursement."
        },
        {
          id: 20,
          question: "Comment retourner un produit ?",
          answer: "Contactez notre service client qui vous fournira une étiquette de retour gratuite. Les produits doivent être dans leur emballage d'origine, non ouverts. Les mélanges personnalisés ne peuvent être retournés que s'il y a une erreur de notre part."
        },
        {
          id: 21,
          question: "Proposez-vous une garantie sur vos produits ?",
          answer: "Tous nos thés sont garantis frais et de qualité. Si vous recevez un produit défectueux ou périmé, nous le remplaçons immédiatement et gratuitement. Pour les accessoires, nous appliquons la garantie légale de 2 ans."
        }
      ]
    }
  ];

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <HelpCircle className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Foire Aux Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trouvez rapidement les réponses à toutes vos questions sur nos thés, 
            la personnalisation, les commandes et bien plus encore.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher dans la FAQ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>
        </div>

        {/* FAQ Content */}
        <div className="space-y-8">
          {filteredFAQ.map((category) => (
            <Card key={category.category} className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-primary">
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.questions.map((item) => (
                    <div key={item.id} className="border rounded-lg">
                      <Button
                        variant="ghost"
                        onClick={() => toggleItem(item.id)}
                        className="w-full justify-between p-4 h-auto text-left hover:bg-gray-50"
                      >
                        <span className="font-medium text-gray-900 pr-4">
                          {item.question}
                        </span>
                        {openItems[item.id] ? (
                          <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                      </Button>
                      {openItems[item.id] && (
                        <div className="px-4 pb-4 text-gray-600 leading-relaxed">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results */}
        {filteredFAQ.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun résultat trouvé
            </h3>
            <p className="text-gray-600 mb-4">
              Essayez avec d'autres mots-clés ou parcourez toutes les questions.
            </p>
            <Button 
              onClick={() => setSearchTerm('')}
              variant="outline"
            >
              Voir toutes les questions
            </Button>
          </div>
        )}

        {/* Contact section */}
        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Vous ne trouvez pas votre réponse ?
            </h3>
            <p className="text-gray-600 mb-6">
              Notre équipe est là pour vous aider ! N'hésitez pas à nous contacter 
              pour toute question spécifique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="/contact">Nous contacter</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:contact@revesenfeuilles.fr">
                  Envoyer un email
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;

