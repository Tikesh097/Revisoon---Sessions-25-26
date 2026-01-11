import { useState, useMemo } from "react";

const data = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ["Admin", "User", "Guest"][i % 3],
}));

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Reset page when page size changes
  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [currentPage, pageSize]);

  // Pagination range logic (show 5 pages)
  const getPageNumbers = () => {
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>User List</h2>

      {/* Page Size */}
      <label>
        Page Size:
        <select value={pageSize} onChange={handlePageSizeChange}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </label>

      {/* Table */}
      <table border="1" cellPadding="8" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Info */}
      <p>
        Showing {startItem}-{endItem} of {totalItems} results
      </p>

      {/* Pagination Controls */}
      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
          First
        </button>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Previous
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            style={{
              fontWeight: page === currentPage ? "bold" : "normal",
            }}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(totalPages)}
        >
          Last
        </button>
      </div>
    </div>
  );
}
