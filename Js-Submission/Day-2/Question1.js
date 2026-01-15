//Q1: Object Array to Nested Structure (12 mins)
//Transform flat employee data into a hierarchical department structure with salary statistics.

const employees = [
  { id: 1, name: "John", dept: "Engineering", salary: 80000 },
  { id: 2, name: "Jane", dept: "Engineering", salary: 95000 },
  { id: 3, name: "Bob", dept: "Marketing", salary: 65000 },
  { id: 4, name: "Alice", dept: "Engineering", salary: 88000 },
  { id: 5, name: "Charlie", dept: "Marketing", salary: 72000 },
  { id: 6, name: "Diana", dept: "HR", salary: 70000 },
];

function transformEmployees(employees) {
  const result = {};

  for (let emp of employees) {
    if (!result[emp.dept]) {
      result[emp.dept] = {
        employees: [],
        totalSalary: 0,
        totalCount: 0,
      };
    }

    result[emp.dept].employees.push(emp.name);
    result[emp.dept].totalCount++;
    result[emp.dept].totalSalary += emp.salary;
  }

  for (let dept in result) {
    result[dept].avgSalary = Number(
      (result[dept].totalSalary / result[dept].totalCount).toFixed(2)
    );
    delete result[dept].totalSalary;
  }

  return result;
}

console.log(transformEmployees(employees));
