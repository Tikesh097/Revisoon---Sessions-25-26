// Q2: Multi-level Filtering (10 mins)

const users = [
  {
    id: 1,
    name: "Alice",
    courses: [
      { title: "React", rating: 4.5, completed: true },
      { title: "Node", rating: 3.8, completed: true },
      { title: "CSS", rating: 4.2, completed: true },
    ],
  },
  {
    id: 2,
    name: "Bob",
    courses: [
      { title: "React", rating: 4.7, completed: true },
      { title: "Vue", rating: 4.3, completed: false },
    ],
  },
  {
    id: 3,
    name: "Charlie",
    courses: [
      { title: "Angular", rating: 4.6, completed: true },
      { title: "React", rating: 4.8, completed: true },
      { title: "Node", rating: 4.1, completed: true },
    ],
  },
];

const result = users
  .filter(user => {
    const goodCourses = user.courses.filter(
      course => course.completed && course.rating > 4
    );
    return goodCourses.length >= 2;
  })
  .map(user => ({
    id: user.id,
    name: user.name
  }));

console.log(result);
