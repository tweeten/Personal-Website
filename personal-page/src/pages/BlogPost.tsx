import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface BlogPostData {
  title: string;
  date: string;
  category: string;
  excerpt?: string;
  content: React.ReactNode;
}

const blogPosts: Record<string, BlogPostData> = {
  stuff: {
    title: 'The Wright Stuff',
    date: 'August 9, 2025',
    category: 'About me',
    excerpt: 'Why I decided to build my own website, how I did it, and what I learned.',
    content: (
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <motion.article className="max-w-3xl space-y-6">
        <p>
          Since this is my first blog post, let me preface everything by saying this entire website experiment has been an exercise in killing
          my imposter syndrome at every curve. I've always been someone who needs to under stand "why" something works and the fear of not knowing
          what's in my code at all times or why it works the way it does is something that still makes me uncomfortable even now.
        </p>
        <p>
          I'm releasing this as is so if you're seeing this, welcome to an incomplete blog post :D lots more thoughts to come!
        </p>
        </motion.article>
      </div>
    ),
  },
  shed: {
    title: 'The Wright Shed',
    date: 'August 9, 2025',
    category: 'About me',
    excerpt: 'Crafting the perfect space to be crafty.',
    content: (
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <motion.article className="max-w-3xl space-y-6">
        <p>
          Coming soon! It's about to get crafty yo.
        </p>
        </motion.article>
      </div>
    ),
  },
};

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const post = slug ? blogPosts[slug] : undefined;

  if (!post) {
    return (
      <div className="min-h-screen">
        <section className="py-10 md:py-16 bg-border/30 dark:bg-dark-border/20 transition-colors duration-300">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl font-light text-dark dark:text-dark-text">
                Post not found
              </h1>
              <p className="mt-4 text-dark/70 dark:text-dark-text-secondary">
                The requested article does not exist or has been moved.
              </p>
              <button
                className="mt-8 text-accent underline"
                onClick={() => navigate('/blog')}
              >
                Back to Writings
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="py-10 md:py-16 bg-border/30 dark:bg-dark-border/20 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <motion.div
            className="mb-13 md:mb-21"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mt-2 text-4xl md:text-5xl font-light leading-tight text-dark dark:text-dark-text">
              {post.title}
            </h1>
            <time className="mt-3 block text-2xl text-dark/60 dark:text-dark-text-secondary">
              {post.date}
            </time>
            {post.excerpt && (
              <p className="mt-3 text-lg text-dark/70 dark:text-dark-text-secondary max-w-3xl">
                {post.excerpt}
              </p>
            )}
            <div className="mt-4 w-16 h-1 bg-accent mb-5" />
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl"
          >
            {post.content}
          </motion.article>
        </div>
      </section>
    </div>
  );
}; 