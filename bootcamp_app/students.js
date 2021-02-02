const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const params = process.argv.slice(2);

pool.query(`
SELECT students.id, students.name AS student, cohorts.name AS cohort
FROM students
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE '%${params[0]}%'
LIMIT ${params[1] || 5};
`)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.student} has an id of ${user.id} and was in the ${user.cohort} cohort.`);
    });
  }).catch(err => console.error('query error', err.stack));