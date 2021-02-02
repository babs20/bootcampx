const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohort = process.argv[2];
const values = [`%${cohort}%`];

pool.query(
  `SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
  FROM assistance_requests
  JOIN teachers ON teacher_id = teachers.id
  JOIN students ON student_id = students.id
  JOIN cohorts ON cohort_id = cohorts.id
  WHERE cohorts.name LIKE $1
  ORDER BY teacher;`
  , values)
  .then(res => {
    res.rows.forEach(data => {
      console.log(`${data.cohort}: ${data.teacher}`);
    });
  }).catch(err => console.error('Error', err.stack));