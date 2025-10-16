import React from "react";
import { motion } from "framer-motion";
import slustore from "../assets/rollingball.png";

const Card6 = () => {
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
            <a href="https://rolling-ball-three-js-chintak-joshis-projects.vercel.app/">
                <img
                    className="rounded-t-lg w-full"
                    src={slustore}
                    alt=""
                />
            </a>
            <div className="p-5">
                <a href="https://github.com/chintakjoshi/rolling-ball-three.js">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Garbage collector ball in space
                    </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    This is a 3D interactive game built with Three.js, where players control a sphere navigating through a galactic environment.
                    The objective is to collect space debris, promoting a clean and sustainable virtual universe.
                </p>
                <div className="flex space-x-4">
                    <a
                        href="https://rolling-ball-three-js-chintak-joshis-projects.vercel.app/"
                        className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                        Play Live
                    </a>
                    <a
                        href="https://github.com/chintakjoshi/rolling-ball-three.js"
                        className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                        Github
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default Card6;