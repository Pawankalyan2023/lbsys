import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Specific = () => {
  const Navigate = useNavigate();

  const [bookname, setBookname] = useState("");
  const [author, setAuthorname] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [publishdate, setDate] = useState("");

  const handlesubmit = () => {
    if (
      bookname === "" ||
      author === "" ||
      genre === "" ||
      language === "" ||
      publishdate === ""
    ) {
      alert("Please fill all the fields");
      return;
    }

    if (
      bookname < 3 ||
      author < 3 ||
      genre < 3 ||
      language < 3 ||
      publishdate < 3
    ) {
      alert("Please enter the data correctly");
      return;
    }

    try {
      const response = axios.post(
        `${process.env.REACT_APP_BACKROOT}/api/addbook`,
        {
          bookname,
          author,
          genre,
          language,
          publishdate,
        }
      );

      if (response) {
        alert("Book Added Successfully");
        Navigate("/adminmain");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="m-10">
      <h1 className="text-center text-3xl font-semibold mt-5">Add Book</h1>
      <div class="">
        <div>
          <label
            for="book_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Book name
          </label>
          <input
            type="text"
            id="book_name"
            class="bg-gray-50 border border-gray-300 mb-5 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={bookname}
            onChange={(e) => setBookname(e.target.value)}
            placeholder="wings of fire"
            required
          />
        </div>
        <div>
          <label
            for="Author name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Author
          </label>
          <input
            type="text"
            id="author_name"
            onChange={(e) => setAuthorname(e.target.value)}
            value={author}
            class="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Doe"
            required
          />
        </div>
        <div>
          <label
            for="genre"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Genre
          </label>
          <input
            type="text"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
            value={genre}
            class="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Fiction"
            required
          />
        </div>
        <div>
          <label
            for="language"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Language
          </label>
          <input
            type="text"
            id="language"
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
            class="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="English"
            required
          />
        </div>
        <div>
          <label
            for="date"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Publish Date
          </label>
          <input
            type="date"
            id="date"
            onChange={(e) => setDate(e.target.value)}
            value={publishdate}
            class="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handlesubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Specific;
