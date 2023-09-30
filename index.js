const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "time_flow"
})
db.connect();

//Login
app.get('/login', (req, res) => {
    let id = req.body.id;
    let pwd = req.body.password;

    if (!id || !pwd) {
        return res.status(400).send({ error: true, message: "Please provide id and password." });
    } else {
        db.query('SELECT * FROM EMPLOYEE WHERE employee_login_id = ? AND employee_login_password = ?', [id, pwd], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "User not found.";
            } else {
                message = "Successfully Login.";
            }
            return res.send({ error: false, data: results, message: message });
        })
    }
})

//Employee
//GetAllEmployees
app.get('/employees', (req, res) => {
    db.query('SELECT * FROM EMPLOYEE', (error, results, fields) => {
        if (error) throw error;

        let message = ""
        if (results === undefined || results.length == 0) {
            message = "Employee table is empty.";
        } else {
            message = "Sucessfully retrieved all employees."
        }
        return res.send({ error: false, data: results, message: message });
    })
})

//InsertEmployee
app.post('/employee', (req, res) => {
    const {
        employee_id,
        employee_title,
        employee_name,
        employee_surname,
        employee_gender,
        employee_department,
        employee_position,
        employee_tel,
        employee_email,
        employee_birthday,
        employee_start_date,
        employee_salary,
        employee_personal_id,
        employee_address,
        employee_bank_account,
        employee_bank_type,
        employee_tax_id,
        employee_login_id,
        employee_login_password,
        employee_profile_img,
        employee_personnel_id_img,
        employee_transcript_img,
        employee_contract,
    } = req.body;

    if (!employee_id || !employee_title || !employee_name || !employee_surname || !employee_gender || !employee_department || !employee_position || !employee_tel || !employee_email || !employee_birthday || !employee_start_date || !employee_salary || !employee_personal_id || !employee_address || !employee_bank_account || !employee_bank_type || !employee_tax_id || !employee_login_id || !employee_login_password) {
        return res.status(400).send({ error: true, message: 'Please provide all required fields' });
    } else {
        const sql = `INSERT INTO EMPLOYEE (employee_id, employee_title, employee_name, employee_surname, employee_gender, employee_department, employee_position, employee_tel, employee_email, employee_birthday, employee_start_date, employee_salary, employee_personal_id, employee_address, employee_bank_account, employee_bank_type, employee_tax_id, employee_login_id, employee_login_password, employee_profile_img, employee_personnel_id_img, employee_transcript_img, employee_contract, employee_roles) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            employee_id,
            employee_title,
            employee_name,
            employee_surname,
            employee_gender,
            employee_department,
            employee_position,
            employee_tel,
            employee_email,
            employee_birthday,
            employee_start_date,
            employee_salary,
            employee_personal_id,
            employee_address,
            employee_bank_account,
            employee_bank_type,
            employee_tax_id,
            employee_login_id,
            employee_login_password,
            employee_profile_img,
            employee_personnel_id_img,
            employee_transcript_img,
            employee_contract,
            "Employee",
        ];

        db.query(sql, values, (error, results, fields) => {
            if (error) {
                console.error('Database query error: ' + error.stack);
                return res.status(500).send({ error: true, message: 'Error adding employee to the database' });
            }
            return res.send({ error: false, data: results, message: 'Employee successfully added' });
        });
    }
});

//GetEmployeeByID
app.get('/employee/:id', (req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(400).send({ error: true, message: "Please provide employee id." });
    } else {
        db.query('SELECT * FROM EMPLOYEE WHERE employee_id = ?', id, (error, results, fields) => {
            if (error) throw error;

            let message = ""
            if (results === undefined || results.length == 0) {
                message = "Employee not found.";
            } else {
                message = "Sucessfully retrieved employee."
            }
            return res.send({ error: false, data: results, message: message });
        })
    }

})

//UpdateEmployeeByID
app.put('/employee/:id', (req, res) => {
    const employeeId = req.params.id;
    const {
        employee_title,
        employee_name,
        employee_surname,
        employee_gender,
        employee_department,
        employee_position,
        employee_tel,
        employee_email,
        employee_birthday,
        employee_start_date,
        employee_salary,
        employee_personal_id,
        employee_address,
        employee_bank_account,
        employee_bank_type,
        employee_tax_id,
        employee_login_id,
        employee_login_password,
        employee_profile_img,
        employee_personnel_id_img,
        employee_transcript_img,
        employee_contract,
    } = req.body;
    console.log(employeeId);

    if (!employeeId || !employee_title || !employee_name || !employee_surname || !employee_gender || !employee_department || !employee_position || !employee_tel || !employee_email || !employee_birthday || !employee_start_date || !employee_salary || !employee_personal_id || !employee_address || !employee_bank_account || !employee_bank_type || !employee_tax_id || !employee_login_id || !employee_login_password) {
        return res.status(400).send({ error: true, message: 'Please provide all required fields' });
    } else {
        const sql = `
        UPDATE EMPLOYEE
        SET
          employee_title = ?,
          employee_name = ?,
          employee_surname = ?,
          employee_gender = ?,
          employee_department = ?,
          employee_position = ?,
          employee_tel = ?,
          employee_email = ?,
          employee_birthday = ?,
          employee_start_date = ?,
          employee_salary = ?,
          employee_personal_id = ?,
          employee_address = ?,
          employee_bank_account = ?,
          employee_bank_type = ?,
          employee_tax_id = ?,
          employee_login_id = ?,
          employee_login_password = ?,
          employee_profile_img = ?,
          employee_personnel_id_img = ?,
          employee_transcript_img = ?,
          employee_contract = ?
        WHERE employee_id = ?`;

        const values = [
            employee_title,
            employee_name,
            employee_surname,
            employee_gender,
            employee_department,
            employee_position,
            employee_tel,
            employee_email,
            employee_birthday,
            employee_start_date,
            employee_salary,
            employee_personal_id,
            employee_address,
            employee_bank_account,
            employee_bank_type,
            employee_tax_id,
            employee_login_id,
            employee_login_password,
            employee_profile_img,
            employee_personnel_id_img,
            employee_transcript_img,
            employee_contract,
            employeeId,
        ];

        db.query(sql, values, (error, results, fields) => {
            if (error) {
                console.error('Database query error: ' + error.stack);
                return res.status(500).send({ error: true, message: 'Error updating employee information' });
            }

            let message = "";
            if (results.changedRows === 0) {
                message = "Employee not found or data are same";
            } else {
                message = "Employee updated successfully";
            }
            return res.send({ error: false, data: results, message: message });
        });
    }
});

//UpdateEmployeeRoleByID
app.put('/employee/:id/role', (req, res) => {
    const employeeId = req.params.id;
    const role = req.body.role;

    if (!employeeId) {
        return res.status(400).send({ error: true, message: 'Please provide the employee ID and status to update' });
    } else {
        const sql = 'UPDATE EMPLOYEE SET employee_roles = ? WHERE employee_id = ?';

        db.query(sql, [role, employeeId], (error, results, fields) => {
            if (error) {
                console.error('Database query error: ' + error.stack);
                return res.status(500).send({ error: true, message: 'Error updating employee role' });
            }

            let message = "";
            if (results.changedRows === 0) {
                message = "Employee not found or data are the same";
            } else {
                message = "Employee updated successfully";
            }
            return res.send({ error: false, data: results, message: message });
        });
    }
});

//DeleteEmployeeByID
app.delete('/employee/:id', (req, res) => {
    const employeeId = req.params.id;

    if (!employeeId) {
        return res.status(400).send({ error: true, message: 'Please provide the employee ID to delete' });
    } else {
        const sql = 'DELETE FROM EMPLOYEE WHERE employee_id = ?';

        db.query(sql, [employeeId], (error, results, fields) => {
            if (error) {
                console.error('Database query error: ' + error.stack);
                return res.status(500).send({ error: true, message: 'Error deleting employee from the database' });
            }

            let message = "";
            if (results.affectedRows === 0) {
                message = ""; 'Employee not found';
            } else {
                message = "Employee delete successfully";
            }

            return res.send({ error: false, message: message });
        });
    }
});


//Attendance
//GetAllAttendances
app.get('/attendances', (req, res) => {
    db.query("SELECT * FROM EMPLOYEE NAUTURAL JOIN ATTENDANCE", (error, results, fields) => {
        if (error) throw error;

        let message = "";
        if (results === undefined || results.length == 0) {
            message = "Attendance not found.";
        } else {
            message = "Successfully retrieved all attendances.";
        }
        return res.send({ error: false, data: results, message: message });
    })
})

//InsertAttendance
app.post('/attendance', (req, res) => {
    const {
        employee_id,
        attendance_date,
        attendance_time,
        attendance_type,
        attendance_note
    } = req.body;

    if (!employee_id || !attendance_date || !attendance_time || !attendance_type) {
        return res.status(400).send({ error: true, message: 'Please provide all required fields: employee_id, attendance_date, attendance_time, attendance_type' });
    }
    else {
        const sql = 'INSERT INTO ATTENDANCE (employee_id, attendance_date, attendance_time, attendance_type, attendance_note) VALUES (?, ?, ?, ?, ?)';

        db.query(sql, [employee_id, attendance_date, attendance_time, attendance_type, attendance_note], (error, results, fields) => {
            if (error) {
                console.error('Database query error: ' + error.stack);
                return res.status(500).send({ error: true, message: 'Error creating attendance record' });
            }

            return res.send({ error: false, data: results, message: 'Attendance record created successfully' });
        });
    }
});


//GetAttendanceByEmployeeID
app.get('/attendance/employee/:id', (req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(400).send({ error: true, message: "Please provide id." });
    } else {
        db.query("SELECT * FROM EMPLOYEE NAUTURAL JOIN ATTENDANCE WHERE ATTENDANCE.employee_id = ?", id, (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "Attendance not found.";
            }
            else {
                message = "Successfully retrieved attendance.";
            }
            return res.send({ error: false, data: results, message: message });
        })
    }
})

//LeaveRequest
//GetAllLeaveRequests
app.get('/leaveRequests', (req, res) => {
    db.query('SELECT * FROM EMPLOYEE NAUTURAL JOIN LEAVE_REQUEST', (error, results, fields) => {
        if (error) throw error;

        let message = "";
        if (results === undefined || results.length == 0) {
            message = "Leave Request not found.";
        } else {
            message = "Successfully retrieved all leave requests.";
        }
        return res.send({ error: false, data: results, message: message });
    })
})

//InsertLeaveRequest
app.post('/leaveRequest', (req, res) => {
    const {
        employee_id,
        leave_request_type,
        leave_request_duration,
        leave_request_start_date,
        leave_request_end_date,
        leave_request_note,
    } = req.body;

    if (!employee_id || !leave_request_type || !leave_request_duration || !leave_request_start_date || !leave_request_end_date) {
        return res.status(400).send({ error: true, message: 'Please provide all required fields: employee_id, leave_request_type, leave_request_duration, leave_request_start_date, leave_request_end_date' });
    }

    const sql = 'INSERT INTO LEAVE_REQUEST (employee_id, leave_request_type, leave_request_duration, leave_request_start_date, leave_request_end_date, leave_request_note, leave_request_status) VALUES (?, ?, ?, ?, ?, ?, ?)';

    db.query(sql, [employee_id, leave_request_type, leave_request_duration, leave_request_start_date, leave_request_end_date, leave_request_note, "รอดำเนินการ"], (error, results, fields) => {
        if (error) {
            console.error('Database query error: ' + error.stack);
            return res.status(500).send({ error: true, message: 'Error creating leave request' });
        }

        return res.send({ error: false, data: results, message: 'Leave request created successfully' });
    });
});

//GetLeaveRequestByEmployeeID
app.get('/leaveRequest/employee/:id', (req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(400).send({ error: true, message: "Please provide id." });
    } else {
        db.query("SELECT * FROM EMPLOYEE NAUTURAL JOIN LEAVE_REQUEST WHERE LEAVE_REQUEST.employee_id = ?", id, (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "Leave Request not found.";
            } else {
                message = "Successfully retrieved leave request.";
            }
            return res.send({ error: false, data: results, message: message });
        })
    }
})

//UpdateLeaveRequestStatusByID
app.put('/leaveRequest/:id/status', (req, res) => {
    const leaveRequestId = req.params.id;
    const { leave_request_status } = req.body;

    if (!leaveRequestId || !leave_request_status) {
        return res.status(400).send({ error: true, message: 'Please provide leave request ID and leave request status to update' });
    }

    const sql = 'UPDATE LEAVE_REQUEST SET leave_request_status = ? WHERE leave_request_id = ?';

    db.query(sql, [leave_request_status, leaveRequestId], (error, results, fields) => {
        if (error) {
            console.error('Database query error: ' + error.stack);
            return res.status(500).send({ error: true, message: 'Error updating leave request status' });
        }

        let message = "";
        if (results.changedRows === 0) {
            message = "Leave request not found or status is the same";
        } else {
            message = "Leave request status updated successfully";
        }
        return res.send({ error: false, data: results, message: message });
    });
});



app.listen(3000, () => {
    console.log('Node App is running on port 3000');
})