import { useState } from "react";

const employeesData = [
  { id: 1, name: 'Alice Johnson', department: 'Engineering', salary: 95000, joinDate: '2020-03-15' },
  { id: 2, name: 'Bob Smith', department: 'Marketing', salary: 75000, joinDate: '2021-07-22' },
  { id: 3, name: 'Carol White', department: 'Engineering', salary: 105000, joinDate: '2019-01-10' },
  { id: 4, name: 'David Brown', department: 'Sales', salary: 68000, joinDate: '2022-05-30' },
  { id: 5, name: 'Eve Davis', department: 'HR', salary: 72000, joinDate: '2020-11-12' },
  { id: 6, name: 'Frank Moore', department: 'Sales', salary: 82000, joinDate: '2018-09-18' },
  { id: 7, name: 'Grace Lee', department: 'Engineering', salary: 98000, joinDate: '2021-02-05' },
  { id: 8, name: 'Henry Wilson', department: 'Marketing', salary: 70000, joinDate: '2019-06-25' },
  { id: 9, name: 'Ivy Clark', department: 'HR', salary: 76000, joinDate: '2022-01-14' },
  { id: 10, name: 'Jack Miller', department: 'Engineering', salary: 110000, joinDate: '2017-12-01' }
];


export default function EmployeeTable() {
  const [data] = useState(employeesData); // original data (never mutated)
  const [sortedData, setSortedData] = useState(employeesData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const handleSort = (key) => {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      // Third click → remove sort
      setSortConfig({ key: null, direction: null });
      setSortedData(data);
      return;
    }

    const sorted = [...data].sort((a, b) => {
      let valueA = a[key];
      let valueB = b[key];

      if (key === "joinDate") {
        valueA = new Date(valueA);
        valueB = new Date(valueB);
      }

      if (typeof valueA === "number") {
        return direction === "asc" ? valueA - valueB : valueB - valueA;
      }

      return direction === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });

    setSortConfig({ key, direction });
    setSortedData(sorted);
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "asc" ? " ↑" : " ↓";
  };

  return (
    <table border="1" cellPadding="8" style={{ width: "100%" }}>
      <thead>
        <tr>
          <th onClick={() => handleSort("name")}>
            Name{getSortIndicator("name")}
          </th>
          <th onClick={() => handleSort("department")}>
            Department{getSortIndicator("department")}
          </th>
          <th onClick={() => handleSort("salary")}>
            Salary{getSortIndicator("salary")}
          </th>
          <th onClick={() => handleSort("joinDate")}>
            Join Date{getSortIndicator("joinDate")}
          </th>
        </tr>
      </thead>

      <tbody>
        {sortedData.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.name}</td>
            <td>{emp.department}</td>
            <td>${emp.salary.toLocaleString()}</td>
            <td>{emp.joinDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
