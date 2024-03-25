import React, {useState, useEffect} from 'react';
import axios from 'axios';


function Admin(){
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ userName: '', password: '' });
    const [editableData, setEditableData] = useState({});
    const [isEditable, setIsEditable] = useState({});
  
    useEffect(() => {
      GetUsers();
    }, []);
  
    const GetUsers = () => {
      axios.get('https://localhost:7097/api/Users/Get')
        .then((response) => {
          console.log(response.data);
          setUsers(response.data);
        })
        .catch((error) => {
          console.log("error");
        });
    };

    const handleRoleChange = (updatedUser) => {
        // Update the user in the frontend
        const updatedUsers = users.map(user => {
            if (user.userId === updatedUser.userId) {
                return updatedUser;
            }
            return user;
        });
        setUsers(updatedUsers);
    
        // Send a PUT request to update the user in the backend
        console.log(updatedUser);
        axios.put(`https://localhost:7097/api/Users/Update`, updatedUser)
            .then((response) => {
                console.log("User updated successfully:", response.data);
            })
            .catch((error) => {
                console.log("Error updating user:", error);
            });
    };
    return(
        <div>
            <h2>User List</h2>
            <div className="table-container">
                <table className='event-table'>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Password</th>
                            <th>Role</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.userName}</td>
                                <td>{user.password}</td>
                                <td>
                                <select
                                    value={user.role}
                                    onChange={(e) => {
                                        const updatedUser = { ...user, role:parseInt(e.target.value) };
                                        handleRoleChange(updatedUser);
                                    }}>
                                    <option value={0}>Regular</option>
                                    <option value={1}>Organizer</option>
                                    <option value={2}>Admin</option>
                                </select>
                            </td>
                                <td>{user.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Admin;