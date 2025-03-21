import React, { useCallback, useEffect, useState } from 'react'
import { motion } from "framer-motion";
import MapCanvas from "../components/MapCanvas";
import useLocationStores from '../stores/useLocationStores';
import { createAlert } from '../utils/createAlert';
import usePostStores from '../stores/usePostStores';

function EditPostComponent({ id }) {


    const actionGetEachPost = usePostStores((state) => state.actionGetEachPost)
    const actionUpdatePost = usePostStores((state) => state.actionUpdatePost)
    const curentPost = usePostStores((state) => state.curentPost)

    /* state เก็บ input */
    const [input, setInput] = useState({
        title: curentPost.title,
        content: curentPost.content,
        budget: curentPost.budget,
    })

    useEffect(() => {
        actionGetEachPost(id)
    }, []);
    useEffect(() => {
        setInput({
            title: curentPost.title,
            content: curentPost.content,
            budget: curentPost.budget,
        });
    }, [curentPost]);

    const hdlAddPost = async (e) => {
        e.preventDefault();
        try {
            if (
                input.title.trim() === curentPost.title.trim() &&
                input.content.trim() === curentPost.content.trim() &&
                input.budget === curentPost.budget
                
            ) {
                return createAlert("info", "Nothing changed.");
            }
            await actionUpdatePost(input, id)
            createAlert("success", "Edit successfully!");
        } catch (error) {
            const errMsg = error.errors.reduce((acc, cur) => {
                acc[cur.path] = cur.message;
                return acc;
            });
            createAlert("info", errMsg.message);
            setInputError(errMsg);
        }
    };

    return (
        <div className='min-h-screen flex flex-col items-center px-5 py-5 gap-2'>
            <div className="flex flex-col items-center rounded-4xl mt-10 h-350 w-[1200px] bg-blue-50">
                {/* Head */}
                <motion.p
                    className="text-[#086BAF] font-bold text-3xl mt-5"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Edit your Post
                </motion.p>
                <div className="divider mt-4 mb-0"></div>
                {/* Div Main */}
                <div className="flex flex-col gap-2 items-center">
                    {/* Div Form */}
                    <motion.div
                        className="flex flex-col gap-2 items-center w-[1000px] px-10 py-10 "
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Form */}
                        <motion.form
                            onSubmit={hdlAddPost}
                            className="flex flex-col w-[900px] gap-5"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className="font-bold text-lg text-[#086BAF] mt-2 -mb-3">
                                Title
                            </p>
                            <motion.input
                                type="text"
                                className="bg-white rounded-xs h-10 w-full border-1 border-[#9BA2A5] p-2"
                                placeholder="   Please fill your title"
                                value={input.title}
                                onChange={(e) => {
                                    setInput({ ...input, title: e.target.value });
                                    //     setInputError(initialInputError);
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                            <p className="font-bold text-lg text-[#086BAF] mt-2 -mb-3">
                                Content
                            </p>

                            <motion.textarea
                                className="bg-white rounded-xs h-30 w-full border-1 border-[#9BA2A5] p-2"
                                placeholder="Content"
                                value={input.content}
                                onChange={(e) => {
                                    setInput({ ...input, content: e.target.value });
                                    //     setInputError(initialInputError);
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                            <p className="font-bold text-lg text-[#086BAF] mt-2 -mb-3">
                                Budget
                            </p>

                            <motion.input
                                type="number"
                                className="bg-white rounded-xs h-10 w-full border-1 border-[#9BA2A5] p-2"
                                placeholder="Budget"
                                value={input.budget}
                                onChange={(e) => {
                                    setInput({ ...input, budget: e.target.value });
                                    //     setInputError(initialInputError);
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            />

                            {/* div button Cornfirm */}
                            <div className='flex justify-center w-full '>
                                <motion.button
                                    onClick={hdlAddPost}
                                    // disabled={!isSafe}
                                    type="submit"
                                    className='mt-4 p-3 rounded-xl text-white font-bold bg-[#086BAF] w-30'
                                    // className={`mt-4 p-3 rounded-xl text-white font-bold ${isSafe || !file
                                    //     ? "bg-[#086BAF]"
                                    //     : "bg-red-500 cursor-not-allowed"
                                    //     }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Cornfirm
                                    {/* {isSafe || !file ? "Create Post" : "NSFW Content Detected!"} */}
                                </motion.button>

                            </div>


                        </motion.form>

                    </motion.div>
                </div>


            </div>


        </div >
    )
}

export default EditPostComponent