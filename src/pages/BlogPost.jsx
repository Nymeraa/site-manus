import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar, Clock, User, ArrowLeft, Tag } from 'lucide-react'
import { blogPosts } from '../data/blog'

const BlogPost = () => {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Article non trouvé</h1>
          <p className="text-muted-foreground mb-8">
            L'article que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Button asChild>
            <Link to="/blog">Retour au blog</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <Button variant="ghost" asChild className="mb-8">
          <Link to="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au blog
          </Link>
        </Button>

        {/* Article */}
        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="aspect-video overflow-hidden rounded-lg mb-6">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary">{post.category}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime}
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(post.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          <Separator className="mb-8" />

          {/* Contenu */}
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                )
              } else if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl font-semibold mt-6 mb-3">
                    {paragraph.replace('### ', '')}
                  </h3>
                )
              } else if (paragraph.startsWith('- ')) {
                const listItems = paragraph.split('\n').filter(item => item.startsWith('- '))
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 mb-4">
                    {listItems.map((item, itemIndex) => (
                      <li key={itemIndex}>{item.replace('- ', '')}</li>
                    ))}
                  </ul>
                )
              } else if (paragraph.trim()) {
                return (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                )
              }
              return null
            })}
          </div>

          <Separator className="my-8" />

          {/* Tags */}
          <div className="flex items-center gap-2 mb-8">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Tags:</span>
            {post.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link to="/blog">← Tous les articles</Link>
            </Button>
            <Button asChild>
              <Link to="/catalog">Découvrir nos thés</Link>
            </Button>
          </div>
        </article>
      </div>
    </div>
  )
}

export default BlogPost

