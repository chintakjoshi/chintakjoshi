import React from "react";
import { motion } from "framer-motion";
import qr from "../assets/qr.jpg";

const Card4 = () => {
  return (
    <motion.div
      initial={"hidden"}
      whileInView={"visible"}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
      className="max-w-xl bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700 my-8">
      <a href="https://github.com/chintakjoshi/QR-project">
        <img
          className="rounded-t-lg w-full"
          src={qr}
          alt=""
        />
      </a>
      <div className="p-5">
        <a href="https://github.com/chintakjoshi/QR-project">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          E-verification of documents
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        In this project, The user can validate his/her documents with the system dataset, if only the system has their information, The unique number of hex code will be generated with the qr code as a E-doc, so that whenever they need to prove their identity he/she can share this qr code for validation.
        </p>
        <a
          href="https://github.com/chintakjoshi/QR-project"
          className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Github
        </a>
      </div>
    </motion.div>
  );
};

export default Card4;