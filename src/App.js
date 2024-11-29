import { useEffect, useState } from "react";
import "./App.css";
import employeeData from "./EmployeeData";

function App() {
  const [data, setData] = useState([]);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(employeeData);
  }, []);

  const handleUpdate = () => {
    const index = data
      .map((item) => {
        return item.id;
      })
      .indexOf(id);

    const dt = [...data];
    dt[index].firstName = firstName;
    dt[index].lastName = lastName;

    setData(dt);
    handleClear();
  };

  const handleSave = (e) => {
    console.log(e);
    const dt = [...data];
    const newObj = {
      id: employeeData.length + 1,
      firstName: firstName,
      lastName: lastName,
    };
    dt.push(newObj);
    setData(dt);
  };

  const handleClear = () => {
    setfirstName("");
    setlastName("");
    setId(0);
    setIsUpdate(false);
  };

  const handleEdit = (id) => {
    const dt = data.filter((item) => item.id === id);
    if (dt !== undefined) {
      setIsUpdate(true);
      setfirstName(dt[0].firstName);
      setlastName(dt[0].lastName);
      setId(id);
    }
  };

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure to delete this Employee?")) {
      }
      console.log(data);
      const dt = data.filter((item) => item.id !== id);
      setData(dt);
    }
  };

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <div>
          <label>
            First Name:
            <input
              type="text"
              placeholder="Enter First Name"
              onChange={(e) => setfirstName(e.target.value)}
              value={firstName}
            />
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input
              type="text"
              placeholder="Enter Last Name"
              onChange={(e) => setlastName(e.target.value)}
              value={lastName}
            />
          </label>
        </div>
        <div>
          {!isUpdate ? (
            <button className="btn btn-primary" onClick={(e) => handleSave(e)}>
              Save
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => handleUpdate()}>
              Update
            </button>
          )}

          <button className="btn btn-danger" onClick={() => handleClear()}>
            Clear
          </button>
        </div>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <td>Sr.no</td>
            <td>Id</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td> Attendance</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>
                  <input type="checkbox" name="" id="" />
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
