import { useEffect, useState } from 'react'

import Validation from './utils/validation';

import Header from './components/Header';
import Main from './components/main/Main';


function App() {

  const initialFormData = {
    E_name: '',
    E_mail: '',
    E_contact: '',
    E_role: ''
  }

  const Employees = [
    {
      _id: 1754851200123,
      E_name: "Rahul Sharma",
      E_mail: "rahul.sharma@example.com",
      E_contact: "9876543210",
      E_role: "admin"
    },
    {
      _id: 1754851200456,
      E_name: "Priya Patel",
      E_mail: "priya.patel@example.com",
      E_contact: "9123456780",
      E_role: "manager"
    },
    {
      _id: 1754851200789,
      E_name: "Arjun Mehta",
      E_mail: "arjun.mehta@example.com",
      E_contact: "9988776655",
      E_role: "developer"
    },
    {
      _id: 1754851201234,
      E_name: "Sneha Verma",
      E_mail: "sneha.verma@example.com",
      E_contact: "9012345678",
      E_role: "designer"
    },
    {
      _id: 1754851201567,
      E_name: "Vikram Joshi",
      E_mail: "vikram.joshi@example.com",
      E_contact: "9090909090",
      E_role: "sales"
    },
    {
      _id: 1754851201890,
      E_name: "Ananya Singh",
      E_mail: "ananya.singh@example.com",
      E_contact: "9876501234",
      E_role: "marketing"
    },
    {
      _id: 1754851202123,
      E_name: "Rohan Kapoor",
      E_mail: "rohan.kapoor@example.com",
      E_contact: "9765432109",
      E_role: "support"
    },
    {
      _id: 1754851202456,
      E_name: "Neha Gupta",
      E_mail: "neha.gupta@example.com",
      E_contact: "9654321087",
      E_role: "accountant"
    },
    {
      _id: 1754851202789,
      E_name: "Karan Malhotra",
      E_mail: "karan.malhotra@example.com",
      E_contact: "9543210876",
      E_role: "hr"
    },
    {
      _id: 1754851203012,
      E_name: "Ishita Rao",
      E_mail: "ishita.rao@example.com",
      E_contact: "9432109876",
      E_role: "intern"
    },
    {
      _id: 1754851203345,
      E_name: "Aditya Nair",
      E_mail: "aditya.nair@example.com",
      E_contact: "9321098765",
      E_role: "employee"
    },
    {
      _id: 1754851203678,
      E_name: "Meera Iyer",
      E_mail: "meera.iyer@example.com",
      E_contact: "9210987654",
      E_role: "other"
    },
    {
      _id: 1754851203901,
      E_name: "Siddharth Kumar",
      E_mail: "siddharth.kumar@example.com",
      E_contact: "9109876543",
      E_role: "developer"
    },
    {
      _id: 1754851204234,
      E_name: "Pooja Desai",
      E_mail: "pooja.desai@example.com",
      E_contact: "9898989898",
      E_role: "manager"
    },
    {
      _id: 1754851204567,
      E_name: "Manish Agarwal",
      E_mail: "manish.agarwal@example.com",
      E_contact: "9787878787",
      E_role: "sales"
    }
  ];

  // Load Data from LocalStorage 
  const LDL = () => {
    if (typeof window === "undefined") return Employees;
    try {
      const storage = localStorage.getItem("Employees");

      if (!storage) {
        localStorage.setItem("Employees", JSON.stringify(Employees));
        return Employees;
      }

      const parsed = JSON.parse(storage);

      return Array.isArray(parsed) ? parsed : Employees;

    } catch (e) {
      console.error("Failed to pasrse", e)
      return Employees;
    }
  }



  const [inputState, setInputState] = useState(initialFormData);
  const [employees, setEmployees] = useState(LDL);

  // editing 
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState('');

  // search - filter
  const [search, setSearch] = useState('');
  const [searchedData, setSearchedData] = useState(employees);
  const [sortType, setSortType] = useState("A-Z");

  // pegination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputState((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = Validation(inputState);

    console.log(isValid);


    if (!isValid) {
      return;
    }

    const employee = {
      _id: isEditing ? editID : Date.now(),
      E_name: inputState.E_name,
      E_mail: inputState.E_mail,
      E_contact: inputState.E_contact,
      E_role: inputState.E_role
    }

    if (isEditing) {

      let result = employees.map((item) => {
        return item._id == editID ? employee : item;
      });

      setEmployees(result);
      setIsEditing(false);

      alert("Data has been updated !");
    } else {
      setEmployees([...employees, employee]);
    }


    setInputState(initialFormData);
  }

  const handleEdit = (ID) => {

    let result = employees.find((item) => item._id == ID)

    setInputState(result);

    setIsEditing(true);
    setEditID(ID);

  }

  const handleDelete = (ID) => {

    let ans = confirm("Are you sure about deleting this data");

    console.log("Delete", ans);

    if (ans) {
      const result = employees.filter((employee) => {
        return employee._id !== ID;
      });

      setEmployees(result);
    } else {
      return
    }


  }

  const Search = () => {

    let searchText = search.trim().toLowerCase();

    let result = employees.filter((item) => {
      const employeeData = `${item._id}${item.E_name}${item.E_mail}${item.E_contact}${item.E_role}`.toLowerCase();
      return employeeData.includes(searchText);
    })

    setSearchedData(result);
  }

  const handleSort = (e) => {
    setSortType(e.target.value);
  }

  const dataSort = searchedData.sort((a, b) => {
    return sortType === "A-Z"
      ? a.E_name.localeCompare(b.E_name)
      : b.E_name.localeCompare(a.E_name);
  });

  const totalPages = Math.ceil(searchedData.length / itemsPerPage);
  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;

  const currentEmployees = dataSort.slice(firstItem, lastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  useEffect(() => {
    Search();
  }, [search, employees]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search])

  useEffect(() => {
    localStorage.setItem("Employees", JSON.stringify(employees));
  }, [employees])





  console.log("data sort", dataSort);
  return (
    <>
      <Header />
      <Main
        inputState={inputState}
        search={search}
        handleSearch={handleSearch}
        isEditing={isEditing}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        employees={currentEmployees}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        sortType={sortType}
        handleSort={handleSort}
      />

    </>
  )
}

export default App
