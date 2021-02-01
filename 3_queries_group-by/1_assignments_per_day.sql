SELECT day, COUNT(*) AS total_assigments
FROM assignments
GROUP BY day
ORDER BY day;