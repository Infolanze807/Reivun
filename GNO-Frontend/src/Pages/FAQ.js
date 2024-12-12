import React, { useState } from 'react';
import { FaChevronDown } from "react-icons/fa";
import Header from './Header';
import Footer from './Footer';

const faqData = [
  {
    title: "Disclaimer",
    items: [
      {
        question: "Is this wallet insured?",
        answer: "No, decentralized wallets do not offer insurance. Users are responsible for securing their funds and private keys."
      },
      {
        question: "Are cryptocurrencies stored in the wallet?",
        answer: "No, the wallet does not store your cryptocurrencies. It provides access to your funds on the blockchain using your private keys."
      }
    ]
  },
  {
    title: "Troubleshooting",
    items: [
      {
        question: "What should I do if my wallet app crashes?",
        answer: "Restart your device. Ensure the app is updated to the latest version. If the issue persists, reinstall the app and use your seed phrase to restore your wallet."
      },
      {
        question: "Who can I contact for support?",
        answer: "As this is a decentralized wallet, there is no centralized support team. However, you can access community forums for assistance."
      }
    ]
  },
  {
    title: "Privacy",
    items: [
      {
        question: "Is my transaction history private?",
        answer: "Transactions on the blockchain are public and can be viewed by anyone. However, your wallet does not store personal information, ensuring a degree of anonymity."
      },
      {
        question: "Can I use the wallet without sharing personal information?",
        answer: "Yes, decentralized wallets do not require personal information for setup or use, enhancing your privacy."
      }
    ]
  },
  {
    title: "Advanced Features (coming soon)",
    items: [
      {
        question: "Can I connect my wallet to decentralized apps (dApps)?",
        answer: "Yes, you can use your wallet to interact with dApps, such as DeFi platforms or NFT marketplaces. Look for the 'Connect Wallet' button on the dApp and follow the instructions."
      }
    ]
  },
  {
    title: "Technical Support",
    items: [
      {
        question: "What should I do if my transaction is stuck?",
        answer: "If your transaction is stuck, it may be due to low gas fees. Check the network status and consider increasing the fee to expedite processing. Some wallets allow you to 'replace' or 'cancel' transactions."
      },
      {
        question: "Can I recover funds sent to the wrong address?",
        answer: "Unfortunately, transactions on the blockchain are irreversible. If you send funds to the wrong address, they cannot be retrieved unless the recipient agrees to return them."
      }
    ]
  },
  {
    title: "Transactions",
    items: [
      {
        question: "How do I send cryptocurrency?",
        answer: "Open the wallet app and select 'Send.' Enter the recipient's wallet address and the amount you wish to send. Confirm the transaction details and approve it."
      },
      {
        question: "How do I receive cryptocurrency?",
        answer: "Open the wallet app and select 'Receive.' Share your wallet address or QR code with the sender. Wait for the transaction to be confirmed on the blockchain."
      }
    ]
  },
  {
    title: "Security",
    items: [
      {
        question: "How can I secure my wallet?",
        answer: "Never share your private keys or seed phrase. Use strong passwords. Avoid using wallets on public Wi-Fi. Regularly update your wallet app."
      },
      {
        question: "What happens if I lose my seed phrase?",
        answer: "If you lose your seed phrase, you lose access to your wallet and funds. It is crucial to keep a backup in a secure location, such as a safe or encrypted digital vault."
      }
    ]
  },
  {
    title: "Getting started",
    items: [
      {
        question: "How do I create a portfolio?",
        answer: "Create your portfolio on the website or download the portfolio application. Click on 'Create a new wallet'. Follow the instructions to generate an initialization phrase. Write it down and keep it in a safe place. Confirm the start phrase to complete the configuration."
      },
      {
        question: "What is a seed phrase and why is it important?",
        answer: "A seed phrase is a series of 12 to 24 words that serves as the main key to access your wallet. If you lose your wallet or device, the seed phrase can be used to recover your funds. Never share your seed phrase with anyone."
      }
    ]
  },
  {
    title: "General information",
    items: [
      {
        question: "What is a decentralized cryptocurrency wallet?",
        answer: "A decentralized crypto wallet is a digital tool that allows you to securely store, send and receive crypto-currencies. Unlike centralized wallets, decentralized wallets give you full control over your private keys and funds without relying on third parties."
      },
      {
        question: "How does a decentralized wallet differ from a centralized one?",
        answer: "Decentralized portfolios give users full ownership of their private keys and funds. In contrast, centralized portfolios are managed by third-party companies, who hold the keys on your behalf and control access to your funds."
      }
    ]
  }
];

const FAQSection = ({ section }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        className="flex justify-between items-center w-full p-4 text-left hover:bg-[--green-color] transition-colors duration-200 text-gray-200 rounded-lg border border-[--green-color]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold">{section.title}</span>
        <FaChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="mt-2 space-y-2">
          {section.items.map((item, index) => (
            <div key={index} className="bg-zinc-700 rounded-lg p-4">
              <h3 className="text-gray-200 font-medium mb-2">{item.question}</h3>
              <p className="text-gray-400">{item.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function FAQ() {
  return (
    <>
    <Header />
    <div className="min-h-screentext-gray-200 py-28 md:py-32 px-5 md:px-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center text-[--green-color]">FAQ</h1>
        <div className="grid gap-4">
          {faqData.map((section, index) => (
            <FAQSection key={index} section={section} />
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}