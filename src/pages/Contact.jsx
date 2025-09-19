import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Mail, MapPin, Send, MessageCircle, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [newsletterEmail, setNewsletterEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Ici, vous pourriez envoyer les données à votre backend
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' })
    alert('Votre message a été envoyé avec succès !')
  }

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    console.log('Newsletter subscription:', newsletterEmail)
    setNewsletterEmail('')
    alert('Inscription à la newsletter réussie !')
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "contact@teablend.fr",
      description: "Réponse sous 24h"
    },
    {
      icon: MapPin,
      title: "Siège social",
      content: "123 Rue du Thé, 75001 Paris",
      description: "France"
    }
  ]

  const socialLinks = [
    {
      icon: Facebook,
      name: "Facebook",
      url: "https://facebook.com/teablend",
      color: "text-blue-600 hover:text-blue-700"
    },
    {
      icon: Instagram,
      name: "Instagram",
      url: "https://instagram.com/teablend",
      color: "text-pink-600 hover:text-pink-700"
    },
    {
      icon: Twitter,
      name: "Twitter",
      url: "https://twitter.com/teablend",
      color: "text-blue-400 hover:text-blue-500"
    },
    {
      icon: Youtube,
      name: "YouTube",
      url: "https://youtube.com/teablend",
      color: "text-red-600 hover:text-red-700"
    }
  ]

  const faqItems = [
    {
      question: "Comment créer un mélange personnalisé ?",
      answer: "Rendez-vous sur notre page de personnalisation, sélectionnez vos ingrédients et créez votre mélange unique !"
    },
    {
      question: "Quels sont les délais de livraison ?",
      answer: "Nous expédions sous 24-48h. La livraison prend ensuite 2-3 jours ouvrés en France métropolitaine."
    },
    {
      question: "Puis-je retourner un produit ?",
      answer: "Oui, vous avez 30 jours pour retourner un produit non ouvert. Les mélanges personnalisés ne sont pas repris."
    },
    {
      question: "Proposez-vous des thés bio ?",
      answer: "Oui, tous nos thés sont issus de l'agriculture biologique et certifiés par des organismes reconnus."
    }
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <MessageCircle className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Contactez-Nous</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une question ? Un conseil ? Notre équipe est là pour vous accompagner 
            dans votre découverte du thé.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations de contact */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nos Coordonnées</CardTitle>
                <CardDescription>
                  Plusieurs moyens de nous joindre
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{info.title}</h3>
                        <p className="text-muted-foreground">{info.content}</p>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* FAQ rapide */}
            <Card>
              <CardHeader>
                <CardTitle>Questions Fréquentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-medium text-sm">{item.question}</h4>
                    <p className="text-xs text-muted-foreground">{item.answer}</p>
                    {index < faqItems.length - 1 && <hr className="my-3" />}
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/faq">
                      Voir toutes les questions fréquentes
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Envoyez-nous un message</CardTitle>
                <CardDescription>
                  Remplissez le formulaire ci-dessous et nous vous répondrons rapidement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Sujet *</Label>
                    <Select value={formData.subject} onValueChange={(value) => handleChange('subject', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisissez un sujet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Question générale</SelectItem>
                        <SelectItem value="order">Commande</SelectItem>
                        <SelectItem value="product">Produit</SelectItem>
                        <SelectItem value="custom">Mélange personnalisé</SelectItem>
                        <SelectItem value="partnership">Partenariat</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Décrivez votre demande en détail..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full md:w-auto"
                    disabled={!formData.name || !formData.email || !formData.subject || !formData.message}
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Envoyer le message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Réseaux Sociaux et Newsletter */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Réseaux Sociaux */}
              <Card>
                <CardHeader>
                  <CardTitle>Réseaux Sociaux</CardTitle>
                  <CardDescription>
                    Suivez-nous pour les dernières actualités
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon
                      return (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors ${social.color}`}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="font-medium text-sm">{social.name}</span>
                        </a>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card>
                <CardHeader>
                  <CardTitle>Inscription Newsletter</CardTitle>
                  <CardDescription>
                    Recevez nos offres et conseils thé
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="newsletter-email">Votre email</Label>
                      <Input
                        id="newsletter-email"
                        type="email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={!newsletterEmail}
                    >
                      S'inscrire
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      En vous inscrivant, vous acceptez de recevoir nos communications. 
                      Vous pouvez vous désabonner à tout moment.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact

