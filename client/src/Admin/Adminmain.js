import { useNavigate } from "react-router-dom";
import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Button } from "flowbite-react";

export default function Adminmain() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handledelete = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKROOT}/api/deletebook/${id}`
      );

      if (response.status === 200) {
        alert("Book Deleted Successfully");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKROOT}?page=${currentPage}`
        );
        console.log(response);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = 10;
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <h1 className="text-center text-3xl mt-10 text-bold ">
        Welcome to Admin Dashboard
      </h1>
      <div className="flex justify-evenly my-10 flex-row">
        <button
          onClick={() => navigate("/specific")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Book
        </button>
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-10">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Book name
              </th>
              <th scope="col" class="px-6 py-3">
                Author
              </th>
              <th scope="col" class="px-6 py-3">
                Genre
              </th>
              <th scope="col" class="px-6 py-3">
                Language
              </th>
              <th scope="col" class="px-6 py-3">
                PublishDate
              </th>
              <th scope="col" class="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, i) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {book.bookname}
                </th>
                <td class="px-6 py-4">{book.author}</td>
                <td class="px-6 py-4">{book.genre}</td>
                <td class="px-6 py-4">{book.language}</td>
                <td class="px-6 py-4">
                  {new Date(book.publishdate).toLocaleDateString()}
                </td>
                <td class="px-6 py-4">
                  <button
                    className="text-red-500 hover:underline "
                    onClick={() => handledelete(book.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav
          class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
          aria-label="Table navigation"
        >
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing{" "}
            <span class="font-semibold text-gray-900 dark:text-white">
              1-10
            </span>{" "}
            of{" "}
            <span class="font-semibold text-gray-900 dark:text-white">
              {books.length}
            </span>
          </span>
          <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <Button
                onClick={handlePreviousPage}
                class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </Button>
            </li>
            <li>
              <Button
                onClick={handleNextPage}
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
