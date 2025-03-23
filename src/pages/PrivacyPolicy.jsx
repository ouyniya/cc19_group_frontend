import React, { useState } from "react";
import { motion } from "framer-motion";
import ScrollToTop from "../components/ScrollToTop"; // Import the ScrollToTop component

const PrivacyPolicy = () => {
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
          Privacy Policy
        </h1>

        <div className="mb-6 overflow-y-auto p-4 border border-gray-200 rounded-md bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            At <strong>Voyager</strong> ("we," "us," or "our"), we respect your
            privacy and are committed to protecting your personal data. This
            Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you visit our website [website URL] and use
            our services.
          </p>
          <p className="mb-4">
            Please read this Privacy Policy carefully. If you do not agree with
            the terms of this Privacy Policy, please do not access the site or
            use our services.
          </p>

          <h2 className="text-xl font-semibold mb-4">
            2. Information We Collect
          </h2>

          <h3 className="text-lg font-medium mb-2">2.1 Personal Data</h3>
          <p className="mb-4">
            We may collect personal identification information from you in
            various ways, including, but not limited to:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>When you register for an account</li>
            <li>When you complete a form</li>
            <li>When you use our services</li>
            <li>When you subscribe to our newsletter</li>
            <li>When you respond to a survey</li>
            <li>
              When you participate in any interactive features of our services
            </li>
          </ul>
          <p className="mb-4">
            The personal information we may collect includes:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Address</li>
            <li>Payment information</li>
            <li>Username and password</li>
            <li>Profile picture</li>
            <li>Any other information you choose to provide</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">2.2 Non-Personal Data</h3>
          <p className="mb-4">
            We may also collect non-personal identification information about
            users whenever they interact with our site. Non-personal
            identification information may include:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>Browser name</li>
            <li>Type of computer or device</li>
            <li>
              Technical information about users' means of connection to our site
            </li>
            <li>Operating system</li>
            <li>Internet service provider</li>
            <li>IP address</li>
            <li>Usage data</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">
            3. How We Use Your Information
          </h2>
          <p className="mb-4">
            We may use the information we collect from you for the following
            purposes:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>
              To allow you to participate in interactive features of our service
            </li>
            <li>To provide customer support</li>
            <li>
              To gather analysis or valuable information so that we can improve
              our service
            </li>
            <li>To monitor the usage of our service</li>
            <li>To detect, prevent and address technical issues</li>
            <li>To fulfill any other purpose for which you provide it</li>
            <li>To carry out our obligations and enforce our rights</li>
            <li>
              To provide you with news, special offers and general information
              about other goods, services and events
            </li>
            <li>For any other purpose with your consent</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">
            4. Cookies and Tracking Technologies
          </h2>
          <p className="mb-4">
            We use cookies and similar tracking technologies to track activity
            on our service and hold certain information. Cookies are files with
            a small amount of data which may include an anonymous unique
            identifier.
          </p>
          <p className="mb-4">
            You can instruct your browser to refuse all cookies or to indicate
            when a cookie is being sent. However, if you do not accept cookies,
            you may not be able to use some portions of our service.
          </p>
          <p className="mb-4">Examples of cookies we use:</p>
          <ul className="list-disc pl-8 mb-4">
            <li>
              <strong>Session Cookies:</strong> We use Session Cookies to
              operate our service.
            </li>
            <li>
              <strong>Preference Cookies:</strong> We use Preference Cookies to
              remember your preferences and various settings.
            </li>
            <li>
              <strong>Security Cookies:</strong> We use Security Cookies for
              security purposes.
            </li>
            <li>
              <strong>Advertising Cookies:</strong> Advertising Cookies are used
              to serve you with advertisements that may be relevant to you and
              your interests.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">
            5. Data Sharing and Disclosure
          </h2>
          <p className="mb-4">
            We may share your personal information in the following situations:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>
              <strong>With Service Providers:</strong> We may share your
              information with service providers we use to support our business
              operations.
            </li>
            <li>
              <strong>For Business Transfers:</strong> We may share or transfer
              your information in connection with, or during negotiations of,
              any merger, sale of company assets, financing, or acquisition of
              all or a portion of our business.
            </li>
            <li>
              <strong>With Affiliates:</strong> We may share your information
              with our affiliates, in which case we will require those
              affiliates to honor this Privacy Policy.
            </li>
            <li>
              <strong>With Business Partners:</strong> We may share your
              information with our business partners to offer you certain
              products, services or promotions.
            </li>
            <li>
              <strong>With Your Consent:</strong> We may disclose your personal
              information for any other purpose with your consent.
            </li>
            <li>
              <strong>With Law Enforcement:</strong> Under certain
              circumstances, we may be required to disclose your personal
              information if required to do so by law or in response to valid
              requests by public authorities.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">6. Data Security</h2>
          <p className="mb-4">
            The security of your data is important to us, but remember that no
            method of transmission over the Internet, or method of electronic
            storage is 100% secure. While we strive to use commercially
            acceptable means to protect your personal information, we cannot
            guarantee its absolute security.
          </p>

          <h2 className="text-xl font-semibold mb-4">
            7. Your Data Protection Rights
          </h2>
          <p className="mb-4">
            Depending on your location, you may have certain rights regarding
            your personal information, such as:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>
              <strong>Right to Access:</strong> You have the right to request
              copies of your personal information.
            </li>
            <li>
              <strong>Right to Rectification:</strong> You have the right to
              request that we correct any information you believe is inaccurate
              or complete information you believe is incomplete.
            </li>
            <li>
              <strong>Right to Erasure:</strong> You have the right to request
              that we erase your personal information, under certain conditions.
            </li>
            <li>
              <strong>Right to Restrict Processing:</strong> You have the right
              to request that we restrict the processing of your personal
              information, under certain conditions.
            </li>
            <li>
              <strong>Right to Object to Processing:</strong> You have the right
              to object to our processing of your personal information, under
              certain conditions.
            </li>
            <li>
              <strong>Right to Data Portability:</strong> You have the right to
              request that we transfer the data we have collected to another
              organization, or directly to you, under certain conditions.
            </li>
          </ul>
          <p className="mb-4">
            If you wish to exercise any of these rights, please contact us using
            the contact information provided below.
          </p>

          <h2 className="text-xl font-semibold mb-4">8. Children's Privacy</h2>
          <p className="mb-4">
            Our service does not address anyone under the age of 13. We do not
            knowingly collect personally identifiable information from anyone
            under the age of 13. If you are a parent or guardian and you are
            aware that your child has provided us with personal data, please
            contact us. If we become aware that we have collected personal data
            from children without verification of parental consent, we take
            steps to remove that information from our servers.
          </p>

          <h2 className="text-xl font-semibold mb-4">
            9. Changes to This Privacy Policy
          </h2>
          <p className="mb-4">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last Updated" date at the top of this Privacy
            Policy.
          </p>
          <p className="mb-4">
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </p>

          <h2 className="text-xl font-semibold mb-4">10. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact
            us by email: <strong> privacy@voyager.com </strong>
          </p>
        </div>
        <p className="mb-4 text-right">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </motion.div>
    </>
  );
};

export default PrivacyPolicy;
