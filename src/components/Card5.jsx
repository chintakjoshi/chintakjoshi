import React from "react";
import { motion } from "framer-motion";
import slustore from "../assets/authapp.png";

const Card5 = () => {
    return (
        <motion.div
            initial={"hidden"}
            whileInView={"visible"}
            variants={{
                visible: { opacity: 1 },
                hidden: { opacity: 0 },
            }}
            class="max-w-xl bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700 my-8">
            <a href="https://github.com/chintakjoshi/authapp">
                <img
                    class="rounded-t-lg w-full"
                    src={slustore}
                    alt=""
                />
            </a>
            <div class="p-5">
                <a href="https://github.com/chintakjoshi/authapp">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Token based Authentication App
                    </h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    An authentication app that currently supports token-based authentication and email verification by OTP.
                    This application utilizes Spring Boot for the backend, React for the frontend, and PostgreSQL for the Data Store.
                </p>
                <a
                    href="https://github.com/chintakjoshi/authapp"
                    class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                    Github
                </a>
            </div>
        </motion.div>
    );
};

export default Card5;