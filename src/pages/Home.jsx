import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Leaf, Coffee, Palette, Truck, Mail, Send } from 'lucide-react'
import { products } from '../data/products'

// Composant Newsletter Form
const NewsletterForm = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  if (isSubscribed) {
    return (
      <div className="text-lg text-green-300 font-medium">
        ✓ Merci pour votre inscription ! Vous recevrez bientôt nos dernières nouveautés.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <Input
        type="email"
        placeholder="Votre adresse email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 flex-1"
        required
      />
      <Button 
        type="submit" 
        className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
      >
        <Send className="h-4 w-4 mr-2" />
        S'inscrire
      </Button>
    </form>
  )
}

const Home = () => {
  const featuredProducts = products.filter(product => product.featured).slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] bg-tea-background-light overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/src/assets/hero_image.png')`, backgroundPosition: 'right center' }}
        ></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-xl text-left fade-in bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-800">
              Créez un thé qui vous ressemble
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-700">
              Chaque ingrédient est un choix, chaque tasse un moment. Imaginez votre infusion idéale — nous la réalisons pour vous.
            </p>
            <Button asChild size="lg" className="bg-tea-cta-green hover:bg-tea-cta-green/90 text-white">
              <Link to="/custom-blend">Créer mon thé</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section 'Choisissez votre type de thé ou infusion' */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Choisissez votre type de thé ou infusion</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos différentes catégories de thés et infusions pour trouver celle qui vous correspond.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-tea-background-light flex items-center justify-center mb-4">
                <img src="/src/assets/icon_the_vert.png" alt="Thé Vert" className="h-16 w-16" />
              </div>
              <span className="font-semibold text-gray-700">Thé Vert</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-tea-background-light flex items-center justify-center mb-4">
                <img src="/src/assets/icon_the_noir.png" alt="Thé Noir" className="h-16 w-16" />
              </div>
              <span className="font-semibold text-gray-700">Thé Noir</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-tea-background-light flex items-center justify-center mb-4">
                <img src="/src/assets/icon_the_blanc.png" alt="Thé Blanc" className="h-16 w-16" />
              </div>
              <span className="font-semibold text-gray-700">Thé Blanc</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-tea-background-light flex items-center justify-center mb-4">
                <img src="/src/assets/icon_infusion.png" alt="Infusions" className="h-16 w-16" />
              </div>
              <span className="font-semibold text-gray-700">Infusions</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-tea-background-light flex items-center justify-center mb-4">
                <img src="/src/assets/icon_rooibos.png" alt="Rooibos" className="h-16 w-16" />
              </div>
              <span className="font-semibold text-gray-700">Rooibos</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-tea-background-light flex items-center justify-center mb-4">
                <img src="/src/assets/icon_packs.png" alt="Les Packs" className="h-16 w-16" />
              </div>
              <span className="font-semibold text-gray-700">Les Packs</span>
            </div>
          </div>
        </div>
      </section>

