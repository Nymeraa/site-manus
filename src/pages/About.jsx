import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Leaf, Heart, Globe, Award, Users, Coffee } from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: Leaf,
      title: "Qualité Premium",
      description: "Nous sélectionnons nos thés auprès des meilleurs producteurs mondiaux, garantissant une qualité exceptionnelle."
    },
    {
      icon: Heart,
      title: "Passion du Thé",
      description: "Notre équipe partage une passion commune pour l'art du thé et la création de mélanges uniques."
    },
    {
      icon: Globe,
      title: "Commerce Équitable",
      description: "Nous travaillons directement avec les producteurs pour assurer des pratiques commerciales équitables."
    },
    {
      icon: Award,
      title: "Expertise Artisanale",
      description: "Chaque mélange est créé avec soin par nos maîtres de thé expérimentés."
    }
  ]

  const team = [
    {
      name: "Marie Dubois",
      role: "Fondatrice & Maître de Thé",
      description: "Passionnée de thé depuis 15 ans, Marie a voyagé dans le monde entier pour découvrir les meilleurs terroirs."
    },
    {
      name: "Pierre Martin",
      role: "Expert en Mélanges",
      description: "Créateur de nos mélanges signature, Pierre allie tradition et innovation pour des saveurs uniques."
    },
    {
      name: "Sophie Chen",
      role: "Responsable Qualité",
      description: "Sophie veille à ce que chaque produit respecte nos standards de qualité les plus élevés."
    }
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <Coffee className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">À Propos de TeaBlend</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Depuis 2018, TeaBlend révolutionne l'art du thé en proposant des mélanges artisanaux 
            d'exception et en permettant à chacun de créer sa propre signature gustative.
          </p>
        </div>

        {/* Notre Histoire */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  L'aventure TeaBlend a commencé en 2018 lorsque Marie Dubois, passionnée de thé depuis l'enfance, 
                  a décidé de partager sa passion avec le monde. Après des années de voyages à travers l'Asie, 
                  l'Afrique et l'Amérique du Sud, elle a acquis une expertise unique dans l'art du thé.
                </p>
                <p>
                  Convaincue que chaque personne mérite son mélange parfait, Marie a créé TeaBlend avec une mission claire : 
                  démocratiser l'accès aux thés de qualité premium et permettre à chacun de devenir créateur de ses propres mélanges.
                </p>
                <p>
                  Aujourd'hui, TeaBlend est devenu une référence dans l'univers du thé artisanal, 
                  avec plus de 10 000 clients satisfaits et des centaines de mélanges personnalisés créés chaque mois.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                <img 
                  src="/src/assets/the_infusion_ecommerce.webp" 
                  alt="Histoire TeaBlend"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos Valeurs</h2>
            <p className="text-lg text-muted-foreground">
              Les principes qui guident chacune de nos actions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <CardTitle>{value.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Notre Équipe */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Notre Équipe</h2>
            <p className="text-lg text-muted-foreground">
              Les artisans passionnés derrière TeaBlend
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardHeader>
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <Badge variant="secondary">{member.role}</Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {member.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Nos Engagements */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Nos Engagements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Leaf className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Bio & Naturel</h3>
                  <p className="text-sm text-muted-foreground">
                    Tous nos thés sont issus de l'agriculture biologique
                  </p>
                </div>
                
                <div>
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Commerce Équitable</h3>
                  <p className="text-sm text-muted-foreground">
                    Partenariats directs avec les producteurs
                  </p>
                </div>
                
                <div>
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Satisfaction Client</h3>
                  <p className="text-sm text-muted-foreground">
                    Garantie satisfait ou remboursé 30 jours
                  </p>
                </div>
                
                <div>
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Excellence</h3>
                  <p className="text-sm text-muted-foreground">
                    Contrôle qualité rigoureux à chaque étape
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Chiffres Clés */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">TeaBlend en Chiffres</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Thés différents</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1,500+</div>
              <div className="text-muted-foreground">Mélanges créés</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">15</div>
              <div className="text-muted-foreground">Pays d'origine</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About

