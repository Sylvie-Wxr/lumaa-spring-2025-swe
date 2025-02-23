import {Button, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/tasks.css';

function Tasks() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the auth token
        navigate('/'); // Navigate to login page
    };

    return (
        // Header section
        <div className="tasks-container">
            <Button 
                variant="text" 
                onClick={handleLogout}
                className="logout-button"
            >
                Log out
            </Button>

            <Typography variant="h1" className="tasks-title">
                Task Management App
            </Typography>
            
            <Button 
                variant="contained" 
                onClick={() => {}} 
                className="add-task-button"
            >
                Add New Task
            </Button>

            <Typography variant="h2" className="task-list-title">
                Task list
            </Typography>
        </div>
    )
}

export default Tasks;