{/* Section 'Créez votre infusion personnalisée en 3 étapes' */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Créez votre infusion personnalisée en 3 étapes simples</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-tea-background-light rounded-lg shadow-md">
              <div className="w-24 h-24 flex items-center justify-center mb-4">
                <img src="/src/assets/icon_imaginez.png" alt="Imaginez" className="h-full w-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">1. Imaginez</h3>
              <p className="text-muted-foreground">
                Choisissez une base de thé ou d\u0027infusion, puis ajoutez les plantes, fruits et épices selon vos goûts ou vos envies.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-tea-background-light rounded-lg shadow-md">
              <div className="w-24 h-24 flex items-center justify-center mb-4">
                <img src="/src/assets/icon_personnalisez.png" alt="Personnalisez" className="h-full w-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">2. Personnalisez</h3>
              <p className="text-muted-foreground">
                Composez votre recette librement avec notre outil interactif. Laissez parler votre créativité, sans contrainte.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-tea-background-light rounded-lg shadow-md">
              <div className="w-24 h-24 flex items-center justify-center mb-4">
                <img src="/src/assets/icon_recevez.png" alt="Recevez chez vous" className="h-full w-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">3. Recevez chez vous</h3>
              <p className="text-muted-foreground">
                Votre création est préparée à la main dans notre atelier, puis emballée dans un sachet kraft, avec votre étiquette personnalisée.
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-tea-cta-green hover:bg-tea-cta-green/90 text-white">
              <Link to="/custom-blend">Je crée mon infusion personnalisée</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section Qui sommes-nous ? */}
      <section className="py-16 bg-tea-background-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-gray-800">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Qui sommes-nous ?</h2>
            <p className="mb-4">
              **Rêves en Feuilles** est une aventure humaine et créative, portée par la passion du thé, des plantes et de la liberté de composer. Nous avons voulu créer un espace où chacun peut exprimer ses goûts à travers des mélanges naturels et sur mesure.
            </p>
            <p className="mb-4">
              Notre ambition ? Réinventer du sens aux moments de pause. Créer un lien entre bien-être et plaisir gustatif. Vous proposer une nouvelle manière de savourer le thé et les infusions : plus personnelle, plus consciente, plus responsable.
            </p>
            <p className="mb-6">
              Chaque recette est pensée, testée, puis préparée à la main dans notre atelier. Nous privilégions des ingrédients naturels, issus de cultures respectueuses de l\u0027environnement, choisis pour leur qualité, leur saveur et leur complémentarité.
            </p>
            <p className="font-semibold">
              Plus qu\u0027un simple site de vente de thés, **Rêves en Feuilles** est une invitation à explorer, recomposer. Chaque tasse devient un moment qui vous ressemble.
            </p>
            <ul className="list-disc list-inside mt-6 space-y-2">
              <li>Des thés et infusions naturels, sans arômes ajoutés.</li>
              <li>Un module de personnalisation pour créer vos propres recettes.</li>
              <li>Des packs thématiques prêts à offrir ou à découvrir.</li>
              <li>Une fabrication locale & artisanale.</li>
            </ul>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src="/src/assets/about_us_image.png" alt="À propos de nous" className="max-w-full h-auto rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* Section Blog */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Nos derniers articles</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos conseils, astuces et histoires autour du thé et des infusions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Blog Post 1 */}
            <Card className="tea-card fade-in">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img 
                  src="/src/assets/blog_article_1.png" 
                  alt="Votre Thé Idéal : Un Voyage Sensoriel Composé par Vous"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">Votre Thé Idéal : Un Voyage Sensoriel Composé par Vous</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">12 JUILLET 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3">Guide pour une personnalisation parfaite de votre thé.</p>
                <Button asChild variant="link" className="px-0 mt-2">
                  <Link to="/blog/votre-the-ideal">Lire l'article</Link>
                </Button>
              </CardContent>
            </Card>
            {/* Blog Post 2 */}
            <Card className="tea-card fade-in">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img 
                  src="/src/assets/blog_article_2.png" 
                  alt="Comment bien préparer son thé (sans se compliquer la vie)"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">Comment bien préparer son thé (sans se compliquer la vie)</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">12 AVRIL 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3">Vous débutez avec le thé en vrac ? Voici tous nos conseils pour bien l'infuser, sans prise de tête. Température, dosage, accessoires... on vous guide pas à pas pour une...</p>
                <Button asChild variant="link" className="px-0 mt-2">
                  <Link to="/blog/comment-bien-preparer-son-the">Lire l'article</Link>
                </Button>
              </CardContent>
            </Card>
            {/* Blog Post 3 */}
            <Card className="tea-card fade-in">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img 
                  src="/src/assets/blog_article_3.png" 
                  alt="Comment tirer profit de la synergie des ingrédients dans votre thé"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">Comment tirer profit de la synergie des ingrédients dans votre thé</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">12 AVRIL 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3">Les Bienfaits des Ingrédients d'un Thé ou d'une Infusion et Leurs Synergies pour le Bien-être L'univers des thés et infusions offre une richesse insoupçonnée pour quiconque cherche à...</p>
                <Button asChild variant="link" className="px-0 mt-2">
                  <Link to="/blog/synergie-ingredients-the">Lire l'article</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/blog">Voir tous nos articles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section Blog */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Nos derniers articles</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos conseils, astuces et histoires autour du thé et des infusions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Blog Post 1 */}
            <Card className="tea-card fade-in">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img 
                  src="/src/assets/blog_article_1.png" 
                  alt="Votre Thé Idéal : Un Voyage Sensoriel Composé par Vous"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">Votre Thé Idéal : Un Voyage Sensoriel Composé par Vous</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">12 JUILLET 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3">Guide pour une personnalisation parfaite de votre thé.</p>
                <Button asChild variant="link" className="px-0 mt-2">
                  <Link to="/blog/votre-the-ideal">Lire l'article</Link>
                </Button>
              </CardContent>
            </Card>
            {/* Blog Post 2 */}
            <Card className="tea-card fade-in">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img 
                  src="/src/assets/blog_article_2.png" 
                  alt="Comment bien préparer son thé (sans se compliquer la vie)"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">Comment bien préparer son thé (sans se compliquer la vie)</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">12 AVRIL 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3">Vous débutez avec le thé en vrac ? Voici tous nos conseils pour bien l'infuser, sans prise de tête. Température, dosage, accessoires... on vous guide pas à pas pour une...</p>
                <Button asChild variant="link" className="px-0 mt-2">
                  <Link to="/blog/comment-bien-preparer-son-the">Lire l'article</Link>
                </Button>
              </CardContent>
            </Card>
            {/* Blog Post 3 */}
            <Card className="tea-card fade-in">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img 
                  src="/src/assets/blog_article_3.png" 
                  alt="Comment tirer profit de la synergie des ingrédients dans votre thé"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">Comment tirer profit de la synergie des ingrédients dans votre thé</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">12 AVRIL 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3">Les Bienfaits des Ingrédients d'un Thé ou d'une Infusion et Leurs Synergies pour le Bien-être L'univers des thés et infusions offre une richesse insoupçonnée pour quiconque cherche à...</p>
                <Button asChild variant="link" className="px-0 mt-2">
                  <Link to="/blog/synergie-ingredients-the">Lire l'article</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/blog">Voir tous nos articles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Coups de Cœur</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez notre sélection de thés et infusions les plus appréciés par nos clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <Card key={product.id} className={`tea-card fade-in`} style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">({product.reviews} avis)</span>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">{product.price}€</span>
                    <Button asChild>
                      <Link to={`/product/${product.id}`}>Voir le produit</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/catalog">Voir tous nos produits</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <Mail className="h-12 w-12 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Restez informé de nos nouveautés</h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Inscrivez-vous à notre newsletter et recevez en avant-première nos nouveaux thés, 
              nos conseils d'experts et nos offres exclusives.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <Coffee className="h-16 w-16 text-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prêt à créer votre mélange parfait ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Utilisez notre outil de personnalisation pour créer un thé unique qui vous ressemble. 
              Choisissez vos ingrédients, ajustez les proportions et donnez un nom à votre création.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
              <Link to="/custom-blend">Commencer la personnalisation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

