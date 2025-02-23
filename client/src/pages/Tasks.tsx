import {Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
    Checkbox, TablePagination, Dialog, TextField} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/tasks.css';

interface Task {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
}

function Tasks() {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [tasks, setTasks] = useState<Task[]>([]);

    // Fetch tasks from backend
    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:5120/tasks', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (response.ok) {
                    setTasks(await response.json());
                } else if (response.status === 401) {
                    navigate('/');
                }
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        };
        fetchTasks();
    }, [navigate]);

     // Handle task completion
     const handleTaskCompletion = async (taskId: number, isCompleted: boolean) => {
        // Optimistic update
        setTasks(prev => prev.map(task => 
            task.id === taskId ? { ...task, isCompleted } : task
        ));

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5120/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ isCompleted })
            });

            if (!response.ok) {
                // Revert on failure
                setTasks(prev => prev.map(task => 
                    task.id === taskId ? { ...task, isCompleted: !isCompleted } : task
                ));
            }
        } catch (error) {
            console.error('Failed to update task:', error);
            // Revert on error
            setTasks(prev => prev.map(task => 
                task.id === taskId ? { ...task, isCompleted: !isCompleted } : task
            ));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the auth token
        navigate('/'); // Navigate to login page
    };

    return (
        
        <div className="tasks-container">
            {/* Header section */}
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

            {/* Task table */}
            <TableContainer component={Paper} className="task-table">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox" className="checkbox-cell" />
                            <TableCell className="title-cell">Title</TableCell>
                            <TableCell className="description-cell">Description</TableCell>
                            <TableCell className="actions-cell" align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(task => (
                                <TableRow 
                                    key={task.id}
                                    style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}
                                >
                                    <TableCell padding="checkbox" className="checkbox-cell">
                                        <Checkbox 
                                            checked={task.isCompleted}
                                            onChange={e => handleTaskCompletion(task.id, e.target.checked)}
                                            color="primary"
                                        />
                                    </TableCell>
                                    <TableCell className="title-cell">{task.title}</TableCell>
                                    <TableCell className="description-cell">{task.description}</TableCell>
                                    <TableCell className="actions-cell" align="right">
                                        <Button onClick={() => {}}>Edit</Button>
                                        <Button 
                                            color="error" 
                                            onClick={() => {}}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={tasks.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={(_, newPage) => setPage(newPage)}
                    onRowsPerPageChange={e => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                    }}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </TableContainer>
        </div>
    )
}

export default Tasks;