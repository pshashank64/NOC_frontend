import "./allStudents.css"
import hodService from "../../../services/HodService";
import { useEffect, useState } from "react";

function AllStudents(){
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setIsLoading(true);
                const data = await hodService.viewAllStudents();
                // console.log(data.data);
                setStudents(data.data);
                // console.log(students);
            } catch (error) {
                console.error('Error fetching students data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStudents();
    }, []);

    return (
        <div className="all-students">
            {isLoading ? (
                <div className="loader"></div>
                // <h2>Loading students data...</h2>
            ) : (
                <table className="table table-dark table-striped table-bordered table-hover" style={{minWidth: "50vw", maxWidth: "55vw", marginTop: "10vh"}}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Roll Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student._id}>
                                <td>{index + 1}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.roll}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default AllStudents;