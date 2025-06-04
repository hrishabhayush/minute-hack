
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/landing/Hero';
import Benefits from '@/components/landing/Benefits';
import HowItWorks from '@/components/landing/HowItWorks';
import FAQ from '@/components/landing/FAQ';
import EmailSignup from '@/components/landing/EmailSignup';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Benefits />
      <HowItWorks />
      <FAQ />
      <EmailSignup />
    </Layout>
  );
};

export default Index;
