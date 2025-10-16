import React from "react";
import { motion } from "framer-motion";
import ispraak from "../assets/ispraak.jpg";

const Card1 = () => {
  return (
    <motion.div
      initial={"hidden"}
      whileInView={"visible"}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
      className="max-w-xl bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700 my-8"
    >
      <a href="https://ispraak.net">
        <img
          className="rounded-t-lg w-full"
          src={ispraak}
          alt=""
        />
      </a>
      <div className="p-5">
        <a href="https://github.com/dnickol1/ispraak_open/">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Speech Automation Tool
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          iSpraak was made to automate speech evaluation of language learners and to provide them with instantaneous corrective feedback.
        </p>
        <div className="flex space-x-4">
          <a
            href="https://ispraak.net"
            className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Live
          </a>
          <a
            href="https://dev.ispraak.net/eit/landing.php"
            className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Live Multi-auto EIT
          </a>
          <a
            href="https://github.com/dnickol1/ispraak_open/"
            className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Github
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Card1;