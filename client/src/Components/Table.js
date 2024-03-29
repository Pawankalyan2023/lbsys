import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { imgbook } from "../Bookmark-PNG-File.png";
import { FaRegHeart } from "react-icons/fa";

export default function Table() {
  const navigate = useNavigate();

  const [originalBooks, setOriginalBooks] = useState([]);
  const [readstatus, setReadstatus] = useState(false);
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKROOT}?page=${currentPage}`
        );
        setOriginalBooks(response.data);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission and page refresh
    const filteredData = originalBooks.filter((item) => {
      return (
        item.bookname.toLowerCase().includes(search.toLowerCase()) ||
        item.author.toLowerCase().includes(search.toLowerCase()) ||
        item.genre.toLowerCase().includes(search.toLowerCase())
      );
    });

    setBooks(filteredData);
  };

  const handleRemoveSearch = () => {
    setSearch("");
    setBooks(originalBooks);
  };

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

  const handlereadstatus = async (readstatus, bookid) => {
    try {
      const response = await axios.post(`/api/reading/${bookid}`, {
        readstatus: true,
      });

      if (response.status === 200) {
        console.log(`Read status updated for book with ID ${bookid}`);
        // Update your frontend state as needed
      } else {
        console.error("Error updating read status:", response.data.message);
      }
    } catch (error) {
      console.error("AxiosError:", error);
    }
  };

  return (
    <div className="m-10">
      <form className="mb-10" onSubmit={handleSearch}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Bookname, Authors, or Genre"
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
          {search && (
            <button
              type="button"
              className="text-white absolute end-20 mr-10 bottom-2.5 bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              onClick={handleRemoveSearch}
            >
              Clear Search
            </button>
          )}
        </div>
      </form>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                Likes
              </th>
              <th scope="col" class="px-6 py-3">
                Language
              </th>
              <th scope="col" class="px-6 py-3">
                Published Date
              </th>
              <th scope="col" class="px-6 py-3">
                Read Status
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {book.bookname}
                </th>
                <td class="px-6 py-4">{book.author}</td>
                <td class="px-6 py-4">
                  <button>
                    <FaRegHeart className="bg-transperant hover:bg-red-500" />
                  </button>
                </td>
                <td class="px-6 py-4">{book.genre}</td>
                <td class="px-6 py-4">{book.language}</td>
                <td class="px-6 py-4">
                  {new Date(book.publishdate).toLocaleDateString()}
                </td>
                <td class="px-6 py-4">
                  {book.readstatus === true ? (
                    "Reading"
                  ) : (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() =>
                        handlereadstatus(book.readstatus, book._id)
                      }
                    >
                      Not Read
                    </button>
                  )}
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
