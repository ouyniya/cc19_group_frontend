import React, { useState } from "react";
import { motion } from "framer-motion";
import ScrollToTop from "../components/ScrollToTop"; // Import the ScrollToTop component

const TermsAndConditions = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <ScrollToTop />
      <motion.div
        className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Terms and Conditions
        </h1>

        <div className="mb-6 overflow-y-auto p-4 border border-gray-200 rounded-md bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to our service. These Terms and Conditions govern your use
            of our website and services operated by <strong>Voyager</strong>{" "}
            ("we," "us," or "our"). By accessing or using our service, you agree
            to be bound by these Terms. If you disagree with any part of the
            terms, you may not access the service.
          </p>

          <h2 className="text-xl font-semibold mb-4">2. Definitions</h2>
          <p className="mb-4">
            <strong>"Account"</strong> means a unique account created for you to
            access our Service or parts of our Service.
            <br />
            <strong>"Service"</strong> refers to the website, application, and
            any related services provided by us.
            <br />
            <strong>"User Content"</strong> means any content that users submit,
            post, or display on the Service.
          </p>

          <h2 className="text-xl font-semibold mb-4">
            3. Account Registration
          </h2>
          <p className="mb-4">
            To use certain features of the Service, you must register for an
            account. You must provide accurate, current, and complete
            information during the registration process and keep your account
            information up-to-date. You are responsible for safeguarding the
            password that you use to access the Service and for any activities
            or actions under your password.
          </p>

          <h2 className="text-xl font-semibold mb-4">4. User Content</h2>
          <p className="mb-4">
            Our Service allows you to post, link, store, share and otherwise
            make available certain information, text, graphics, videos, or other
            material. You are responsible for the User Content that you post to
            the Service, including its legality, reliability, and
            appropriateness. By posting User Content, you grant us the right and
            license to use, modify, perform, display, reproduce, and distribute
            such content on and through the Service.
          </p>

          <h2 className="text-xl font-semibold mb-4">
            5. Intellectual Property
          </h2>
          <p className="mb-4">
            The Service and its original content (excluding User Content),
            features, and functionality are and will remain the exclusive
            property of <strong>Voyager</strong> and its licensors. The Service
            is protected by copyright, trademark, and other laws. Our trademarks
            and trade dress may not be used in connection with any product or
            service without the prior written consent of{" "}
            <strong>Voyager</strong> .
          </p>

          <h2 className="text-xl font-semibold mb-4">6. Prohibited Uses</h2>
          <p className="mb-4">
            You may use the Service only for lawful purposes and in accordance
            with these Terms. You agree not to:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>
              Use the Service in any way that violates any applicable national
              or international law or regulation.
            </li>
            <li>
              Use the Service to transmit or upload any material which is
              defamatory, offensive, or otherwise objectionable.
            </li>
            <li>
              Engage in any conduct that restricts or inhibits anyone's use or
              enjoyment of the Service.
            </li>
            <li>
              Attempt to gain unauthorized access to any portion of the Service
              or any other systems or networks.
            </li>
            <li>
              Use the Service to harvest or collect email addresses or other
              contact information.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">
            7. Limitation of Liability
          </h2>
          <p className="mb-4">
            In no event shall <strong>Voyager</strong> , nor its directors,
            employees, partners, agents, suppliers, or affiliates, be liable for
            any indirect, incidental, special, consequential or punitive
            damages, including without limitation, loss of profits, data, use,
            goodwill, or other intangible losses, resulting from your access to
            or use of or inability to access or use the Service.
          </p>

          <h2 className="text-xl font-semibold mb-4">8. Termination</h2>
          <p className="mb-4">
            We may terminate or suspend your account immediately, without prior
            notice or liability, for any reason whatsoever, including without
            limitation if you breach the Terms. Upon termination, your right to
            use the Service will immediately cease.
          </p>

          <h2 className="text-xl font-semibold mb-4">9. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. We will provide notice of any changes by
            posting the new Terms on this page. You are advised to review these
            Terms periodically for any changes.
          </p>

          <h2 className="text-xl font-semibold mb-4">10. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us at{" "}
            <strong>support@voyager.com</strong> .
          </p>
        </div>
        <p className="my-4 text-right">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </motion.div>
    </>
  );
};

export default TermsAndConditions;
