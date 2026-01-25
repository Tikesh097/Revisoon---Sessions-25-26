/*
### Q1: Multi-level Sorting (12 mins)
Sort array of objects by multiple criteria: first by department (ascending), then by salary (descending), then by name (ascending).
*/

const employees = [
  { name: "John", dept: "Engineering", salary: 80000 },
  { name: "Alice", dept: "Engineering", salary: 95000 },
  { name: "Bob", dept: "Marketing", salary: 95000 },
  { name: "Charlie", dept: "Engineering", salary: 95000 },
  { name: "Diana", dept: "Marketing", salary: 95000 },
  { name: "Eve", dept: "HR", salary: 70000 },
];

function multiLevelSort(empArray) {
  empArray.sort((a, b) => {
    //Department Ascending
    if (a.dept !== b.dept) {
      return a.dept.localeCompare(b.dept);
    }
    //Salary Descending
    if (a.salary !== b.salary) {
      return b.salary - a.salary;
    }
    //Name Ascending
    return a.name.localeCompare(b.name);
  });
  return empArray;
}
const sortedEmployees = multiLevelSort(employees);

console.log("Sorted Employees:");
console.log(sortedEmployees);
