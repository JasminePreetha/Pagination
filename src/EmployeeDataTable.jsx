import React, { useState, useEffect } from 'react';
import "./EmployeeDataTable.css";

const EmployeeDataTable = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        alert('Failed to fetch data');
      }
    };
    fetchData();
  }, []);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);
// pagination prev and next page
const pagination=(pageNumber) => setCurrentPage(pageNumber);

const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(employees.length / employeesPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
    <div className="header">
    <h2>Employee Data Table</h2>
    </div>


      <div>
      <table className="employee-data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role }</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>



      <div className="pagination">
        <button onClick={handlePreviousPage} >
            {/* disabled={currentPage === 1} */}
          Previous
        </button>
        <button>{currentPage}</button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(employees.length / employeesPerPage)}
        >
          Next
        </button>
      </div>
    </div>

  );
}
export default EmployeeDataTable;