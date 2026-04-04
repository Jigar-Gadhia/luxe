import { motion } from "framer-motion";

export default function FAQ() {
  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy on all unworn and unused items. Please initiate the return process through your account dashboard or contact our support team."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days. Express shipping options are available at checkout for 1-2 business day delivery."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 50 countries worldwide. International shipping times vary by location, typically taking 7-14 business days."
    },
    {
      question: "Are your products rigorously authenticated?",
      answer: "Absolutely. Every premium product on LUXE undergoes a rigorous multi-point inspection to ensure 100% authenticity and quality."
    }
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
          <p className="text-muted-foreground">Find answers to common questions about our services.</p>
        </div>

        <div className="space-y-6 pt-4">
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
