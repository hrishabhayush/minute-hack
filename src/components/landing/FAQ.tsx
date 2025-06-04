
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How does flight delay insurance work?",
      answer: "Our flight delay insurance automatically pays out when your flight is delayed beyond a set threshold (usually 30 minutes). We use blockchain technology to ensure payouts are immediate and without the need for claims processing."
    },
    {
      question: "How much does coverage cost?",
      answer: "Premiums are calculated based on the specific risk profile of your flight, using our AI prediction model. Typically they range from $3 to $10 for $50 of coverage, with higher risk flights costing more."
    },
    {
      question: "Do I need a cryptocurrency wallet?",
      answer: "Yes, you'll need a wallet like MetaMask to receive payouts. The process is simple and we guide you through connecting your wallet when you purchase insurance."
    },
    {
      question: "How accurate are your flight delay predictions?",
      answer: "Our AI model analyzes historical flight data, weather patterns, and other factors to predict delays with high accuracy. However, no prediction system is perfect, which is why we offer insurance in the first place!"
    },
    {
      question: "How can I become an insurer?",
      answer: "Anyone can provide liquidity to our insurance pools. You'll earn a portion of the premiums collected, with returns varying based on the risk level of the flights you back."
    },
    {
      question: "Is there a maximum payout amount?",
      answer: "Currently, our standard policy offers a $50 payout for delays over 30 minutes. We plan to offer tiered coverage options with higher payout amounts in the future."
    }
  ];

  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                <AccordionTrigger className="text-left py-4 hover:text-sky">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
