import React from "react";
import { motion } from "framer-motion";
import twa from "../assets/twa.jpg";

const Card3 = () => {
  return (
    <motion.div
      initial={"hidden"}
      whileInView={"visible"}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
      class="max-w-xl bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700 my-8">
      <a href="https://github.com/chintakjoshi/TWA-OSS">
        <img
          class="rounded-t-lg w-full"
          src={twa}
          alt=""
        />
      </a>
      <div class="p-5">
        <a href="https://github.com/chintakjoshi/TWA-OSS">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Transformative workforce Academy
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        This project is to help the justice involved jobseekers and the second chance employees. This web application is for hiring justice-involved talent promotes self-sufficiency for individuals, success for companies, growth for our economy, and public safety for our region.
        </p>
        <a
          href="https://github.com/chintakjoshi/TWA-OSS"
          class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Github
        </a>
      </div>
    </motion.div>
  );
};

export default Card3;